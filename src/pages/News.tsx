import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { contentService, NewsArticle } from '../services/contentService';
import { useLanguage } from '../contexts/LanguageContext';

const STATIC_NEWS = [
  {
    date: 'Jan 2026',
    category: 'Exhibitions',
    title: {
      it: 'Minimalismo nelle Alpi: Un reportage su ArchDaily',
      de: 'Minimalismus in den Alpen: Ein Beitrag in ArchDaily',
      en: 'Minimalism in the Alps: A feature in ArchDaily'
    },
    description: {
      it: 'Il nostro progetto Brixen Interior è stato selezionato come progetto del mese dalla redazione.',
      de: 'Unser Projekt Brixen Interior wurde von der Redaktion zum Projekt des Monats gewählt.',
      en: 'Our Brixen Interior project has been selected as the project of the month by the editorial board.'
    }
  },
  {
    date: 'Dec 2025',
    category: 'Awards',
    title: {
      it: 'CEZ Studio vince il Premio Nazionale di Architettura per la Sostenibilità',
      de: 'CEZ Studio gewinnt den Nationalen Architekturpreis für Nachhaltigkeit',
      en: 'CEZ Studio wins the National Architecture Award for Sustainability'
    },
    description: {
      it: 'Il progetto Muehlrain Exterior è stato premiato per l\'uso innovativo di legno recuperato e integrazione solare.',
      de: 'Das Projekt Muehlrain Exterior wurde für den innovativen Einsatz von Altholz und die Integration von Solarenergie gelobt.',
      en: 'The Muehlrain Exterior project was praised for its innovative use of reclaimed timber and solar integration.'
    }
  },
  {
    date: 'Nov 2025',
    category: 'Books',
    title: {
      it: 'Nuova Pubblicazione: "Ritmo e Silenzio"',
      de: 'Neue Publikation: "Rhythmus und Stille"',
      en: 'New Publication: "Rhythm and Silence"'
    },
    description: {
      it: 'La nostra prima monografia che esplora dieci anni di pratica architettonica nelle Alpi italiane è ora disponibile.',
      de: 'Unsere erste Monographie über zehn Jahre Architekturpraxis in den italienischen Alpen ist jetzt erhältlich.',
      en: 'Our first monograph exploring ten years of architectural practice in the Italian Alps is now available.'
    }
  }
];

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>(STATIC_NEWS as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const fbNews = await contentService.getNews();
      if (fbNews && fbNews.length > 0) {
        setNews([...fbNews, ...STATIC_NEWS] as any);
      }
      setLoading(false);
    }
    loadNews();
  }, []);
  const { language, t, tCategory } = useLanguage();
  const getLocalized = (val: string | any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.en || val.it || val.de || '';
  };

  return (
    <div className="max-w-[1400px] mx-auto page-padding section-padding">
      <header className="mb-24 md:mb-32 lg:mb-40 max-w-[1100px]">
        <h1 className="display-l mb-10 md:mb-12">{t('news_updates')}</h1>
        <p className="metadata-token">Journal / {t('cat_exhibitions')} / {t('cat_publication')}</p>
      </header>

      <div className="space-y-16 md:space-y-24">
        {news.map((item, i) => (
          <motion.article 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12 lg:gap-x-20 border-b border-line-divider pb-16 md:pb-24 items-baseline"
          >
            <div className="md:col-span-2">
              <span className="metadata-token">{item.date}</span>
            </div>
            <div className="md:col-span-3">
              <span className="label-s px-3 py-1 border border-line-divider text-[10px]">{tCategory(item.category)}</span>
            </div>
            <div className="md:col-span-7 space-y-8">
              <h2 className="h2 group-hover:text-text-primary transition-colors cursor-pointer">{getLocalized(item.title)}</h2>
              <p className="body-m">{getLocalized(item.description)}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
