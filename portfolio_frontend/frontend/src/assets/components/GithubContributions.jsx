import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 5 ton: 0=boş (arka plandan hafif farklı), 1-4=soluktan açığa krem
const LEVELS = [
  'rgba(220,216,192,0.06)',   // 0 — boş gün, grid hissi
  'rgba(220,216,192,0.22)',   // 1 — az katkı
  'rgba(220,216,192,0.45)',   // 2 — orta
  'rgba(220,216,192,0.72)',   // 3 — yoğun
  'rgba(220,216,192,0.96)',   // 4 — maksimum
];

const DAYS_TR = ['Pzt', '', 'Çar', '', 'Cum', '', 'Paz'];

const GithubContributions = ({ username }) => {
  const [weeks, setWeeks]   = useState([]);
  const [total, setTotal]   = useState(null);
  const [error, setError]   = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        // days → week columns (her sütun 7 gün)
        const days = data.contributions;
        const cols = [];
        for (let i = 0; i < days.length; i += 7) {
          cols.push(days.slice(i, i + 7));
        }
        setWeeks(cols);
        const yr = new Date().getFullYear();
        setTotal(data.total[yr] ?? data.total[yr - 1] ?? '—');
      })
      .catch(() => setError(true));
  }, [username]);

  if (error) return (
    <p className="font-mono text-[10px] text-on-surface-variant/30 tracking-widest uppercase">
      grafik yüklenemedi
    </p>
  );

  if (!weeks.length) return (
    <div className="flex gap-[3px] animate-pulse">
      {Array.from({ length: 53 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }).map((__, j) => (
            <div key={j} style={{ width: 9, height: 9, background: 'rgba(220,216,192,0.06)' }} />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      {/* Başlık satırı */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40">
          Son 1 yıl
        </span>
        {total !== null && (
          <span className="font-mono text-[10px] text-on-surface/50">
            <span className="text-on-surface font-bold">{total}</span> katkı
          </span>
        )}
      </div>

      {/* Grid — yatay scroll, hücre boyutu responsive */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px] min-w-max">
          {/* Gün etiketleri */}
          <div className="flex flex-col gap-[3px] mr-1">
            {DAYS_TR.map((d, i) => (
              <div
                key={i}
                className="font-mono text-on-surface-variant/25"
                style={{ width: 9, height: 9, fontSize: 7, lineHeight: '9px', textAlign: 'right' }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Haftalar */}
          {weeks.map((week, wi) => (
            <motion.div
              key={wi}
              className="flex flex-col gap-[3px]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: wi * 0.012, duration: 0.25, ease: 'easeOut' }}
            >
              {week.map(day => (
                <div
                  key={day.date}
                  title={`${day.date}  ·  ${day.count} katkı`}
                  style={{
                    width: 9,
                    height: 9,
                    background: LEVELS[day.level ?? 0],
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                  className="hover:opacity-80"
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lejant */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="font-mono text-[8px] text-on-surface-variant/30 uppercase tracking-widest">Az</span>
        {LEVELS.map((bg, i) => (
          <div key={i} style={{ width: 8, height: 8, background: bg }} />
        ))}
        <span className="font-mono text-[8px] text-on-surface-variant/30 uppercase tracking-widest">Çok</span>
      </div>
    </div>
  );
};

export default GithubContributions;
