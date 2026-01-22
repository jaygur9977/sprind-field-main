import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '@/components/TopBar';
import BackgroundEffects from '@/components/BackgroundEffects';
import EvidenceBook from '@/components/EvidenceBook';
import ChatBot from '@/components/ChatBot';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { patient } = useAuth();

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />
      <TopBar />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Welcome back, <span className="text-primary neon-text-cyan">{patient?.name}</span>
          </h1>
        </div>

        {/* Patient Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Allergies Card */}
          <div className="glass-card py-4">
            <h3 className="font-display text-base font-semibold mb-2 text-secondary">
              {t('allergies')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {patient?.allergies && patient.allergies.length > 0 ? (
                patient.allergies.map((allergy, index) => (
                  <span key={index} className="tag text-xs">
                    {allergy}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">No allergies recorded</span>
              )}
            </div>
          </div>

          {/* Health Problems Card */}
          <div className="glass-card py-4">
            <h3 className="font-display text-base font-semibold mb-2 text-accent">
              {t('healthProblems')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {patient?.problems && patient.problems.length > 0 ? (
                patient.problems.map((problem, index) => (
                  <span key={index} className="tag text-xs">
                    {problem}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">No health problems recorded</span>
              )}
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="glass-card py-4">
            <h3 className="font-display text-base font-semibold mb-2 text-primary">
              Contact Info
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Age:</span>{' '}
                <span className="font-medium">{patient?.age} years</span>
              </p>
              <p>
                <span className="text-muted-foreground">Mobile:</span>{' '}
                <span className="font-medium">{patient?.mobile}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ChatBot + Evidence Book Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Evidence Book - Shows first on mobile, right on desktop */}
          <div className="flex flex-col items-center order-1 lg:order-2">
            <h2 className="font-book text-2xl md:text-3xl text-foreground mb-6 text-center neon-text-cyan">
              {t('evidenceBook')}
            </h2>
            <EvidenceBook />
            <p className="mt-4 text-muted-foreground text-sm text-center">
              Tap/hover to explore your medical records
            </p>
          </div>

          {/* ChatBot - Shows second on mobile, left on desktop */}
          <div className="flex flex-col order-2 lg:order-1">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 text-center lg:text-left neon-text-purple">
              Health Assistant
            </h2>
            <ChatBot />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
