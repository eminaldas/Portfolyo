import React from "react";

/**
 * ExperienceTimeline – Dark-mode friendly + JIT-safe
 */
export default function Experiences() {
  const items = [
    {
      role: "IT Audit & Development Assistant",
      company: "Aras Kargo",
      location: "İstanbul, Türkiye",
      dates: "Mar 2025 – Sep 2025",
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
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Professional Journey
        </h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Tech alanındaki deneyimlerim; katkılarım ve sorumluluklarımla büyüme yolculuğum.
        </p>
      </header>

      {/* Timeline spine */}
      <div className="relative">
        {/* vertical line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -ml-px h-full w-px bg-gradient-to-b from-gray-300/40 via-gray-300/60 to-gray-300/40 dark:from-gray-600/40 dark:via-gray-600/60 dark:to-gray-600/40"
        />

        <ol className="grid gap-12 lg:grid-cols-2">
          {items.map((item, idx) => {
            const isRight = idx % 2 === 0; // first on right for rhythm
            return (
              <li
                key={idx}
                className={`relative ${
                  isRight ? "lg:col-start-2" : "lg:col-start-1"
                }`}
              >
                {/* Node (dot) */}
        

                {/* Connector to spine (lg+) */}
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-6 -ml-px hidden h-px w-6 bg-gray-300/60 dark:bg-gray-600/60 lg:block ${
                    isRight ? "lg:-translate-x-6" : "lg:translate-x-0"
                  }`}
                />

                {/* Content card */}
                <div
                  className={`relative rounded-xl border p-5 backdrop-blur-sm shadow-sm ${
                    isRight ? "lg:ml-10" : "lg:mr-10"
                  } border-gray-200/60 bg-white/80 text-gray-800 dark:border-white/10 dark:bg-zinc-900/60 dark:text-gray-100`}
                >
                  <div className="mb-1 text-xs font-medium tracking-wide text-gray-600 dark:text-gray-400">
                    {item.company} • {item.location}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {item.role}
                  </h3>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {item.dates}
                  </div>

                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-800 dark:text-gray-300">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                        />
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
