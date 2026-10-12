import ScrambleText from './ScrambleText';
import { useInView } from './hooks';

export default function SectionHeading({ kicker, title, aside }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
      <div>
        <p className="font-mono text-[13px] text-acc">// {kicker}</p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <ScrambleText text={title} start={inView} duration={700} />
        </h2>
      </div>
      {aside && <p className="font-mono text-[13px] text-muted">{aside}</p>}
    </div>
  );
}
