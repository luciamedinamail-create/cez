interface ProjectIntroductionProps {
  label: string;
  text: string;
}

export default function ProjectIntroduction({ label, text }: ProjectIntroductionProps) {
  return (
    <section id="introduzione" className="max-w-[1400px] mx-auto page-padding py-[80px] lg:py-[96px] scroll-mt-48">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 border-t border-line-divider pt-16 lg:pt-24">
        <div className="lg:col-span-4">
          <h2 className="label-l !text-[13px]">{label}</h2>
        </div>
        <div className="lg:col-span-8">
          <div className="body-m space-y-8 max-w-[720px]">
            {text.split('\n').map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
