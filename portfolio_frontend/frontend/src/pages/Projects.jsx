import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * GalleryCard (Instagram-like)
 * - Top: carousel (prev/next buttons + dots, supports swipe)
 * - Below: title + short description + tags
 * - Optional long text collapses inside the card on hover/focus
 */
function GalleryCard({
  title,
  description,
  longDescription,
  images = [],
  tags = [],
  links = {},
}) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(null); // {x}
  const [reduced, setReduced] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const go = (i) => setIndex((prev) => (i + images.length) % images.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // Basic swipe support
  const onPointerDown = (e) => setDrag({ x: e.clientX || e.touches?.[0]?.clientX });
  const onPointerMove = (e) => {
    if (!drag) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    const dx = x - drag.x;
    // apply small transform for feedback
    if (trackRef.current) trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`;
  };
  const onPointerUp = (e) => {
    if (!drag) return;
    const x = e.clientX || e.changedTouches?.[0]?.clientX;
    const dx = x - drag.x;
    setDrag(null);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-index * 100}%)`;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  };

  const hasLinks = useMemo(() => !!(links.github || links.live || links.docs), [links]);

  return (
    <article className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-xl">
      {/* Carousel */}
      <div className="relative bg-black">
        <div
          className={`w-full aspect-[16/10] overflow-hidden select-none`}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${title} gallery`}
        >
          <div
            ref={trackRef}
            className={`h-full flex transition-transform ${reduced ? "duration-0" : "duration-500"}`}
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="min-w-full h-full">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        {/* Controls */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-2">‹</button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-2">›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button key={i} onClick={() => go(i)} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-2">{description}</p>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 my-3">
            {tags.map((t, i) => (
              <span key={i} className="text-[11px] tracking-wide px-3 py-1 rounded-full border border-gray/20 text-gray-500/90">
                {t}
              </span>
            ))}
          </div>
        )}

        {longDescription && (
          <details className="mt-1 group">
            <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-200">Read more</summary>
            <p className="text-sm text-gray-400 leading-relaxed mt-2">
              {longDescription}
            </p>
          </details>
        )}

        {hasLinks && (
          <div className="flex flex-wrap gap-2 pt-3">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/20">GitHub</a>
            )}
            {links.live && (
              <a href={links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-600 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-purple-500">Live</a>
            )}
            {links.docs && (
              <a href={links.docs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/20">Docs</a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * ProjectsSection
 * - preview: shows up to `limit` items and a centered "Show more" button
 * - full: shows all items; grid 2x2 on md+
 */
export default function ProjectsSection({ mode = "preview" }) {
  const data = [
    {
      title: "AuditFlow – Internal Audit & Findings",
      description: "Kurumsal denetim, bulgu yaşam döngüsü ve raporlama süreçleri için React + FastAPI tabanlı iç sistem.",
      longDescription:
        "Denetim bulgularının uçtan uca yönetimi, departman bazlı iş akışları, özelleştirilebilir rapor ve kullanıcı panelleri. Rol/iş akışı yönetimi ve toplantı planlama özellikleri içerir.",
      tags: ["React", "FastAPI", "PostgreSQL", "Workflow", "Dashboard"],
      images: [
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
    {
      title: "LawChatBot – Legal Assistant",
      description: "Kural tabanlı hukuk danışmanı arayüzü; Tracky ile entegre istek oluşturma akışları.",
      longDescription:
        "React tabanlı yeniden kullanılabilir bileşen mimarisiyle, önceden tanımlı soru–cevap akışları. FastAPI ile oturum yönetimi ve veri alışverişi.",
      tags: ["React", "FastAPI", "Rule-based", "UI/UX", "Integration"],
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
    {
      title: "Beavask – Task & Workflow Management",
      description: "Üniversite bitirme projesi: görev ve süreç yönetimi, tamamen frontend mimarisi ve UI sorumluluğu.",
      longDescription:
        "Bileşen mimarisi, responsive layout ve temiz tasarım odaklı. Kullanılabilirlik ve netlik önceliklidir; open-source olarak yayımlandı.",
      tags: ["React", "Design System", "Responsive", "Open Source"],
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop",
      ],
      links: { github: "https://github.com/ErdemKoray/Beavask" },
    },
    {
      title: "Portfolio – Components & UI Library",
      description: "Kişisel portfolyo, tasarım sistemi ve yeniden kullanılabilir bileşen kütüphanesi.",
      longDescription: "Grid, form, modal, grafik kartları ve temalandırma gibi bileşenlerin toplandığı açık kaynak depo.",
      tags: ["React", "Tailwind", "Design System"],
      images: [
        "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    }, {
      title: "AuditFlow – Internal Audit & Findings",
      description: "Kurumsal denetim, bulgu yaşam döngüsü ve raporlama süreçleri için React + FastAPI tabanlı iç sistem.",
      longDescription:
        "Denetim bulgularının uçtan uca yönetimi, departman bazlı iş akışları, özelleştirilebilir rapor ve kullanıcı panelleri. Rol/iş akışı yönetimi ve toplantı planlama özellikleri içerir.",
      tags: ["React", "FastAPI", "PostgreSQL", "Workflow", "Dashboard"],
      images: [
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
    {
      title: "LawChatBot – Legal Assistant",
      description: "Kural tabanlı hukuk danışmanı arayüzü; Tracky ile entegre istek oluşturma akışları.",
      longDescription:
        "React tabanlı yeniden kullanılabilir bileşen mimarisiyle, önceden tanımlı soru–cevap akışları. FastAPI ile oturum yönetimi ve veri alışverişi.",
      tags: ["React", "FastAPI", "Rule-based", "UI/UX", "Integration"],
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
    {
      title: "Beavask – Task & Workflow Management",
      description: "Üniversite bitirme projesi: görev ve süreç yönetimi, tamamen frontend mimarisi ve UI sorumluluğu.",
      longDescription:
        "Bileşen mimarisi, responsive layout ve temiz tasarım odaklı. Kullanılabilirlik ve netlik önceliklidir; open-source olarak yayımlandı.",
      tags: ["React", "Design System", "Responsive", "Open Source"],
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop",
      ],
      links: { github: "https://github.com/ErdemKoray/Beavask" },
    },
    {
      title: "Portfolio – Components & UI Library",
      description: "Kişisel portfolyo, tasarım sistemi ve yeniden kullanılabilir bileşen kütüphanesi.",
      longDescription: "Grid, form, modal, grafik kartları ve temalandırma gibi bileşenlerin toplandığı açık kaynak depo.",
      tags: ["React", "Tailwind", "Design System"],
      images: [
        "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
  ];

  const limit = 1; // preview'de en fazla 3 göster
  const [showAll, setShowAll] = useState(mode !== "preview");
  const list = showAll ? data : data.slice(0, limit);

  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="mx-auto max-w-6xl w-full p-4 grid gap-8 grid-cols-1 md:grid-cols-2">
        {list.map((p) => (
          <GalleryCard key={p.title} {...p} />
        ))}
      </div>

      {/* Preview -> Show more button */}
        <button
          onClick={() => setShowAll(true)}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 bg-border-slate-800 hover:bg-border-slate-800 text-sm"
        >
          Show more
        </button>
      
    </section>
  );
}
