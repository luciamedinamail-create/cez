interface TechnicalDetailsGridProps {
  label: string;
  facts: Record<string, string>;
}

export default function TechnicalDetailsGrid({ label, facts }: TechnicalDetailsGridProps) {
  return (
    <section id="dati-tecnici" className="max-w-[1400px] mx-auto page-padding py-[80px] lg:py-[96px] scroll-mt-48">
      <div className="border-t border-b border-line-divider py-16 lg:py-24">
        <h2 className="label-l !text-[13px] mb-16 lg:mb-24">{label}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 lg:gap-x-24 gap-y-12 lg:gap-y-16">
          {Object.entries(facts).map(([key, val]) => (
            <div key={key} className="space-y-3">
              <span className="label-s !text-[12px]">{key}</span>
              <p className="body-m !text-[16px] text-text-primary !leading-[1.45]">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
