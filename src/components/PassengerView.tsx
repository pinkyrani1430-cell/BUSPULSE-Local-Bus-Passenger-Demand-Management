import React, { useState, useEffect } from 'react';
import {
  Bus as BusIcon,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Ticket,
  ArrowRight,
  Clock,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { Bus, Journey, Language } from '../types';
import { translations } from '../i18n';
import { createJourney, deleteJourney, fetchJourneys } from '../api';

interface PassengerViewProps {
  buses: Bus[];
  selectedBusId: string;
  onSelectBus: (busId: string) => void;
  language: Language;
  onJourneyBooked: () => void;
  onNavigateToOperator: () => void;
}

export const PassengerView: React.FC<PassengerViewProps> = ({
  buses,
  selectedBusId,
  onSelectBus,
  language,
  onJourneyBooked,
  onNavigateToOperator,
}) => {
  const t = translations[language];

  const [fromStop, setFromStop] = useState<string>('');
  const [toStop, setToStop] = useState<string>('');
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [passengerName, setPassengerName] = useState<string>(() => {
    return localStorage.getItem('buspulse_passenger_name') || 'Rahul Sharma';
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastTicket, setLastTicket] = useState<Journey | null>(null);
  const [recentJourneys, setRecentJourneys] = useState<Journey[]>([]);

  // Find currently selected bus object
  const currentBus = buses.find((b) => b._id === selectedBusId) || buses[0];

  // Helper to get localized route name
  const getLocalizedRoute = (bus: Bus) => {
    if (language === 'hi' && bus.routeNameHi) return bus.routeNameHi;
    if (language === 'kn' && bus.routeNameKn) return bus.routeNameKn;
    return bus.routeName;
  };

  // Helper to get localized stop name
  const getLocalizedStop = (stop: { name: string; nameHi?: string; nameKn?: string }) => {
    if (language === 'hi' && stop.nameHi) return stop.nameHi;
    if (language === 'kn' && stop.nameKn) return stop.nameKn;
    return stop.name;
  };

  // When bus changes, reset stop selections if they don't exist on new bus
  useEffect(() => {
    if (currentBus && currentBus.stops.length >= 2) {
      const stops = currentBus.stops;
      // Default to first stop and third or second stop for convenience
      setFromStop(stops[0].name);
      setToStop(stops[Math.min(3, stops.length - 1)].name);
    }
  }, [selectedBusId, buses]);

  // Load recent bookings
  const loadRecentBookings = async () => {
    try {
      const list = await fetchJourneys(currentBus?._id);
      setRecentJourneys(list.slice(0, 5));
    } catch (e) {
      console.warn('Failed to fetch recent journeys:', e);
    }
  };

  useEffect(() => {
    loadRecentBookings();
  }, [currentBus]);

  // Filter valid destination stops (must occur strictly after fromStop in sequence)
  const currentStops = currentBus?.stops || [];
  const fromStopIdx = currentStops.findIndex(
    (s) => s.name.toLowerCase() === fromStop.toLowerCase()
  );

  const availableDestinations =
    fromStopIdx !== -1
      ? currentStops.slice(fromStopIdx + 1)
      : currentStops.slice(1);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentBus) {
      setErrorMessage(t.errorSelectStops);
      return;
    }
    if (!fromStop || !toStop) {
      setErrorMessage(t.errorSelectStops);
      return;
    }
    if (fromStop === toStop) {
      setErrorMessage(t.errorSameStops);
      return;
    }

    try {
      setLoading(true);
      localStorage.setItem('buspulse_passenger_name', passengerName);

      const created = await createJourney({
        busId: currentBus._id,
        busNumber: currentBus.busNumber,
        passengerName: passengerName.trim() || 'Commuter',
        fromStop,
        toStop,
        passengerCount,
      });

      setLastTicket(created);
      onJourneyBooked();
      await loadRecentBookings();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error recording journey');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJourney = async (id: string) => {
    try {
      await deleteJourney(id);
      if (lastTicket && lastTicket._id === id) {
        setLastTicket(null);
      }
      onJourneyBooked();
      await loadRecentBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-blue-500/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-blue-50 backdrop-blur-xs mb-3">
            <Ticket className="w-3.5 h-3.5" />
            <span>{t.ticketTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t.bookJourneyTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            {t.bookJourneyDesc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Bus Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  {t.selectBus}
                </label>
                <div className="relative">
                  <select
                    value={selectedBusId}
                    onChange={(e) => onSelectBus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {buses.map((bus) => (
                      <option key={bus._id} value={bus._id}>
                        {t.bus} {bus.busNumber} • {getLocalizedRoute(bus)} ({bus.capacity} seats)
                      </option>
                    ))}
                  </select>
                  <BusIcon className="w-5 h-5 text-blue-600 absolute left-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Stop Selectors (From & To) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Boarding Stop */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    {t.boardingStop}
                  </label>
                  <div className="relative">
                    <select
                      value={fromStop}
                      onChange={(e) => {
                        const newFrom = e.target.value;
                        setFromStop(newFrom);
                        // If current toStop is not in future stops, automatically advance it
                        const newFromIdx = currentStops.findIndex(
                          (s) => s.name === newFrom
                        );
                        const futureStops = currentStops.slice(newFromIdx + 1);
                        if (
                          futureStops.length > 0 &&
                          !futureStops.some((s) => s.name === toStop)
                        ) {
                          setToStop(futureStops[0].name);
                        }
                      }}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      {currentStops.slice(0, -1).map((stop) => (
                        <option key={stop.id} value={stop.name}>
                          {stop.sequence}. {getLocalizedStop(stop)}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Destination Stop */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    {t.destinationStop}
                  </label>
                  <div className="relative">
                    <select
                      value={toStop}
                      onChange={(e) => setToStop(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                    >
                      {availableDestinations.map((stop) => (
                        <option key={stop.id} value={stop.name}>
                          {stop.sequence}. {getLocalizedStop(stop)}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-rose-600 absolute left-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Passenger Name & Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    {t.passengerName}
                  </label>
                  <input
                    type="text"
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    {t.passengerCount}
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setPassengerCount((c) => Math.max(1, c - 1))}
                      className="w-11 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-200/70 font-bold transition-colors"
                    >
                      −
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-1.5 font-semibold text-slate-900 text-base">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{passengerCount}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPassengerCount((c) => Math.min(10, c + 1))}
                      className="w-11 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-200/70 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Journey Preview Strip */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-semibold text-blue-900">
                    {t.bus} {currentBus?.busNumber}:
                  </span>
                  <span className="font-medium text-slate-900">{fromStop}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-medium text-slate-900">{toStop}</span>
                </div>
                <div className="text-blue-700 font-semibold bg-white px-2.5 py-1 rounded-md border border-blue-200 shadow-2xs">
                  {passengerCount} {t.passengers.toLowerCase()}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>{t.submitting}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.confirmJourneyBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Ticket Confirmation & Recent Bookings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Confirmed Ticket Card */}
          {lastTicket ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-500/80 p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl tracking-wider">
                CONFIRMED
              </div>

              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{t.journeyConfirmed}</span>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{t.ticketId}:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {lastTicket._id.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200/60">
                  <div className="text-xs text-slate-500 font-medium">
                    {t.bus} {lastTicket.busNumber}
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                    <div className="text-emerald-700">{lastTicket.fromStop}</div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="text-rose-700">{lastTicket.toStop}</div>
                  </div>
                  <div className="text-xs text-slate-600 flex justify-between pt-1">
                    <span>
                      {t.passengers}: <b>{lastTicket.passengerCount}</b>
                    </span>
                    <span>
                      {t.passengerName}: <b>{lastTicket.passengerName}</b>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100/60 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    This booking has updated the expected passenger load on Bus{' '}
                    {lastTicket.busNumber}. You can view the stop-by-stop demand impact on the operator dashboard.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onNavigateToOperator}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.navOperator}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
              <Ticket className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-700">
                {t.ticketTitle}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Fill the form on the left to confirm your journey and receive an instant pass.
              </p>
            </div>
          )}

          {/* Recent Bookings List */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{t.recentBookings}</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {recentJourneys.length} {t.passengers.toLowerCase()}
              </span>
            </div>

            {recentJourneys.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                {t.noBookingsYet}
              </p>
            ) : (
              <div className="space-y-2.5">
                {recentJourneys.map((j) => (
                  <div
                    key={j._id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs hover:bg-slate-100/70 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                          Bus {j.busNumber}
                        </span>
                        <span>{j.passengerName}</span>
                        <span className="text-slate-400 font-normal">
                          ({j.passengerCount} {j.passengerCount === 1 ? 'person' : 'people'})
                        </span>
                      </div>
                      <div className="text-slate-600 mt-1 flex items-center gap-1">
                        <span>{j.fromStop}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span>{j.toStop}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteJourney(j._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2"
                      title={t.cancelJourney}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
