import React, { useState } from 'react';
import { FileText, Stethoscope, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type BookSection = 'documents' | 'prescription' | 'summary';

const EvidenceBook: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<BookSection>('documents');

  const menuItems = [
    { id: 'documents' as const, icon: FileText, label: t('yourDocuments'), content: t('documentsContent') },
    { id: 'prescription' as const, icon: Stethoscope, label: t('doctorPrescription'), content: t('prescriptionContent') },
    { id: 'summary' as const, icon: ClipboardList, label: t('summary'), content: t('summaryContent') },
  ];

  const activeContent = menuItems.find(item => item.id === activeSection);

  return (
    <div className="flex flex-col items-center">
      
      {/* Book Container */}
      <div
        className="relative cursor-pointer perspective-1000"
        style={{ perspective: '1500px' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Book Wrapper */}
        <div className="relative w-[280px] md:w-[380px] h-[350px] md:h-[420px]">
          
          {/* Back Cover / Right Page */}
          <div className="absolute inset-0 book-cover rounded-r-lg rounded-l-sm shadow-2xl">
            {/* Right page content (visible when book is open) */}
            <div
              className={`absolute inset-0 paper-texture rounded-r-lg p-6 md:p-8 transition-opacity duration-500 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="h-full flex flex-col">
                <h3 className="font-book text-xl md:text-2xl text-[#4a3f2f] mb-4 border-b-2 border-[#8b7355] pb-2">
                  {activeContent?.label}
                </h3>
                <div className="flex-1 overflow-auto">
                  <p className="text-[#5a4f42] leading-relaxed font-body text-sm md:text-base">
                    {activeContent?.content}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="mt-6 space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 bg-[#c4b5a0] rounded opacity-40"
                        style={{ width: `${100 - i * 20}%` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Page fold effect */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-[#d4c4a8] to-[#b8a88c] rounded-tl-lg shadow-inner" />
              </div>
            </div>
          </div>

          {/* Front Cover / Left Page (the flipping part) */}
          <div
            className={`absolute inset-0 origin-left transition-transform duration-700 ease-out transform-gpu`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front of cover */}
            <div
              className="absolute inset-0 book-cover rounded-lg flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Cover decoration */}
              <div className="absolute inset-4 border-2 border-primary/30 rounded-lg" />
              <div className="absolute inset-6 border border-primary/20 rounded-lg" />
              
              {/* Title */}
              <div className="text-center z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center neon-glow-cyan">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-book text-2xl md:text-3xl text-primary neon-text-cyan mb-2">
                  Evidence
                </h3>
                <h3 className="font-book text-2xl md:text-3xl text-secondary neon-text-purple">
                  Book
                </h3>
                <p className="text-primary/60 text-sm mt-4 font-body">
                  Hover to open
                </p>
              </div>
              
              {/* Spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 to-transparent rounded-l-lg" />
            </div>

            {/* Back of cover (left page when open) */}
            <div
              className="absolute inset-0 paper-texture rounded-l-lg p-4 md:p-6"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Left page with menu */}
              <div className="h-full flex flex-col">
                <h3 className="font-book text-lg md:text-xl text-[#4a3f2f] mb-4 border-b-2 border-[#8b7355] pb-2">
                  Contents
                </h3>
                
                <nav className="flex-1 space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSection(item.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left group ${
                        activeSection === item.id
                          ? 'bg-[#8b7355]/20 text-[#4a3f2f]'
                          : 'hover:bg-[#8b7355]/10 text-[#6a5f52]'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        activeSection === item.id ? 'text-[#6b5a3e]' : 'text-[#8b7a5f]'
                      }`} />
                      <span className="font-body text-sm md:text-base relative">
                        {item.label}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-[#6b5a3e] transition-all duration-300 ${
                          activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </span>
                    </button>
                  ))}
                </nav>
                
                {/* Page number */}
                <div className="text-center text-[#8b7a5f] text-sm font-book">
                  — i —
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceBook;
