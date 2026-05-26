import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectSubnavProps {
  activeSection: string;
  scrollTo: (id: string) => void;
  sections: { id: string, name: string }[];
}

export default function ProjectSubnav({ activeSection, scrollTo, sections }: ProjectSubnavProps) {
  return (
    <nav className="sticky top-[72px] md:top-[88px] lg:top-[94px] z-40 bg-white/95 backdrop-blur-md border-b border-line-divider hidden md:block transition-all">
      <div className="max-w-[1400px] mx-auto page-padding h-10 lg:h-12 flex items-center justify-center gap-4 lg:gap-6">
        {sections.map(s => (
          <button 
            key={s.id} 
            onClick={() => scrollTo(s.id)}
            className={`relative h-full project-tab-token transition-all flex items-center
              ${activeSection === s.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            {s.name}
            {activeSection === s.id && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-text-primary"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
