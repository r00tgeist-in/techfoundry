import { Asterisk } from "lucide-react";

interface Props {
  items: string[];
  duration?: number;
  className?: string;
  separatorClassName?: string;
}

/** Seamless dual-track marquee. */
export default function Marquee({ items, duration = 40, className = "", separatorClassName = "text-ember" }: Props) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-baseline gap-[0.5em]">
          <span>{item}</span>
          <Asterisk className={`h-[0.42em] w-[0.42em] shrink-0 translate-y-[0.04em] ${separatorClassName}`} strokeWidth={1.5} />
        </span>
      ))}
    </>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="animate-marquee-x flex w-max items-baseline gap-[0.5em]"
        style={{ ["--marquee-duration" as never]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-baseline gap-[0.5em]">{row}</div>
        <div className="flex shrink-0 items-baseline gap-[0.5em]" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}
