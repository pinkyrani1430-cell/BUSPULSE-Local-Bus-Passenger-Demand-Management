import React from 'react';
import { Bus, ShieldAlert, Globe, HelpCircle, Users, BarChart3 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeRole: 'passenger' | 'operator';
  onRoleChange: (role: 'passenger' | 'operator') => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeRole,
  onRoleChange,
  onOpenAbout,
}) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Bus className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Center Role Navigation Switcher */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => onRoleChange('passenger')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 ${
                activeRole === 'passenger'
                  ? 'bg-white text-blue-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.navPassenger}</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('operator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 ${
                activeRole === 'operator'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t.navOperator}</span>
            </button>
          </nav>

          {/* Right Controls: Language Selector & About */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector */}
            <div className="relative flex items-center bg-blue-50/60 border border-blue-200 rounded-lg p-0.5">
              <Globe className="w-3.5 h-3.5 text-blue-600 ml-2 hidden sm:block" />
              <div className="flex text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'en'
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-blue-700'
                  }`}
                  title="English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('hi')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'hi'
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-blue-700'
                  }`}
                  title="हिन्दी"
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('kn')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'kn'
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-blue-700'
                  }`}
                  title="ಕನ್ನಡ"
                >
                  ಕನ್ನಡ
                </button>
              </div>
            </div>

            {/* Help / About Button */}
            <button
              type="button"
              onClick={onOpenAbout}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
              title={t.navAbout}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
