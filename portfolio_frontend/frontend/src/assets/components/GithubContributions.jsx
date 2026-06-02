import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const LEVELS = [
  'rgba(220,216,192,0.07)',
  'rgba(220,216,192,0.24)',
  'rgba(220,216,192,0.48)',
  'rgba(220,216,192,0.73)',
  'rgba(220,216,192,0.97)',
];

const calcStreak = (days) => {
  const sorted = [...days].sort((a, b) => b.date.localeCompare(a.date));
  const today  = new Date().toISOString().split('T')[0];
  let streak   = 0;
  let started  = false;
  for (const d of sorted) {
    if (d.date > today) continue;
    if (!started && d.date === today && d.count === 0) continue; // today no commits yet, check yesterday
    if (d.count > 0) { streak++; started = true; }
    else if (started) break;
    else break;
  }
  return streak;
};

const GithubContributions = ({ username }) => {
  const [weeks,  setWeeks]  = useState([]);
  const [total,  setTotal]  = useState(null);
  const [streak, setStreak] = useState(null);
  const [error,  setError]  = useState(false);
  const [cell,  setCell]  = useState(10);
  const containerRef = useRef(null);

  // Hücre boyutunu konteynere göre hesapla
  useEffect(() => {
    if (!containerRef.current) return;
    const calc = () => {
      const w = containerRef.current.offsetWidth - 8; // küçük margin
      // 53 hafta + 52 boşluk (2px) = 53c + 104
      const c = Math.floor((w - 104) / 53);
      setCell(Math.max(4, Math.min(16, c)));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        const days = data.contributions;
        const cols = [];
        for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));
        setWeeks(cols);
        setStreak(calcStreak(days));
        const yr = new Date().getFullYear();
        setTotal(data.total[yr] ?? data.total[yr - 1] ?? '—');
      })
      .catch(() => setError(true));
  }, [username]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Başlık */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="font-mono text-[10px] tracking-[.2em] uppercase text-on-surface-variant/40">Son 1 Yıl</span>
        <div className="flex items-center gap-4">
          {streak !== null && streak > 0 && (
            <span className="flex items-center gap-2">
              <span
                style={{ fontFamily: "'Cormorant', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 22, color: '#dcd8c0', lineHeight: 1 }}
              >
                {streak}
              </span>
              <span className="font-mono text-[9px] tracking-[.18em] uppercase text-on-surface-variant/40">günlük seri</span>
            </span>
          )}
          {total !== null && (
            <span className="font-mono text-[10px] text-on-surface/50">
              <span className="font-bold text-on-surface">{total}</span> katkı
            </span>
          )}
        </div>
      </div>

      {error ? (
        <p className="font-mono text-[10px] text-on-surface-variant/30 tracking-widest uppercase">grafik yüklenemedi</p>
      ) : !weeks.length ? (
        /* Skeleton */
        <div className="flex gap-[2px]">
          {Array.from({ length: 53 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((__, j) => (
                <div key={j} style={{ width: cell, height: cell, background: LEVELS[0] }} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* Gerçek grafik */
        <div className="flex gap-[2px]">
          {weeks.map((week, wi) => (
            <motion.div
              key={wi}
              className="flex flex-col gap-[2px]"
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: wi * 0.01, duration: 0.3, ease: 'easeOut' }}
              style={{ transformOrigin: 'bottom' }}
            >
              {week.map(day => (
                <div
                  key={day.date}
                  title={`${day.date}  ·  ${day.count} katkı`}
                  style={{
                    width: cell,
                    height: cell,
                    background: LEVELS[day.level ?? 0],
                    transition: 'background 0.15s',
                    flexShrink: 0,
                  }}
                  className="hover:brightness-125"
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}

      {/* Lejant */}
      <div className="flex items-center gap-[3px] mt-3 justify-end">
        <span className="font-mono text-[8px] text-on-surface-variant/25 mr-1 uppercase tracking-widest">Az</span>
        {LEVELS.map((bg, i) => (
          <div key={i} style={{ width: cell > 8 ? 8 : cell, height: cell > 8 ? 8 : cell, background: bg }} />
        ))}
        <span className="font-mono text-[8px] text-on-surface-variant/25 ml-1 uppercase tracking-widest">Çok</span>
      </div>
    </div>
  );
};

export default GithubContributions;
