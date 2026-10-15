export type Language = 'en' | 'hi' | 'kn';

export type DemandStatus = 'LOW' | 'NORMAL' | 'HIGH' | 'FULL';

export interface BusStop {
  id: string;
  name: string;
  nameHi: string;
  nameKn: string;
  sequence: number;
}

export interface Bus {
  _id: string;
  busNumber: string;
  routeName: string;
  routeNameHi?: string;
  routeNameKn?: string;
  capacity: number;
  stops: BusStop[];
  active?: boolean;
}

export interface Journey {
  _id: string;
  busId: string;
  busNumber: string;
  passengerName: string;
  fromStop: string;
  toStop: string;
  passengerCount: number;
  journeyDate: string;
  createdAt: string;
}

export interface DemandStop {
  stopName: string;
  stopNameHi: string;
  stopNameKn: string;
  sequence: number;
  onboardCount: number;
  boardingCount: number;
  alightingCount: number;
  capacity: number;
  occupancyPercentage: number;
  status: DemandStatus;
}

export interface DemandSummary {
  busId: string;
  busNumber: string;
  routeName: string;
  routeNameHi?: string;
  routeNameKn?: string;
  capacity: number;
  totalJourneys: number;
  totalBookedPassengers: number;
  peakOccupancy: number;
  peakStop: string;
  stops: DemandStop[];
  recommendationKey: 'underutilized' | 'optimal' | 'moderate' | 'overcrowded';
  recommendationParams?: Record<string, string | number>;
}

export interface AppUser {
  id: string;
  name: string;
  role: 'passenger' | 'operator';
}
