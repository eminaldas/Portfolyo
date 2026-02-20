import  { useMemo } from "react";

export default function ContactSection() {
  const CONTACT = useMemo(
    () => ({
      email: "eminaldas575@gmail.com",
      location: "Türkiye, İstanbul",
      socials: {
        github: "https://github.com/eminaldas",
        linkedin: "https://www.linkedin.com/in/muhammedeminaldas/",
      },
    }),
    []
  );

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-4 py-16">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">İletişime Geçelim</h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          E‑posta veya sosyal hesaplar üzerinden ulaşabilirsin.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <div className="rounded-xl border border-black/10 bg-white/60 p-4 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-gray-800 dark:bg-white/10 dark:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold">E‑posta</div>
              <a href={`mailto:${CONTACT.email}`} className="text-sm text-gray-700 underline-offset-2 hover:underline dark:text-gray-200">
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="rounded-xl border border-black/10 bg-white/60 p-4 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-gray-800 dark:bg-white/10 dark:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold">Konum</div>
              <div className="text-sm text-gray-700 dark:text-gray-200">{CONTACT.location}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* GitHub */}
        <div className="rounded-xl border border-black/10 bg-white/60 p-4 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-gray-800 dark:bg-white/10 dark:text-white">
              {/* github icon */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.51 10.41.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.05.66-3.7-1.3-3.7-1.3-.5-1.27-1.23-1.6-1.23-1.6-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.13-2.95-.12-.28-.49-1.42.11-2.95 0 0 .93-.3 3.06 1.13a10.5 10.5 0 0 1 5.57 0c2.13-1.43 3.06-1.13 3.06-1.13.6 1.53.23 2.67.11 2.95.71.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.15-5.01 5.42.4.35.76 1.03.76 2.07 0 1.49-.01 2.69-.01 3.06 0 .29.2.64.76.53A10.52 10.52 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold">GitHub</div>
              <a href={CONTACT.socials.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 underline-offset-2 hover:underline dark:text-gray-200">
                @eminaldas
              </a>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="rounded-xl border border-black/10 bg-white/60 p-4 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-gray-800 dark:bg-white/10 dark:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.7v1.7h.05c.5-.9 1.8-1.85 3.7-1.85 4 0 4.7 2.65 4.7 6.1V21h-4v-5.4c0-1.3 0-3-1.85-3s-2.15 1.45-2.15 2.9V21h-4V9Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold">LinkedIn</div>
              <a href={CONTACT.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 underline-offset-2 hover:underline dark:text-gray-200">
                muhammedeminaldas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
