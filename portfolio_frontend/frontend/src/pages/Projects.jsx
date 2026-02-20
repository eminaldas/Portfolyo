import React, { useEffect, useMemo, useRef, useState } from "react";
import ProjectModal from "../assets/components/ProjectModal";

/**
 * GalleryCard (Instagram-like)
 * - Top: carousel (prev/next buttons + dots, supports swipe)
 * - Below: title + short description + tags
 * - "Read More" triggers the modal
 */
function GalleryCard({
  title,
  description,
  images = [],
  tags = [],
  onOpen,
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
  const next = (e) => {
    e?.stopPropagation();
    go(index + 1);
  };
  const prev = (e) => {
    e?.stopPropagation();
    go(index - 1);
  };

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
    if (Math.abs(dx) > 60) (dx < 0 ? next() : prev());
  };

  return (
    <article className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-xl dark:border-white/5 dark:bg-zinc-900/50 flex flex-col h-full">
      {/* Carousel */}
      <div className="relative bg-black group/carousel">
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
          <div className="opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center backdrop-blur-sm">‹</button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center backdrop-blur-sm">›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button key={i} onClick={() => go(i)} className={`h-1.5 w-1.5 rounded-full transition-all ${i === index ? "bg-white w-4" : "bg-white/50"}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{description}</p>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 my-3">
            {tags.slice(0, 3).map((t, i) => (
              <span key={i} className="text-[11px] tracking-wide px-3 py-1 rounded-full border border-gray/20 text-gray-500/90 dark:border-white/10 dark:text-gray-400">
                {t}
              </span>
            ))}
            {tags.length > 3 && (
               <span className="text-[11px] tracking-wide px-3 py-1 rounded-full border border-gray/20 text-gray-500/90 dark:border-white/10 dark:text-gray-400">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4">
            <button 
                onClick={onOpen}
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center gap-2 group transition-colors"
            >
                Read More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
      </div>
    </article>
  );
}

/**
 * ProjectsSection
 */
export default function ProjectsSection({ mode = "preview" }) {
    const [selectedProject, setSelectedProject] = useState(null);

  const data = [
    {
      title: "AuditFlow – Internal Audit & Findings",
      description: "Kurumsal denetim, bulgu yaşam döngüsü ve raporlama süreçleri için React + FastAPI tabanlı iç sistem.",
      longDescription:
        "Detail: A comprehensive corporate auditing system designed to manage the lifecycle of audit findings. It features automated reporting, real-time dashboards, and a complex workflow engine. Built to ensure corporate compliance and transparency.",
      challenges: "Managing complex state for multi-step audit workflows and ensuring real-time synchronization between multiple users editing findings simultaneously.",
      features: ["Automated Reporting", "Real-time Dashboards", "Workflow Engine", "Role-based Access Control"],
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
        "Detail: An intelligent interface for legal consultation. It uses a rule-based engine integrated with Tracky to manage request flows. Focused on high-fidelity UI/UX to make complex legal processes accessible to everyday users.",
      challenges: "Creating a seamless conversational UI that handles complex legal branching logic while maintaining a simple user experience.",
      features: ["Rule-based Engine", "Tracky Integration", "Conversational UI", "Session Management"],
      tags: ["React", "FastAPI", "Rule-based", "UI/UX", "Integration"],
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
    {
      title: "Beavask – Task & Workflow Management",
      description: "Üniversite bitirme projesi: görev ve süreç yönetimi, tamamen frontend mimarisi ve UI sorumluluğu.",
      longDescription:
        "Detail: My university graduation project focused on custom frontend architecture. It’s a full-scale task management system with a dedicated design system, emphasizing modularity and responsive performance.",
      challenges: "Designing a scalable component library from scratch and optimizing performance for drag-and-drop task boards with large datasets.",
      features: ["Custom Design System", "Drag & Drop Boards", "Responsive Layout", "Modular Architecture"],
      tags: ["React", "Design System", "Responsive", "Open Source", "Performance Optimization"],
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
        "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1920&auto=format&fit=crop",
      ],
      links: {},
    },
  ];

  const limit = 3; // preview'de en fazla 3 göster
  const [showAll, setShowAll] = useState(mode !== "preview");
  const list = showAll ? data : data.slice(0, limit);

  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-6xl w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <GalleryCard 
            key={p.title} 
            {...p} 
            onOpen={() => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Preview -> Show more button */}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-all hover:scale-105 shadow-lg"
        >
          Show All Projects
        </button>
      )}

      {/* Immersive Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
