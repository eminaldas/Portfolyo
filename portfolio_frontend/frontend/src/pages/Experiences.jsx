import React from "react";

/**
 * ExperienceTimeline – Vertical timeline (alternating) built from CV
 * - Minimal, elegant, slightly rounded callouts (not heavy cards)
 * - Alternating left/right on lg+, stacked on mobile
 * - Accessible: semantic headings, lists, aria-hidden on decorative bits
 * - Dark mode friendly (Tailwind utility classes)
 */

export default function Experiences() {
  const items = [
    {
      role: "IT Audit & Development Assistant",
      company: "Aras Kargo",
      location: "İstanbul, Türkiye",
      dates: "Mar 2025 – Current",
      bullets: [
        "IT denetim ekibine süreç koordinasyonu ve operasyonel denetimlerde destek verdim.",
        "İç sistemlerde denetim bulgusu, süreç ve raporlama akışlarını iyileştiren çözümler geliştirdim.",
        "Ekiplerle birlikte denetim veri toplama ve doğrulama adımlarını standartlaştırdım.",
        "Kullanıcı geri bildirimlerine göre arayüzlerde kullanılabilirlik düzenlemeleri yaptım.",
      ],
    },
    {
      role: "IT Support Assistant",
      company: "Aras Kargo",
      location: "İstanbul, Türkiye",
      dates: "Feb 2024 – Jun 2024",
      bullets: [
        "Envanter sisteminin geliştirilmesine katkı sağladım; süreç verimliliğini artırdım.",
        "Dokümantasyon akışları için dijital platform kurulumu ve içerik yönetimi desteği verdim.",
        "Ekip içi iletişim ve iş akışlarında profesyonel çalışma disiplinini benimsedim.",
      ],
    },
    {
      role: "Fullstack Junior Developer Intern",
      company: "Aras Kargo",
      location: "İstanbul, Türkiye",
      dates: "Jul 2024",
      bullets: [
        "Flask tabanlı, server-side rendered bir web uygulamasının geliştirilmesine katıldım.",
        "MongoDB şema tasarımı, veri doğrulama ve form işleme akışlarını uyguladım.",
        "Jinja2 ile şablonlama, yönlendirme ve sayfa düzeni optimizasyonları yaptım.",
      ],
    },
  ];

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Professional Journey</h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Tech alanındaki deneyimlerim; katkılarım ve sorumluluklarımla büyüme yolculuğum.
        </p>
      </header>

      {/* Timeline spine */}
      <div className="relative">
        {/* vertical line */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -ml-px h-full w-px bg-gradient-to-b from-white/10 via-white/20 to-white/10 dark:from-white/10 dark:via-white/20 dark:to-white/10"
        />

        <ol className="grid gap-12 lg:grid-cols-2">
          {items.map((item, idx) => {
            const isRight = idx % 2 === 0; // first on right for visual rhythm
            return (
              <li key={idx} className={`relative lg:col-start-${isRight ? 2 : 1}`}>
                {/* Node (dot) */}
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-3 z-10 -ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-700 shadow ring-8 ring-white/5 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-white/5`}
                >
                  {/* briefcase icon (inline svg) */}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3Zm2 0h2V6a1 1 0 1 0-2 0v1Z" />
                  </svg>
                </span>

                {/* Connector to spine */}
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-6 -ml-px h-px w-6 bg-white/20 ${
                    isRight ? "lg:-translate-x-6" : "lg:translate-x-0"
                  } hidden lg:block`}
                />

                {/* Content */}
                <div
                  className={`relative rounded-xl border border-white/10 bg-white/60 p-5 backdrop-blur-sm shadow-sm dark:bg-white/[0.04] ${
                    isRight ? "lg:ml-10" : "lg:mr-10"
                  }`}
                >
                  <div className="mb-1 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                    {item.company} • {item.location}
                  </div>
                  <h3 className="text-base font-semibold">{item.role}</h3>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.dates}</div>

                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
