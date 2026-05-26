import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Drawing } from '../../types/project';

interface PlansSectionsCarouselProps {
  drawings: Drawing[];
}

export default function PlansSectionsCarousel({ drawings }: PlansSectionsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  const getLocalized = (val: string | any) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % drawings.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + drawings.length) % drawings.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!drawings.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 py-24 md:py-32">
      <div className="mb-12">
        <h2 className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-primary">
          PIANTE E SEZIONI
        </h2>
      </div>

      <div className="relative border border-black/10 bg-[#F9F9F9] group">
        <div className="w-full h-[420px] md:h-[620px] lg:h-[760px] p-8 md:p-16 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={drawings[currentIndex].src}
              alt={getLocalized(drawings[currentIndex].title)}
              className="max-w-full max-h-full object-contain mix-blend-darken cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            />
          </AnimatePresence>

          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-black/5 bg-white/80 backdrop-blur shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all z-10 opacit-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-black/5 bg-white/80 backdrop-blur shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-black/5 bg-white/80 backdrop-blur shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Info */}
        <div className="p-8 border-t border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[12px] uppercase tracking-[0.14em] font-bold text-text-muted mb-2 block">
              {getLocalized(drawings[currentIndex].type)}
            </span>
            <h3 className="text-[20px] font-normal text-text-primary">
              {getLocalized(drawings[currentIndex].title)}
            </h3>
          </div>
          <div className="flex gap-8 text-[12px] text-text-muted uppercase tracking-wider font-medium">
            {drawings[currentIndex].scale && (
              <div>Scale: {drawings[currentIndex].scale}</div>
            )}
            {drawings[currentIndex].date && (
              <div>Date: {drawings[currentIndex].date}</div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {drawings.map((drawing, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`flex-shrink-0 w-24 md:w-32 aspect-[4/3] border bg-[#F9F9F9] p-2 transition-all ${
              i === currentIndex ? 'border-black' : 'border-black/5'
            }`}
          >
            <img 
              src={drawing.src} 
              alt="" 
              className="w-full h-full object-contain mix-blend-darken" 
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-8 md:p-16 cursor-zoom-out"
            onClick={() => setIsModalOpen(false)}
          >
            <button className="absolute top-8 right-8 text-black flex items-center gap-2 group">
              <span className="text-[13px] uppercase tracking-widest font-bold">Close</span>
              <X size={24} />
            </button>
            <img
              src={drawings[currentIndex].src}
              alt=""
              className="max-w-full max-h-full object-contain mix-blend-darken"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
