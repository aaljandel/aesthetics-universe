import { useEffect, useId, useRef, useState } from "react";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { galleryItems, type GalleryCategory } from "@/data/catalogue";

const filters: GalleryCategory[] = ["All", "Studio", "Complexion", "Portrait", "Ritual"];

export function GalleryView() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [open, setOpen] = useState<number | null>(null);
  const visible = galleryItems.filter((item) => filter === "All" || item.category === filter);

  return (
    <>
      <section className="bg-midnight pt-32 pb-16 text-pearl">
        <div className="wrap">
          <p className="eyebrow text-gold">Gallery</p>
          <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">An editorial room, not a results wall.</h1>
          <p className="mt-5 max-w-xl text-blush">
            Every photograph is stock atmosphere for this demonstration. None of it is a patient of Aesthetics
            Universe, because Aesthetics Universe has no patients.
          </p>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="wrap">
          <div className="flex gap-2 overflow-x-auto pb-2" role="toolbar" aria-label="Filter gallery">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={`min-h-11 shrink-0 border px-4 text-sm ${filter === item ? "border-midnight bg-midnight text-pearl" : "border-line"}`}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div key={filter} className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {visible.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="card-in group mb-4 block w-full break-inside-avoid overflow-hidden bg-plum text-left"
                onClick={() => setOpen(index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className={`zoom-img w-full object-cover ${item.tall ? "aspect-portrait" : "aspect-cinema"}`}
                />
                <span className="block px-3 py-3 text-xs tracking-widest text-pearl uppercase">{item.category}</span>
              </button>
            ))}
          </div>
          <div className="mt-16">
            <h2 className="display text-4xl md:text-5xl">A comparison, honestly labelled</h2>
            <div className="mt-6 max-w-4xl">
              <BeforeAfter />
            </div>
          </div>
        </div>
      </section>
      {open !== null && (
        <Lightbox
          items={visible}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: typeof galleryItems;
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const startX = useRef(0);
  const item = items[index];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!el.open) el.showModal();
    const handle = () => onClose();
    el.addEventListener("close", handle);
    return () => el.removeEventListener("close", handle);
  }, [onClose]);

  if (!item) return null;

  function prev() {
    onIndex((index + items.length - 1) % items.length);
  }
  function next() {
    onIndex((index + 1) % items.length);
  }

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-labelledby={titleId}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      }}
      onPointerDown={(event) => {
        startX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const delta = event.clientX - startX.current;
        if (delta > 50) prev();
        if (delta < -50) next();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <p id={titleId} className="eyebrow text-gold">
            {item.category} · {index + 1} / {items.length}
          </p>
          <button type="button" className="btn btn-line px-4" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="grid min-h-0 flex-1 place-items-center px-4">
          <img src={item.src} alt={item.alt} className="max-h-[70vh] w-auto max-w-full object-contain" />
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-5">
          <button type="button" className="btn btn-line" onClick={prev}>
            Previous
          </button>
          <p className="hidden max-w-xl text-center text-sm text-blush sm:block">{item.alt}</p>
          <button type="button" className="btn btn-gold" onClick={next}>
            Next
          </button>
        </div>
      </div>
    </dialog>
  );
}
