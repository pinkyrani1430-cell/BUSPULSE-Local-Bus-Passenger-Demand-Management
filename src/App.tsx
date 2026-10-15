import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { PassengerView } from './components/PassengerView';
import { OperatorDashboard } from './components/OperatorDashboard';
import { AboutModal } from './components/AboutModal';
import { Bus, DemandSummary, Journey, Language } from './types';
import { translations } from './i18n';
import { fetchBuses, fetchDemand, fetchJourneys } from './api';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('buspulse_lang') as Language) || 'en';
  });
  const [activeRole, setActiveRole] = useState<'passenger' | 'operator'>('passenger');
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<string>('');
  const [demandSummary, setDemandSummary] = useState<DemandSummary | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[language];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('buspulse_lang', lang);
  };

  // Load initial bus list
  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const busList = await fetchBuses();
        setBuses(busList);
        if (busList.length > 0) {
          // Default to Bus 500 or first bus
          const defaultBus = busList.find((b) => b.busNumber === '500') || busList[0];
          setSelectedBusId(defaultBus._id);
        }
      } catch (err) {
        console.error('Error loading initial buses:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Fetch demand summary and journeys whenever selectedBusId changes
  const loadDemandAndJourneys = useCallback(async (busId: string) => {
    if (!busId) return;
    try {
      const [demand, journeyList] = await Promise.all([
        fetchDemand(busId),
        fetchJourneys(busId),
      ]);
      setDemandSummary(demand);
      setJourneys(journeyList);
    } catch (err) {
      console.error('Error fetching demand/journeys:', err);
    }
  }, []);

  useEffect(() => {
    if (selectedBusId) {
      loadDemandAndJourneys(selectedBusId);
    }
  }, [selectedBusId, loadDemandAndJourneys]);

  const handleJourneyUpdated = () => {
    if (selectedBusId) {
      loadDemandAndJourneys(selectedBusId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Navbar with role tabs and language switcher */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Loading BusPulse System...</p>
          </div>
        ) : (
          <div>
            {activeRole === 'passenger' ? (
              <PassengerView
                buses={buses}
                selectedBusId={selectedBusId}
                onSelectBus={setSelectedBusId}
                language={language}
                onJourneyBooked={handleJourneyUpdated}
                onNavigateToOperator={() => setActiveRole('operator')}
              />
            ) : (
              <OperatorDashboard
                buses={buses}
                selectedBusId={selectedBusId}
                onSelectBus={setSelectedBusId}
                demandSummary={demandSummary}
                journeys={journeys}
                language={language}
                onRefresh={handleJourneyUpdated}
                onNavigateToPassenger={() => setActiveRole('passenger')}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">BusPulse</span>
            <span>•</span>
            <span>Local Bus Passenger-Demand Management</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Node.js • Express • MongoDB • React</span>
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="text-blue-600 hover:underline"
            >
              System Documentation
            </button>
          </div>
        </div>
      </footer>

      {/* About & Instructions Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        language={language}
      />
    </div>
  );
}
