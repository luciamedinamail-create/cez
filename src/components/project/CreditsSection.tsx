import { CreditItem } from '../../types/project';
import { useLanguage } from '../../contexts/LanguageContext';

interface CreditsSectionProps {
  credits: CreditItem[];
}

export default function CreditsSection({ credits }: CreditsSectionProps) {
  const { language } = useLanguage();
  const getLocalized = (val: any) => {
    if (typeof val === 'string') return val;
    return val[language] || val.en;
  };

  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16 py-24 border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-3">
          <h2 className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-primary">
            CREDITI
          </h2>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 md:gap-x-16 gap-y-10 lg:gap-y-12 text-left">
            {credits.map((credit, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[12px] uppercase tracking-[0.10em] font-bold text-text-muted mb-2">
                  {getLocalized(credit.label)}
                </span>
                <span className="text-[16px] leading-[1.45] text-text-primary">
                  {getLocalized(credit.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
