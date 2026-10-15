import express, { Request, Response } from 'express';
import { localStore, isMongo } from './db';
import { BusModel, JourneyModel } from './models';
import { calculateDemand } from './demandCalculator';

export const apiRouter = express.Router();

// GET /api/buses - List all available buses and routes
apiRouter.get('/buses', async (req: Request, res: Response) => {
  try {
    if (isMongo()) {
      const buses = await BusModel.find({ active: true }).lean();
      return res.json({ success: true, data: buses });
    }
    const buses = await localStore.getBuses();
    return res.json({ success: true, data: buses });
  } catch (error: any) {
    console.error('Error fetching buses:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/buses/:id - Get specific bus
apiRouter.get('/buses/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let bus = null;
    if (isMongo()) {
      bus = await BusModel.findOne({
        $or: [{ _id: id }, { busNumber: id }],
      }).lean();
    } else {
      bus = await localStore.getBusById(id);
    }

    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    return res.json({ success: true, data: bus });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/demand/:busId - Stop-by-stop calculated passenger demand
apiRouter.get('/demand/:busId', async (req: Request, res: Response) => {
  try {
    const { busId } = req.params;
    let bus = null;
    let journeys: any[] = [];

    if (isMongo()) {
      bus = await BusModel.findOne({
        $or: [{ _id: busId }, { busNumber: busId }],
      }).lean();
      if (bus) {
        journeys = await JourneyModel.find({
          $or: [{ busId: bus._id.toString() }, { busNumber: bus.busNumber }],
        }).lean();
      }
    } else {
      bus = await localStore.getBusById(busId);
      if (bus) {
        journeys = await localStore.getJourneys(bus._id);
      }
    }

    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    const demandSummary = calculateDemand(bus, journeys);
    return res.json({ success: true, data: demandSummary });
  } catch (error: any) {
    console.error('Error calculating demand:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/journeys - List passenger journeys
apiRouter.get('/journeys', async (req: Request, res: Response) => {
  try {
    const busId = req.query.busId as string | undefined;
    let journeys: any[] = [];

    if (isMongo()) {
      const filter = busId
        ? { $or: [{ busId: busId }, { busNumber: busId }] }
        : {};
      journeys = await JourneyModel.find(filter).sort({ createdAt: -1 }).lean();
    } else {
      journeys = await localStore.getJourneys(busId);
    }

    return res.json({ success: true, data: journeys });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/journeys - Record a passenger journey
apiRouter.post('/journeys', async (req: Request, res: Response) => {
  try {
    const { busId, busNumber, passengerName, fromStop, toStop, passengerCount } = req.body;

    if (!busNumber || !fromStop || !toStop) {
      return res.status(400).json({
        success: false,
        message: 'Missing required journey parameters (busNumber, fromStop, toStop).',
      });
    }

    const count = parseInt(passengerCount, 10) || 1;
    if (count <= 0 || count > 20) {
      return res.status(400).json({
        success: false,
        message: 'Passenger count must be between 1 and 20.',
      });
    }

    // Retrieve bus to validate stops and order
    let bus = null;
    if (isMongo()) {
      bus = await BusModel.findOne({
        $or: [{ _id: busId || busNumber }, { busNumber: busNumber }],
      }).lean();
    } else {
      bus = await localStore.getBusById(busId || busNumber);
    }

    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found.' });
    }

    const stops = bus.stops || [];
    const fromIdx = stops.findIndex(
      (s: any) => s.name.trim().toLowerCase() === fromStop.trim().toLowerCase()
    );
    const toIdx = stops.findIndex(
      (s: any) => s.name.trim().toLowerCase() === toStop.trim().toLowerCase()
    );

    if (fromIdx === -1) {
      return res.status(400).json({ success: false, message: `Invalid boarding stop: ${fromStop}` });
    }
    if (toIdx === -1) {
      return res.status(400).json({ success: false, message: `Invalid destination stop: ${toStop}` });
    }
    if (fromIdx >= toIdx) {
      return res.status(400).json({
        success: false,
        message: 'Destination stop must appear after boarding stop along this route.',
      });
    }

    const journeyData = {
      busId: bus._id.toString(),
      busNumber: bus.busNumber,
      passengerName: (passengerName && passengerName.trim()) || 'Commuter',
      fromStop: stops[fromIdx].name,
      toStop: stops[toIdx].name,
      passengerCount: count,
      journeyDate: new Date(),
    };

    let savedJourney = null;
    if (isMongo()) {
      const doc = new JourneyModel(journeyData);
      savedJourney = await doc.save();
    } else {
      savedJourney = await localStore.addJourney(journeyData);
    }

    return res.status(201).json({
      success: true,
      message: 'Journey successfully logged.',
      data: savedJourney,
    });
  } catch (error: any) {
    console.error('Error recording journey:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/journeys/:id - Cancel journey
apiRouter.delete('/journeys/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (isMongo()) {
      const result = await JourneyModel.findByIdAndDelete(id);
      deleted = !!result;
    } else {
      deleted = await localStore.deleteJourney(id);
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Journey not found' });
    }

    return res.json({ success: true, message: 'Journey deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/seed - Load sample scenario matching the user brief
apiRouter.post('/seed', async (req: Request, res: Response) => {
  try {
    if (isMongo()) {
      await JourneyModel.deleteMany({});
      const { INITIAL_SAMPLE_JOURNEYS } = await import('./db');
      await JourneyModel.insertMany(INITIAL_SAMPLE_JOURNEYS);
    } else {
      await localStore.seedDemoJourneys();
    }

    return res.json({
      success: true,
      message: 'Sample demo demand loaded successfully (Silk Board → Richmond Circle corridor).',
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reset - Clear all recorded journeys
apiRouter.post('/reset', async (req: Request, res: Response) => {
  try {
    const { busId } = req.body || {};
    if (isMongo()) {
      const filter = busId ? { busId } : {};
      await JourneyModel.deleteMany(filter);
    } else {
      await localStore.resetJourneys(busId);
    }

    return res.json({ success: true, message: 'Journeys cleared successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/health - Diagnostic check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    appName: 'BusPulse',
    storageMode: isMongo() ? 'MongoDB' : 'Embedded JSON Store',
    timestamp: new Date().toISOString(),
  });
});
