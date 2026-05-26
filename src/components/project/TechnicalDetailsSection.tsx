import { TechnicalDetail } from '../../types/project';

interface TechnicalDetailsSectionProps {
  details: TechnicalDetail[];
}

export default function TechnicalDetailsSection({ details }: TechnicalDetailsSectionProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-12 md:px-16">
      <div className="border-t border-b border-black/10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-[13px] uppercase tracking-[0.14em] font-bold text-text-primary">
              DATI TECNICI
            </h2>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 md:gap-x-16 gap-y-10 lg:gap-y-12">
              {details.map((detail, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[12px] uppercase tracking-[0.10em] font-bold text-text-muted mb-2">
                    {detail.label}
                  </span>
                  <span className="text-[16px] leading-[1.45] text-text-primary">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
