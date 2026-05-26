import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedString } from '../../data/projects';

interface QuoteBlockProps {
  quote: string | LocalizedString;
  attribution?: string | LocalizedString;
}

export default function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  const { language } = useLanguage();
  
  const getLocalized = (val: string | LocalizedString) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 py-16 md:py-24">
      <div className="max-w-[800px] lg:ml-[33.333%]">
        <blockquote className="text-[24px] md:text-[30px] leading-[1.4] font-normal text-text-primary mb-6">
          "{getLocalized(quote)}"
        </blockquote>
        {attribution && (
          <cite className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-muted not-italic">
            — {getLocalized(attribution)}
          </cite>
        )}
      </div>
    </section>
  );
}
