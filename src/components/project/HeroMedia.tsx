import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedString } from '../../data/projects';

interface HeroMediaProps {
  src: string;
  alt: string;
  caption?: string | LocalizedString;
}

export default function HeroMedia({ src, alt, caption }: HeroMediaProps) {
  const { language } = useLanguage();
  
  const getLocalized = (val: string | LocalizedString) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 mb-24 lg:mb-32">
      <div className="w-full aspect-video lg:aspect-[16/10] max-h-[82vh] min-h-[360px] md:min-h-[560px] relative overflow-hidden bg-bg-secondary">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain"
        />
      </div>
      {caption && (
        <div className="mt-4 max-w-[680px]">
          <p className="text-[13px] leading-[1.4] text-text-primary text-left">
            {getLocalized(caption)}
          </p>
        </div>
      )}
    </section>
  );
}
