import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: 'it' | 'de' | 'en'; label: string }[] = [
    { code: 'it', label: 'IT' },
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
  ];

  const currentLanguageLabel = languages.find(l => l.code === language)?.label || language.toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] uppercase tracking-widest font-bold bg-white text-black hover:bg-black/5 transition-all rounded-sm border border-black"
      >
        <Globe size={11} className="text-black" />
        <span>{currentLanguageLabel}</span>
        <ChevronDown size={8} className={`transform transition-transform duration-300 text-black ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-24 bg-white border border-black shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest text-left hover:bg-black/5 transition-colors flex items-center justify-between ${
                    language === lang.code ? 'font-bold text-black bg-black/5' : 'text-black/60'
                  }`}
                >
                  {lang.label}
                  {language === lang.code && <div className="w-1 h-1 bg-black rounded-full" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
