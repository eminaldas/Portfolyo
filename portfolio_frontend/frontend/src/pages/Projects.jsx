import React, { useEffect, useRef, useState, useMemo } from "react";

/** Single project card */
function ProjectCard({
  title,
  description,
  longDescription,
  tags = [],
  cover,
  links = {},
}) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false); // hover / focus state for A11y
  const [reduced, setReduced] = useState(false);

  // Reduced motion respect
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Visibility on scroll (IO)
  useEffect(() => {
    if (!cardRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    io.observe(cardRef.current);
    return () => io.disconnect();
  }, []);

  const hasAnyLink = useMemo(
    () => !!(links.github || links.live || links.docs),
    [links]
  );

  return (
    <article 
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-lg transition-all ${
        reduced ? "duration-0" : "duration-500"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      tabIndex={0}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        // Collapse when focus leaves the card
        if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-labelledby={`${title}-h`}
      aria-expanded={expanded}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={cover}
          alt={title}
          className={`w-full h-full object-cover transition-transform ${
            reduced ? "duration-0" : "duration-700"
          } ${visible ? "scale-[1.02]" : "scale-100"} hover:scale-105`}
        />
        {/* Subtle bottom gradient for text readability */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent ${
            reduced ? "duration-0" : "duration-300"
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 id={`${title}-h`} className="text-lg font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.28)]" />
          {title}
        </h3>
        <p className="text-sm text-gray-400 mt-2">{description}</p>

        {/* Tags (fade in slightly on expand) */}
        {tags?.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 my-3 transition-all ${
              reduced ? "duration-0" : "duration-300"
            } ${expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
          >
            {tags.map((t, i) => (
              <span
                key={i}
                className="text-[11px] tracking-wide px-3 py-1 rounded-full border border-gray/20 text-gray-500/90"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Detail panel (hover/focus expands) */}
        <div
          className={`detay-panel mt-2 overflow-hidden transition-[max-height,opacity] ${
            reduced ? "duration-0" : "duration-500"
          } max-h-0 opacity-0 md:max-h-48 md:opacity-100 ${
            expanded ? "max-h-48 opacity-100" : ""
          }`}
          aria-hidden={!expanded}
          {...(!expanded ? { inert: "" } : {})}
        >
          {longDescription && (
            <p className="text-sm text-gray-400 leading-relaxed">{longDescription}</p>
          )}

          {hasAnyLink && (
            <div className="flex flex-wrap gap-2 pt-3">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/20"
                >
                  GitHub
                </a>
              )}
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-purple-500"
                >
                  Live
                </a>
              )}
              {links.docs && (
                <a
                  href={links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/20"
                >
                  Docs
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/** Grid with 3 projects (data pulled from your CV/projects) */
export default function Projects() {
  const projects = [
    {
      title: "AuditFlow – Internal Audit & Findings",
      description:
        "Kurumsal denetim, bulgu yaşam döngüsü ve raporlama süreçleri için React + FastAPI tabanlı iç sistem.",
      longDescription:
        "Denetim bulgularının uçtan uca yönetimi, departman bazlı iş akışları, özelleştirilebilir rapor ve kullanıcı panelleri. Rol/iş akışı yönetimi ve toplantı planlama özellikleri içerir.",
      tags: ["React", "FastAPI", "PostgreSQL", "Workflow", "Dashboard"],
      cover:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1920&auto=format&fit=crop",
      links: {},
    },
    {
      title: "LawChatBot – Legal Assistant",
      description:
        "Kural tabanlı hukuk danışmanı arayüzü; Tracky ile entegre istek oluşturma akışları.",
      longDescription:
        "React tabanlı yeniden kullanılabilir bileşen mimarisiyle, önceden tanımlı soru–cevap akışları. FastAPI ile oturum yönetimi ve veri alışverişi.",
      tags: ["React", "FastAPI", "Rule-based", "UI/UX", "Integration"],
      cover:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
      links: {},
    },
    {
      title: "Beavask – Task & Workflow Management",
      description:
        "Üniversite bitirme projesi: görev ve süreç yönetimi, tamamen frontend mimarisi ve UI sorumluluğu.",
      longDescription:
        "Bileşen mimarisi, responsive layout ve temiz tasarım odaklı. Kullanılabilirlik ve netlik önceliklidir; open-source olarak yayımlandı.",
      tags: ["React", "Design System", "Responsive", "Open Source"],
      cover:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
      links: {
        github: "https://github.com/ErdemKoray/Beavask",
      },
    },
  ];

  return (
    <div    id="projects"  className="w-full h-screen flex items-center justify-center">

    <div className="mx-auto max-w-6xl p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.title} {...p} />)
      )}
    </div>
    </div>
  );
}
