import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, BookOpen, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TopBar from '@/components/TopBar';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: 'Secure Records',
      description: 'Your health data is encrypted and protected with enterprise-grade security.',
      color: 'text-primary',
      glow: 'neon-glow-cyan',
    },
    {
      icon: BookOpen,
      title: 'Evidence Book',
      description: 'Access your complete medical history in a beautiful, intuitive interface.',
      color: 'text-secondary',
      glow: 'neon-glow-purple',
    },
    {
      icon: Activity,
      title: 'Health Tracking',
      description: 'Monitor your health journey with comprehensive summaries and insights.',
      color: 'text-accent',
      glow: 'neon-glow-green',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />
      <TopBar />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Your Health,</span>
              <br />
              <span className="text-primary neon-text-cyan">Your Control</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              SpringField Patient Portal — A futuristic healthcare platform where your medical records come alive in a beautiful, secure, and intuitive experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="btn-glow bg-gradient-to-r from-primary to-secondary h-14 px-8 text-lg font-semibold group">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="h-14 px-8 text-lg font-semibold border-primary/50 hover:bg-primary/10">
                  {t('login')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card text-center group hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-background to-muted flex items-center justify-center ${feature.glow} group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="text-center glass-card max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to take control of your <span className="text-primary">health records</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust SpringField for secure, beautiful, and accessible medical record management.
          </p>
          <Link to="/register">
            <Button className="btn-glow bg-gradient-to-r from-secondary to-primary h-12 px-10 text-lg font-semibold">
              {t('createAccount')}
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 SpringField Patient Portal. Built for the future of healthcare.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
