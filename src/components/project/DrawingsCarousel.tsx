import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DrawingsCarouselProps {
  label: string;
  drawings: string[];
  year?: string;
  onImageClick: (idx: number) => void;
}

export default function DrawingsCarousel({ label, drawings, year, onImageClick }: DrawingsCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const newIdx = direction === 'left' 
      ? (currentIdx > 0 ? currentIdx - 1 : drawings.length - 1)
      : (currentIdx < drawings.length - 1 ? currentIdx + 1 : 0);
    
    goTo(newIdx);
  };

  const goTo = (idx: number) => {
    setCurrentIdx(idx);
    if (scrollRef.current) {
      const scrollAmount = idx * scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scroll('left');
      if (e.key === 'ArrowRight') scroll('right');
    };
    // Only if visible? Maybe not needed for strict scoping
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, drawings.length]);

  if (!drawings || drawings.length === 0) return null;

  return (
    <section id="piante-e-sezioni" className="max-w-[1400px] mx-auto page-padding py-[80px] lg:py-[96px] scroll-mt-48">
      <div className="bg-[#FAFAF8] border border-line-border py-20 lg:py-32 px-6 md:px-12 relative">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
          <div className="space-y-3">
            <h2 className="label-l !text-[13px]">{label}</h2>
            <p className="metadata-token text-text-secondary">
              Drawing {String(currentIdx + 1).padStart(2, '0')} / {String(drawings.length).padStart(2, '0')}
            </p>
          </div>
          
          {drawings.length > 1 && (
            <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="p-5 lg:p-6 rounded-full border border-line-divider text-text-primary hover:bg-text-primary hover:text-white transition-all duration-300"
                aria-label="Previous drawing"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-5 lg:p-6 rounded-full border border-line-divider text-text-primary hover:bg-text-primary hover:text-white transition-all duration-300"
                aria-label="Next drawing"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
        
        <div className="max-w-[1200px] mx-auto">
          <div 
            ref={scrollRef}
            className="overflow-x-hidden snap-x snap-mandatory flex hide-scrollbar"
          >
            {drawings.map((p, i) => (
              <div 
                key={i} 
                className="flex-none w-full snap-center flex flex-col bg-bg-primary border border-line-divider p-6 md:p-16 lg:p-24"
              >
                 <div className="flex-grow flex items-center justify-center h-[320px] md:h-[480px] lg:h-[600px] xl:h-[720px]">
                   <img 
                     src={p} 
                     alt={`Drawing ${i+1}`} 
                     onClick={() => onImageClick(i)}
                     className="max-w-full max-h-full grayscale mix-blend-darken hover:grayscale-0 transition-all duration-700 object-contain cursor-zoom-in" 
                   />
                 </div>
                 <div className="mt-12 space-y-2">
                   <h4 className="h4 text-text-primary">Plan Drawing {i + 1}</h4>
                   <p className="metadata-token text-text-secondary">Technical Drawing / {year}</p>
                 </div>
              </div>
            ))}
          </div>

          {/* Thumbnail Strip */}
          {drawings.length > 1 && (
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {drawings.map((p, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-20 md:w-24 aspect-[4/3] border-2 transition-all p-2 bg-white
                    ${currentIdx === i ? 'border-text-primary' : 'border-line-divider'}
                  `}
                >
                  <img src={p} className="w-full h-full object-contain grayscale opacity-60 hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
