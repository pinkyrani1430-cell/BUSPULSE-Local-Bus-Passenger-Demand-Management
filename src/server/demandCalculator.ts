import { DemandStop, DemandSummary, DemandStatus } from '../types';

export function calculateDemand(bus: any, journeys: any[]): DemandSummary {
  const stops = bus.stops || [];
  const capacity = bus.capacity || 60;

  let currentOnboard = 0;

  const demandStops: DemandStop[] = stops.map((stop: any, idx: number) => {
    // Total passengers boarding at this stop
    const boardingCount = journeys.reduce((sum, j) => {
      const match = j.fromStop && j.fromStop.trim().toLowerCase() === stop.name.trim().toLowerCase();
      return match ? sum + (Number(j.passengerCount) || 1) : sum;
    }, 0);

    // Total passengers alighting (getting down) at this stop
    const alightingCount = journeys.reduce((sum, j) => {
      const match = j.toStop && j.toStop.trim().toLowerCase() === stop.name.trim().toLowerCase();
      return match ? sum + (Number(j.passengerCount) || 1) : sum;
    }, 0);

    // Passenger count at/departing this stop:
    // If passengers board, count increases. If passengers get down, count decreases.
    currentOnboard = Math.max(0, currentOnboard + boardingCount - alightingCount);
    const onboardCount = currentOnboard;

    const occupancyPercentage = Math.min(100, Math.round((onboardCount / capacity) * 100));

    let status: DemandStatus = 'LOW';
    if (occupancyPercentage >= 95) {
      status = 'FULL';
    } else if (occupancyPercentage >= 75) {
      status = 'HIGH';
    } else if (occupancyPercentage >= 40) {
      status = 'NORMAL';
    } else {
      status = 'LOW';
    }

    return {
      stopName: stop.name,
      stopNameHi: stop.nameHi || stop.name,
      stopNameKn: stop.nameKn || stop.name,
      sequence: stop.sequence || idx + 1,
      onboardCount,
      boardingCount,
      alightingCount,
      capacity,
      occupancyPercentage,
      status,
    };
  });

  // Calculate summary metrics
  let peakOccupancy = 0;
  let peakStop = stops.length > 0 ? stops[0].name : 'N/A';

  demandStops.forEach((ds) => {
    if (ds.occupancyPercentage > peakOccupancy) {
      peakOccupancy = ds.occupancyPercentage;
      peakStop = ds.stopName;
    }
  });

  const totalBookedPassengers = journeys.reduce(
    (sum, j) => sum + (Number(j.passengerCount) || 1),
    0
  );

  let recommendationKey: 'underutilized' | 'optimal' | 'moderate' | 'overcrowded' = 'optimal';
  if (peakOccupancy >= 95) {
    recommendationKey = 'overcrowded';
  } else if (peakOccupancy >= 75) {
    recommendationKey = 'moderate';
  } else if (peakOccupancy >= 40) {
    recommendationKey = 'optimal';
  } else {
    recommendationKey = 'underutilized';
  }

  return {
    busId: bus._id,
    busNumber: bus.busNumber,
    routeName: bus.routeName,
    routeNameHi: bus.routeNameHi,
    routeNameKn: bus.routeNameKn,
    capacity,
    totalJourneys: journeys.length,
    totalBookedPassengers,
    peakOccupancy,
    peakStop,
    stops: demandStops,
    recommendationKey,
    recommendationParams: {
      peakStop,
      peakOccupancy,
    },
  };
}
