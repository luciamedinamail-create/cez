interface CreditsGridProps {
  label: string;
  credits: Record<string, string>;
}

export default function CreditsGrid({ label, credits }: CreditsGridProps) {
  return (
    <section id="crediti" className="max-w-[1400px] mx-auto page-padding py-[80px] lg:py-[96px] scroll-mt-48">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 border-t border-line-divider pt-16 lg:pt-24">
        <div className="lg:col-span-4">
          <h2 className="label-l !text-[13px]">{label}</h2>
        </div>
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 lg:gap-y-16">
            {Object.entries(credits).map(([key, val]) => (
              <div key={key} className="space-y-3">
                <span className="label-s !text-[12px]">{key}</span>
                <p className="body-m !text-[16px] text-text-primary !leading-tight font-medium">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
