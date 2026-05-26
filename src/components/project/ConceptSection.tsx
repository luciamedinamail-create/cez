interface ConceptSectionProps {
  label: string;
  narrativeHeading?: string;
  text: string;
  quote?: string;
}

export default function ConceptSection({ label, narrativeHeading, text, quote }: ConceptSectionProps) {
  return (
    <section id="concetto" className="max-w-[1400px] mx-auto page-padding py-[80px] lg:py-[96px] scroll-mt-48">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 border-t border-line-divider pt-16 lg:pt-24">
        <div className="lg:col-span-4">
          <h2 className="label-l !text-[13px]">{label}</h2>
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-12 max-w-[720px]">
            {narrativeHeading && (
              <h3 className="h2 !text-[28px] md:!text-[32px] !leading-[1.2]">
                {narrativeHeading}
              </h3>
            )}
            <div className="body-m space-y-8">
              {text.split('\n').map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </div>
            {quote && (
              <blockquote className="!text-[24px] md:!text-[28px] !leading-[1.4] text-text-primary border-l-4 border-line-divider pl-8 py-2 italic font-medium">
                {quote}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
