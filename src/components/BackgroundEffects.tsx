import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating orbs */}
      <div 
        className="floating-orb w-96 h-96 bg-primary top-20 -left-48"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="floating-orb w-80 h-80 bg-secondary top-1/2 -right-40"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="floating-orb w-64 h-64 bg-accent bottom-20 left-1/4"
        style={{ animationDelay: '4s' }}
      />
      <div 
        className="floating-orb w-72 h-72 bg-primary/50 bottom-40 right-1/4"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
    </div>
  );
};

export default BackgroundEffects;
