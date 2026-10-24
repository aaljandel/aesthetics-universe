import { useRef, useState } from "react";
import { comparisonImage } from "@/data/catalogue";

export function BeforeAfter({ priority = false }: { priority?: boolean }) {
  const [value, setValue] = useState(54);
  const frame = useRef<HTMLDivElement>(null);

  function setFromClient(clientX: number) {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setValue(Math.min(96, Math.max(4, next)));
  }

  return (
    <figure>
      <div
        ref={frame}
        className="relative aspect-cinema overflow-hidden bg-midnight"
        onPointerDown={(event) => {
          (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
          setFromClient(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.buttons !== 1) return;
          setFromClient(event.clientX);
        }}
      >
        <img
          src={comparisonImage.src}
          alt=""
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover saturate-50 brightness-90"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <img
            src={comparisonImage.src}
            alt=""
            width={1600}
            height={1000}
            className="h-full w-full object-cover saturate-125"
          />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${value}%` }}>
          <div className="h-full w-px -translate-x-1/2 bg-pearl" />
          <div className="absolute top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pearl bg-midnight/50" />
        </div>
        <span className="absolute left-3 top-3 bg-midnight/70 px-2 py-1 text-xs tracking-widest text-pearl uppercase">
          Grade A
        </span>
        <span className="absolute right-3 top-3 bg-midnight/70 px-2 py-1 text-xs tracking-widest text-pearl uppercase">
          Grade B
        </span>
      </div>
      <label className="mt-4 block text-sm text-muted">
        <span className="sr-only">Drag to compare two colour grades of the same photograph.</span>
        <input
          type="range"
          min={4}
          max={96}
          value={Math.round(value)}
          onChange={(event) => setValue(Number(event.target.value))}
          className="mt-2 w-full accent-gold-deep"
          aria-valuetext={`${Math.round(value)} percent`}
        />
      </label>
      <figcaption className="mt-3 max-w-2xl text-sm text-muted">
        Illustrative simulation. Both sides are the same photograph with a different colour grade. This is not a
        patient, not a before-and-after, and not a treatment result.
      </figcaption>
    </figure>
  );
}
