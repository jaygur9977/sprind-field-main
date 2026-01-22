import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, patient, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-cyan">
            <span className="text-primary-foreground font-bold text-lg">SF</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wide">
            Spring<span className="text-primary">Field</span>
          </span>
        </div>

        {/* Patient ID Badge (if logged in) */}
        {isAuthenticated && patient && (
          <div className="hidden md:flex items-center">
            <div className="patient-badge text-foreground">
              <span className="opacity-70">{t('patientId')}:</span>{' '}
              <span className="text-primary font-bold">{patient.patientId}</span>
            </div>
          </div>
        )}

        {/* Toggles */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:neon-glow-purple transition-all duration-300 group"
          >
            <Globe className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'हिंदी' : 'EN'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:neon-glow-cyan transition-all duration-300 group"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{t('lightMode')}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{t('darkMode')}</span>
              </>
            )}
          </button>

          {/* Logout Button (if logged in) */}
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="btn-glow border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              {t('logout')}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Patient ID Badge */}
      {isAuthenticated && patient && (
        <div className="md:hidden border-t border-border/50 py-2 px-4">
          <div className="patient-badge text-foreground text-center">
            <span className="opacity-70">{t('patientId')}:</span>{' '}
            <span className="text-primary font-bold">{patient.patientId}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
