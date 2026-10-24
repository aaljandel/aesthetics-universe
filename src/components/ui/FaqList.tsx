import { useState } from "react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-line">
            <h3 className="m-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span className="font-serif text-2xl leading-tight md:text-3xl">{item.q}</span>
                <span aria-hidden="true" className="font-serif text-2xl text-gold-deep">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div className="acc-panel" data-open={expanded ? "true" : "false"}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
