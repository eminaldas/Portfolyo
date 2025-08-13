import React, { useMemo, useState } from "react";

/**
 * ContactSection – Clean 2-column contact block (Tailwind + React)
 * - Left: email/location + social icons
 * - Right: message form (name/email/subject/message)
 * - Light, rounded, not a heavy card; matches portfolio aesthetic
 * - Accessible labels, aria-live for status; dark-mode friendly
 */

export default function ContactSection() {
  // ---- CONFIG (fill with your real info) ----
  const CONTACT = useMemo(
    () => ({
      email: "eminaldas575@gmail.com", // TODO: replace
      location: "Türkiye",
      socials: {
        github: "#", // TODO: your GitHub
        linkedin: "#", // TODO: your LinkedIn
      },
    }),
    []
  );

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setSending(true);

    // OPTION A: if you have an API endpoint, send fetch here.
    // const res = await fetch(import.meta.env.VITE_CONTACT_ENDPOINT, { ... })
    // For now we fallback to mailto so it works without backend.
    try {
      const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        form.subject || "Portfolyo İletişim"
      )}&body=${encodeURIComponent(
        `İsim: ${form.name}\nE-posta: ${form.email}\n\nMesaj:\n${form.message}`
      )}`;
      window.location.href = mailto;
      setStatus("E-posta istemciniz açıldı. Mesajınızı gönderebilirsiniz.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">İletişime Geçelim</h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Bir projen mi var ya da fırsatları konuşmak mı istiyorsun? Mesaj bırak, en kısa sürede dönerim.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: contact info */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-black/10 bg-white/60 p-4 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-gray-800 dark:bg-white/10 dark:text-white">
                {/* mail icon */}
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

          <div className="rounded-xl border border-black/10 bg-white/60 p-4 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-gray-800 dark:bg-white/10 dark:text-white">
                {/* location icon */}
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

          <div className="flex items-center gap-3 pt-2">
            <a
              href={CONTACT.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/60 shadow-sm transition hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/[0.04]"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.51 10.41.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.05.66-3.7-1.3-3.7-1.3-.5-1.27-1.23-1.6-1.23-1.6-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.13-2.95-.12-.28-.49-1.42.11-2.95 0 0 .93-.3 3.06 1.13a10.5 10.5 0 0 1 5.57 0c2.13-1.43 3.06-1.13 3.06-1.13.6 1.53.23 2.67.11 2.95.71.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.15-5.01 5.42.4.35.76 1.03.76 2.07 0 1.49-.01 2.69-.01 3.06 0 .29.2.64.76.53A10.52 10.52 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z" />
              </svg>
            </a>
            <a
              href={CONTACT.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/60 shadow-sm transition hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/[0.04]"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.7v1.7h.05c.5-.9 1.8-1.85 3.7-1.85 4 0 4.7 2.65 4.7 6.1V21h-4v-5.4c0-1.3 0-3-1.85-3s-2.15 1.45-2.15 2.9V21h-4V9Z" />
              </svg>
            </a>
          </div>
        </aside>

        {/* Right: form */}
        <div className="rounded-xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="text-lg font-semibold">Mesaj Gönder</h3>
          <p className="mb-4 mt-1 text-xs text-gray-600 dark:text-gray-400">En kısa sürede dönüş yapacağım.</p>

          <form onSubmit={onSubmit} className="space-y-3">
            {/* Honeypot */}
            <input type="text" name="company" className="hidden" tabIndex="-1" autoComplete="off" />

            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium">Adınız</span>
                <input
                  className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-black/20 focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/10"
                  type="text"
                  name="name"
                  placeholder="Adınız"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium">E‑posta</span>
                <input
                  className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-black/20 focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/10"
                  type="email"
                  name="email"
                  placeholder="ornek@posta.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-medium">Konu</span>
              <input
                className="w-full rounded-md border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-black/20 focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/10"
                type="text"
                name="subject"
                placeholder="Konu"
                value={form.subject}
                onChange={onChange}
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium">Mesajınız</span>
              <textarea
                className="min-h-[150px] w-full resize-y rounded-md border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-black/20 focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white/10"
                name="message"
                placeholder="Mesajınız..."
                value={form.message}
                onChange={onChange}
                required
              />
            </label>

            <div className="pt-1">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white ring-1 ring-black/10 transition hover:bg-black/90 active:translate-y-px disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {sending ? "Gönderiliyor…" : "Mesajı Gönder"}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M2 21 23 12 2 3l3 8-3 10Zm5.5-6.5 10-2.5-10-2.5 2 2.5-2 2.5Z" />
                </svg>
              </button>
            </div>

            <p className="min-h-5 pt-1 text-center text-xs text-gray-600 dark:text-gray-400" aria-live="polite">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
