import { Bus, Journey, DemandSummary } from './types';

const BASE_URL = '/api';

export async function fetchBuses(): Promise<Bus[]> {
  const res = await fetch(`${BASE_URL}/buses`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch buses');
  return data.data;
}

export async function fetchDemand(busId: string): Promise<DemandSummary> {
  const res = await fetch(`${BASE_URL}/demand/${encodeURIComponent(busId)}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch demand data');
  return data.data;
}

export async function fetchJourneys(busId?: string): Promise<Journey[]> {
  const url = busId ? `${BASE_URL}/journeys?busId=${encodeURIComponent(busId)}` : `${BASE_URL}/journeys`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch journeys');
  return data.data;
}

export async function createJourney(payload: {
  busId: string;
  busNumber: string;
  passengerName: string;
  fromStop: string;
  toStop: string;
  passengerCount: number;
}): Promise<Journey> {
  const res = await fetch(`${BASE_URL}/journeys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to record journey');
  return data.data;
}

export async function deleteJourney(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/journeys/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to delete journey');
}

export async function seedDemoData(): Promise<void> {
  const res = await fetch(`${BASE_URL}/seed`, { method: 'POST' });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to load demo scenario');
}

export async function resetJourneys(busId?: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ busId }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to reset journeys');
}
