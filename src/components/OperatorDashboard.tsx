import React, { useState } from 'react';
import {
  Bus as BusIcon,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  BarChart2,
} from 'lucide-react';
import { Bus, DemandSummary, DemandStatus, Language, Journey } from '../types';
import { translations } from '../i18n';
import { seedDemoData, resetJourneys, createJourney } from '../api';

interface OperatorDashboardProps {
  buses: Bus[];
  selectedBusId: string;
  onSelectBus: (busId: string) => void;
  demandSummary: DemandSummary | null;
  journeys: Journey[];
  language: Language;
  onRefresh: () => void;
  onNavigateToPassenger: () => void;
}

export const OperatorDashboard: React.FC<OperatorDashboardProps> = ({
  buses,
  selectedBusId,
  onSelectBus,
  demandSummary,
  journeys,
  language,
  onRefresh,
  onNavigateToPassenger,
}) => {
  const t = translations[language];
  const [showJourneysList, setShowJourneysList] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentBus = buses.find((b) => b._id === selectedBusId) || buses[0];

  const getLocalizedRoute = (bus: Bus) => {
    if (language === 'hi' && bus.routeNameHi) return bus.routeNameHi;
    if (language === 'kn' && bus.routeNameKn) return bus.routeNameKn;
    return bus.routeName;
  };

  const getLocalizedStop = (stop: { stopName: string; stopNameHi?: string; stopNameKn?: string }) => {
    if (language === 'hi' && stop.stopNameHi) return stop.stopNameHi;
    if (language === 'kn' && stop.stopNameKn) return stop.stopNameKn;
    return stop.stopName;
  };

  const getStatusBadge = (status: DemandStatus) => {
    switch (status) {
      case 'LOW':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            {t.statusLow}
          </span>
        );
      case 'NORMAL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            {t.statusNormal}
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {t.statusHigh}
          </span>
        );
      case 'FULL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
            {t.statusFull}
          </span>
        );
    }
  };

  const getProgressBarColor = (status: DemandStatus) => {
    switch (status) {
      case 'LOW':
        return 'bg-emerald-500';
      case 'NORMAL':
        return 'bg-blue-600';
      case 'HIGH':
        return 'bg-amber-500';
      case 'FULL':
        return 'bg-rose-600';
    }
  };

  const handleSeedDemo = async () => {
    try {
      setIsProcessing(true);
      await seedDemoData();
      setActionNotice(t.exampleLoadedNotice);
      onRefresh();
      setTimeout(() => setActionNotice(null), 4000);
    } catch (e: any) {
      setActionNotice(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsProcessing(true);
      await resetJourneys(currentBus?._id);
      setActionNotice(t.dataResetNotice);
      onRefresh();
      setTimeout(() => setActionNotice(null), 4000);
    } catch (e: any) {
      setActionNotice(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickAddPassenger = async () => {
    if (!currentBus || currentBus.stops.length < 2) return;
    try {
      setIsProcessing(true);
      const stops = currentBus.stops;
      await createJourney({
        busId: currentBus._id,
        busNumber: currentBus.busNumber,
        passengerName: 'Quick Commuter',
        fromStop: stops[0].name,
        toStop: stops[Math.min(3, stops.length - 1)].name,
        passengerCount: 2,
      });
      setActionNotice(`Added 2 passengers (${stops[0].name} → ${stops[Math.min(3, stops.length - 1)].name})`);
      onRefresh();
      setTimeout(() => setActionNotice(null), 3000);
    } catch (e: any) {
      setActionNotice(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const getDecisionRecommendationText = () => {
    if (!demandSummary) return t.recOptimal;
    switch (demandSummary.recommendationKey) {
      case 'overcrowded':
        return t.recOvercrowded;
      case 'moderate':
        return t.recModerate;
      case 'underutilized':
        return t.recUnderutilized;
      case 'optimal':
      default:
        return t.recOptimal;
    }
  };

  const getDecisionBannerStyle = () => {
    if (!demandSummary) return 'bg-blue-50 border-blue-200 text-blue-900';
    switch (demandSummary.recommendationKey) {
      case 'overcrowded':
        return 'bg-rose-50 border-rose-300 text-rose-950';
      case 'moderate':
        return 'bg-amber-50 border-amber-300 text-amber-950';
      case 'underutilized':
        return 'bg-slate-50 border-slate-300 text-slate-800';
      case 'optimal':
      default:
        return 'bg-emerald-50 border-emerald-300 text-emerald-950';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.decisionSupportBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.operatorDashboardTitle}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-300">
              {t.operatorDashboardDesc}
            </p>
          </div>

          {/* Bus Route Selector */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 min-w-[280px]">
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {t.selectRoute}
            </label>
            <div className="relative">
              <select
                value={selectedBusId}
                onChange={(e) => onSelectBus(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {buses.map((b) => (
                  <option key={b._id} value={b._id}>
                    Bus {b.busNumber} • {b.routeName}
                  </option>
                ))}
              </select>
              <BusIcon className="w-4 h-4 text-blue-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action & Simulation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Simulation Tools:
          </span>
          <button
            type="button"
            onClick={handleSeedDemo}
            disabled={isProcessing}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-medium transition-colors"
          >
            {t.seedDemoDataBtn}
          </button>
          <button
            type="button"
            onClick={handleQuickAddPassenger}
            disabled={isProcessing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium transition-colors"
          >
            + Quick 2 Passengers
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isProcessing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-lg font-medium transition-colors"
          >
            {t.resetDataBtn}
          </button>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors ml-auto"
          title="Refresh Demand Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {actionNotice && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm rounded-xl flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Capacity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.busCapacity}
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {demandSummary?.capacity || currentBus?.capacity || 60}{' '}
            <span className="text-xs font-normal text-slate-500">seats</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Bus {currentBus?.busNumber}
          </div>
        </div>

        {/* Peak Demand */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.currentPeakDemand}
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>{demandSummary?.peakOccupancy || 0}%</span>
            {demandSummary && getStatusBadge(
              demandSummary.peakOccupancy >= 95
                ? 'FULL'
                : demandSummary.peakOccupancy >= 75
                ? 'HIGH'
                : demandSummary.peakOccupancy >= 40
                ? 'NORMAL'
                : 'LOW'
            )}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Max passenger load along route
          </div>
        </div>

        {/* Peak Bottleneck Stop */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.peakStop}
          </div>
          <div className="mt-2 text-lg sm:text-xl font-bold text-slate-900 truncate" title={demandSummary?.peakStop}>
            {demandSummary?.peakStop || 'None'}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Highest crowd concentration
          </div>
        </div>

        {/* Total Booked Passengers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.totalJourneys}
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {demandSummary?.totalJourneys || 0}{' '}
            <span className="text-xs font-normal text-slate-500">
              ({demandSummary?.totalBookedPassengers || 0} passengers)
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Logged across stops
          </div>
        </div>
      </div>

      {/* Decision Support Advisory Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${getDecisionBannerStyle()} shadow-xs`}>
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base">
                {t.decisionSupportTitle}
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/80 border border-slate-200">
                {t.decisionSupportBadge}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {getDecisionRecommendationText()}
            </p>
            <div className="text-xs opacity-80 pt-1 border-t border-slate-200/50 mt-2">
              <strong>{t.actionAdvice}</strong> This tool displays expected passenger occupancy calculated from booked passenger journeys. It assists supervisors in fleet allocation and frequency adjustments.
            </div>
          </div>
        </div>
      </div>

      {/* Main Stop-by-Stop Demand Table & Visual Progression */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-blue-600" />
              <span>{t.demandForecastTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t.demandForecastDesc}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> {t.statusLow}
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block ml-2"></span> {t.statusNormal}
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block ml-2"></span> {t.statusHigh}
            <span className="w-3 h-3 rounded-full bg-rose-600 inline-block ml-2"></span> {t.statusFull}
          </div>
        </div>

        {/* Visual Stop-by-Stop Flow Cards (Mobile and Desktop) */}
        <div className="divide-y divide-slate-100">
          {demandSummary?.stops.map((stop, idx) => {
            const isLast = idx === (demandSummary?.stops.length || 0) - 1;
            return (
              <div
                key={stop.sequence}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Sequence and Stop Name */}
                <div className="flex items-center gap-3.5 min-w-[220px]">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-700 shrink-0">
                    {stop.sequence}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <span>{getLocalizedStop(stop)}</span>
                      {isLast && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          Terminal
                        </span>
                      )}
                    </div>
                    {/* Secondary script preview if different */}
                    {language !== 'en' && stop.stopName !== getLocalizedStop(stop) && (
                      <div className="text-xs text-slate-400">
                        {stop.stopName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Center: Boarding & Alighting Activity */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {t.boarding}: <b>+{stop.boardingCount}</b>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                    <ArrowDownRight className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {t.alighting}: <b>-{stop.alightingCount}</b>
                    </span>
                  </div>
                </div>

                {/* Right: Expected Occupancy & Visual Gauge */}
                <div className="flex items-center gap-4 sm:min-w-[280px]">
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1">
                      <span className="text-slate-800 font-bold text-sm">
                        {stop.onboardCount}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          / {stop.capacity} passengers
                        </span>
                      </span>
                      <span className="text-slate-600">
                        {stop.occupancyPercentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(
                          stop.status
                        )}`}
                        style={{ width: `${Math.min(100, stop.occupancyPercentage)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="shrink-0 w-24 text-right">
                    {getStatusBadge(stop.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Journeys Log Drawer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <button
          type="button"
          onClick={() => setShowJourneysList(!showJourneysList)}
          className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-800 hover:text-blue-600 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{t.activeJourneysList}</span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600 font-normal">
              {journeys.length} total
            </span>
          </div>
          {showJourneysList ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showJourneysList && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            {journeys.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">
                {t.noActiveJourneys}
              </p>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {journeys.map((j) => (
                  <div
                    key={j._id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-900">
                        {j.passengerName}
                      </span>
                      <span className="text-slate-500 ml-2">
                        ({j.passengerCount} passengers)
                      </span>
                      <div className="text-slate-600 text-[11px] mt-0.5">
                        {j.fromStop} → {j.toStop}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {new Date(j.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
