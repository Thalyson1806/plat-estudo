'use client';

import { useEffect, useState } from 'react';

const TOTAL = 12;
const KEY = 'python-study-progress';

export function ProgressBar() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    function update() {
      try {
        const stored = JSON.parse(localStorage.getItem(KEY) || '[]') as string[];
        setDone(stored.length);
      } catch {
        setDone(0);
      }
    }
    update();
    window.addEventListener('storage', update);
    window.addEventListener('progress-updated', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('progress-updated', update);
    };
  }, []);

  const pct = Math.round((done / TOTAL) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
        <span>Progresso geral</span>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {done}/{TOTAL} tópicos
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '8px', background: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--accent-blue), var(--accent))',
          }}
        />
      </div>
      {done === TOTAL && (
        <p className="text-center mt-3 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
          🎉 Parabéns! Você concluiu todos os tópicos!
        </p>
      )}
    </div>
  );
}
