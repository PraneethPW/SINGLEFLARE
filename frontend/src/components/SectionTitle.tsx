interface SectionTitleProps {
  kicker: string;
  title: string;
  description: string;
}

export function SectionTitle({ kicker, title, description }: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyber">{kicker}</p>
      <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}
