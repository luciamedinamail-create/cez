import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EditorialGalleryProps {
  label: string;
  images: string[];
}

export default function EditorialGallery({ label, images }: EditorialGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  if (!images || images.length === 0) return null;

  const next = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  return (
    <section id="photography" className="max-w-[1400px] mx-auto page-padding py-[80px] lg:py-[96px] scroll-mt-48">
      <div className="relative group">
        <div 
          className="w-full aspect-[4/3] md:aspect-video lg:aspect-[16/10] bg-bg-secondary overflow-hidden flex items-center justify-center relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 35 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <img 
                src={images[currentIndex]} 
                alt={`${label} ${currentIndex + 1}`} 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Controls Overlay */}
          <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button 
              onClick={prev}
              className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 text-white flex items-center justify-center transition-all hover:bg-white hover:text-black shadow-2xl active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={next}
              className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 text-white flex items-center justify-center transition-all hover:bg-white hover:text-black shadow-2xl active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Index indicator */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 px-5 py-2.5 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.25em] z-20 shadow-xl">
            <span className="opacity-50">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-3 text-white/20">/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>

          {/* Gradient Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 pointer-events-none" />
        </div>

        {/* Progress Bar Dots */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {images.map((_, i) => (
            <button 
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setIsAutoPlaying(false);
              }}
              className="relative h-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-all group overflow-hidden"
              style={{ width: i === currentIndex ? '64px' : '12px' }}
            >
              {i === currentIndex && isAutoPlaying && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute inset-0 bg-text-primary"
                />
              )}
              {i === currentIndex && !isAutoPlaying && (
                <div className="absolute inset-0 bg-text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
