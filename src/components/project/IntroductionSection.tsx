import { useLanguage } from '../../contexts/LanguageContext';
import { LocalizedString } from '../../data/projects';

interface IntroductionSectionProps {
  paragraphs: (string | LocalizedString)[];
}

export default function IntroductionSection({ paragraphs }: IntroductionSectionProps) {
  const { language } = useLanguage();
  
  const getLocalized = (val: string | LocalizedString) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-3">
          <h2 className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-primary">
            INTRODUZIONE
          </h2>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">
          <div className="space-y-8 max-w-[760px]">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[18px] leading-[1.65] font-normal text-text-primary">
                {getLocalized(p)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
