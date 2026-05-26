import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedString } from '../../data/projects';

interface ProjectHeroProps {
  title: string | LocalizedString;
  subtitle: string | LocalizedString;
  year: string;
  category: string;
}

export default function ProjectHero({ title, subtitle, year, category }: ProjectHeroProps) {
  const { language } = useLanguage();
  
  const getLocalized = (val: string | LocalizedString) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[44px] md:text-[56px] lg:text-[76px] font-bold leading-[0.95] tracking-[-0.03em] max-w-[900px] uppercase mb-8 md:mb-12"
          >
            {getLocalized(title)}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[22px] md:text-[28px] leading-[1.35] font-normal max-w-[760px] text-text-primary"
          >
            {getLocalized(subtitle)}
          </motion.p>
        </div>

        <div className="lg:col-span-3 lg:col-start-10 mt-4 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-col">
              <span className="text-[12px] uppercase tracking-[0.14em] font-bold text-text-muted mb-1">Year</span>
              <span className="text-[16px] text-text-primary">{year}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] uppercase tracking-[0.14em] font-bold text-text-muted mb-1">Category</span>
              <span className="text-[16px] text-text-primary">{category}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
