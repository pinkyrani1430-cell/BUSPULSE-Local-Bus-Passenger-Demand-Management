import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { IBus, IJourney, BusModel, JourneyModel, UserModel } from './models';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'buspulse_data.json');

export const INITIAL_BUSES = [
  {
    _id: 'bus-500',
    busNumber: '500',
    routeName: 'Silk Board — Corporation',
    routeNameHi: 'सिल्क बोर्ड — कॉर्पोरेशन',
    routeNameKn: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್ — ಕಾರ್ಪೊರೇಷನ್',
    capacity: 60,
    active: true,
    stops: [
      { id: 'sb-1', name: 'Silk Board', nameHi: 'सिल्क बोर्ड', nameKn: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್', sequence: 1 },
      { id: 'btm-2', name: 'BTM Layout', nameHi: 'बीटीएम लेआउट', nameKn: 'ಬಿಟಿಎಂ ಲೇಔಟ್', sequence: 2 },
      { id: 'jay-3', name: 'Jayadeva', nameHi: 'जयदेव', nameKn: 'ಜಯದೇವ', sequence: 3 },
      { id: 'dc-4', name: 'Dairy Circle', nameHi: 'डेयरी सर्कल', nameKn: 'ಡೈರಿ ಸರ್ಕಲ್', sequence: 4 },
      { id: 'rc-5', name: 'Richmond Circle', nameHi: 'रिचमंड सर्कल', nameKn: 'ರಿಚ್ಮಂಡ್ ಸರ್ಕಲ್', sequence: 5 },
      { id: 'corp-6', name: 'Corporation', nameHi: 'कॉर्पोरेशन', nameKn: 'ಕಾರ್ಪೊರೇಷನ್', sequence: 6 },
    ],
  },
  {
    _id: 'bus-335e',
    busNumber: '335E',
    routeName: 'Majestic (KBS) — ITPL Whitefield',
    routeNameHi: 'मैजेस्टिक — आईटीपीएल',
    routeNameKn: 'ಮೆಜೆಸ್ಟಿಕ್ — ಐಟಿಪಿಎಲ್ ವೈಟ್‌ಫೀಲ್ಡ್',
    capacity: 65,
    active: true,
    stops: [
      { id: 'kbs-1', name: 'Majestic (KBS)', nameHi: 'मैजेस्टिक (KBS)', nameKn: 'ಮೆಜೆಸ್ಟಿಕ್ (ಕೆಬಿಎಸ್)', sequence: 1 },
      { id: 'corp-2', name: 'Corporation', nameHi: 'कॉर्पोरेशन', nameKn: 'ಕಾರ್ಪೊರೇಷನ್', sequence: 2 },
      { id: 'dom-3', name: 'Domlur', nameHi: 'डोमलूर', nameKn: 'ದೋಮ್ಲೂರು', sequence: 3 },
      { id: 'hal-4', name: 'HAL Main Gate', nameHi: 'एचएएल गेट', nameKn: 'ಹೆಚ್‌ಎಎಲ್ ಗೇಟ್', sequence: 4 },
      { id: 'mar-5', name: 'Marathahalli Bridge', nameHi: 'मराठाहल्ली ब्रिज', nameKn: 'ಮಾರತ್ತಹಳ್ಳಿ ಬ್ರಿಡ್ಜ್', sequence: 5 },
      { id: 'itpl-6', name: 'ITPL Whitefield', nameHi: 'आईटीपीएल', nameKn: 'ಐಟಿಪಿಎಲ್ ವೈಟ್‌ಫೀಲ್ಡ್', sequence: 6 },
    ],
  },
  {
    _id: 'bus-201g',
    busNumber: '201G',
    routeName: 'Banashankari — Domlur TTMC',
    routeNameHi: 'बनशंकरी — डोमलूर',
    routeNameKn: 'ಬನಶಂಕರಿ — ದೋಮ್ಲೂರು',
    capacity: 55,
    active: true,
    stops: [
      { id: 'bsk-1', name: 'Banashankari TTMC', nameHi: 'बनशंकरी टीटीएमसी', nameKn: 'ಬನಶಂಕರಿ ಟಿಟಿಎಂಸಿ', sequence: 1 },
      { id: 'jn-2', name: 'Jayanagar 4th Block', nameHi: 'जयनगर 4th ब्लॉक', nameKn: 'ಜಯನಗರ 4ನೇ ಬ್ಲಾಕ್', sequence: 2 },
      { id: 'se-3', name: 'South End Circle', nameHi: 'साउथ एंड सर्कल', nameKn: 'ಸೌತ್ ಎಂಡ್ ಸರ್ಕಲ್', sequence: 3 },
      { id: 'lb-4', name: 'Lalbagh Main Gate', nameHi: 'लालबग मुख्य द्वार', nameKn: 'ಲಾಲ್‌ಬಾಗ್ ಮುಖ್ಯ ಗೇಟ್', sequence: 4 },
      { id: 'sn-5', name: 'Shanthinagar', nameHi: 'शांतिनगर', nameKn: 'ಶಾಂತಿನಗರ', sequence: 5 },
      { id: 'dom-6', name: 'Domlur TTMC', nameHi: 'डोमलूर टीटीएमसी', nameKn: 'ದೋಮ್ಲೂರು ಟಿಟಿಎಂಸಿ', sequence: 6 },
    ],
  },
  {
    _id: 'bus-401k',
    busNumber: '401K',
    routeName: 'Yelahanka — Kengeri TTMC',
    routeNameHi: 'यलहंका — केंगेरी',
    routeNameKn: 'ಯಲಹಂಕ — ಕೆಂಗೇರಿ ಟಿಟಿಎಂಸಿ',
    capacity: 70,
    active: true,
    stops: [
      { id: 'yel-1', name: 'Yelahanka Old Town', nameHi: 'यलहंका ओल्ड टाउन', nameKn: 'ಯಲಹಂಕ ಹಳೇ ಊರು', sequence: 1 },
      { id: 'heb-2', name: 'Hebbal', nameHi: 'हेब्बल', nameKn: 'ಹೆಬ್ಬಾಳ', sequence: 2 },
      { id: 'bel-3', name: 'BEL Circle', nameHi: 'बीईएल सर्कल', nameKn: 'ಬಿಇಎಲ್ ಸರ್ಕಲ್', sequence: 3 },
      { id: 'yes-4', name: 'Yeshwanthpur', nameHi: 'यशवंतपुर', nameKn: 'ಯಶವಂತಪುರ', sequence: 4 },
      { id: 'raj-5', name: 'Rajajinagar', nameHi: 'राजाजीनगर', nameKn: 'ರಾಜಾಜಿನಗರ', sequence: 5 },
      { id: 'ken-6', name: 'Kengeri TTMC', nameHi: 'केंगेरी टीटीएमसी', nameKn: 'ಕೆಂಗೇರಿ ಟಿಟಿಎಂಸಿ', sequence: 6 },
    ],
  },
];

export const INITIAL_SAMPLE_JOURNEYS = [
  // Bus 500 journeys illustrating the exact user problem/scenario:
  // Silk Board -> 20 | BTM -> 35 | Jayadeva -> 50 | Dairy Circle -> 40 | Richmond Circle -> 15
  {
    _id: 'j-1',
    busId: 'bus-500',
    busNumber: '500',
    passengerName: 'Aarav Patel (Group)',
    fromStop: 'Silk Board',
    toStop: 'Dairy Circle',
    passengerCount: 10,
    journeyDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'j-2',
    busId: 'bus-500',
    busNumber: '500',
    passengerName: 'Ananya Sharma (Group)',
    fromStop: 'Silk Board',
    toStop: 'Richmond Circle',
    passengerCount: 10,
    journeyDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'j-3',
    busId: 'bus-500',
    busNumber: '500',
    passengerName: 'Ravi Kumar (Office Commute)',
    fromStop: 'BTM Layout',
    toStop: 'Richmond Circle',
    passengerCount: 15,
    journeyDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'j-4',
    busId: 'bus-500',
    busNumber: '500',
    passengerName: 'Priya Gowda (College Group)',
    fromStop: 'Jayadeva',
    toStop: 'Corporation',
    passengerCount: 15,
    journeyDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

interface LocalDatabaseState {
  buses: any[];
  journeys: any[];
  users: any[];
}

let isMongoConnected = false;

// Embedded persistent store for zero-friction local and cloud preview
class LocalStore {
  private state: LocalDatabaseState = {
    buses: [...INITIAL_BUSES],
    journeys: [...INITIAL_SAMPLE_JOURNEYS],
    users: [
      { id: 'u-1', name: 'Passenger User', role: 'passenger' },
      { id: 'u-2', name: 'Route Supervisor 1', role: 'operator' },
    ],
  };

  constructor() {
    this.loadFromFile();
  }

  private loadFromFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.buses && Array.isArray(parsed.buses) && parsed.buses.length > 0) {
          this.state.buses = parsed.buses;
        }
        if (parsed.journeys && Array.isArray(parsed.journeys)) {
          this.state.journeys = parsed.journeys;
        }
        if (parsed.users && Array.isArray(parsed.users)) {
          this.state.users = parsed.users;
        }
      } else {
        this.saveToFile();
      }
    } catch (err) {
      console.warn('[BusPulse DB] Warning reading local state:', err);
    }
  }

  private saveToFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[BusPulse DB] Warning writing local state:', err);
    }
  }

  async getBuses(): Promise<any[]> {
    return this.state.buses;
  }

  async getBusById(id: string): Promise<any | null> {
    return (
      this.state.buses.find(
        (b) => b._id === id || b.busNumber.toLowerCase() === id.toLowerCase()
      ) || null
    );
  }

  async getJourneys(busId?: string): Promise<any[]> {
    if (!busId) return this.state.journeys;
    return this.state.journeys.filter(
      (j) => j.busId === busId || j.busNumber === busId
    );
  }

  async addJourney(journey: any): Promise<any> {
    const newJourney = {
      ...journey,
      _id: journey._id || 'j-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      journeyDate: journey.journeyDate || new Date().toISOString(),
    };
    this.state.journeys.unshift(newJourney);
    this.saveToFile();
    return newJourney;
  }

  async deleteJourney(id: string): Promise<boolean> {
    const prevLen = this.state.journeys.length;
    this.state.journeys = this.state.journeys.filter((j) => j._id !== id);
    const deleted = this.state.journeys.length < prevLen;
    if (deleted) this.saveToFile();
    return deleted;
  }

  async resetJourneys(busId?: string): Promise<void> {
    if (busId) {
      this.state.journeys = this.state.journeys.filter(
        (j) => j.busId !== busId && j.busNumber !== busId
      );
    } else {
      this.state.journeys = [];
    }
    this.saveToFile();
  }

  async seedDemoJourneys(): Promise<void> {
    // Reset and seed realistic Bus 500 demand
    this.state.buses = [...INITIAL_BUSES];
    this.state.journeys = [...INITIAL_SAMPLE_JOURNEYS];
    this.saveToFile();
  }
}

export const localStore = new LocalStore();

export async function initDatabase(): Promise<{ mode: 'mongodb' | 'embedded' }> {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB at:', mongoUri);

      // Seed buses if collection is empty
      const count = await BusModel.countDocuments();
      if (count === 0) {
        await BusModel.insertMany(INITIAL_BUSES);
        await JourneyModel.insertMany(INITIAL_SAMPLE_JOURNEYS);
        console.log('🌱 Seeded initial buses and demo journeys in MongoDB');
      }

      return { mode: 'mongodb' };
    } catch (err) {
      console.warn('⚠️ MongoDB connection could not be established. Falling back to embedded persistent storage.', (err as Error).message);
    }
  }

  console.log('📦 BusPulse running with embedded persistent storage (data/buspulse_data.json)');
  return { mode: 'embedded' };
}

export function isMongo(): boolean {
  return isMongoConnected;
}
