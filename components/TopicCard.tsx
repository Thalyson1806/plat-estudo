'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import type { Topic } from '@/lib/types';

const KEY = 'python-study-progress';

interface Props {
  topic: Topic;
}

export function TopicCard({ topic }: Props) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    function check() {
      try {
        const stored = JSON.parse(localStorage.getItem(KEY) || '[]') as string[];
        setDone(stored.includes(topic.slug));
      } catch {
        setDone(false);
      }
    }
    check();
    window.addEventListener('progress-updated', check);
    return () => window.removeEventListener('progress-updated', check);
  }, [topic.slug]);

  return (
    <Link href={`/topico/${topic.slug}`} className="block group">
      <div
        className="relative rounded-xl p-5 transition-all duration-200 cursor-pointer"
        style={{
          background: done ? 'rgba(75,139,190,0.08)' : 'var(--bg-card)',
          border: done
            ? '1px solid var(--accent-blue)'
            : '1px solid var(--border)',
          boxShadow: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = done
            ? '0 0 20px rgba(75,139,190,0.2)'
            : '0 0 20px rgba(255,212,59,0.15)';
          (e.currentTarget as HTMLDivElement).style.borderColor = done
            ? 'var(--accent-blue)'
            : 'var(--accent)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.borderColor = done
            ? 'var(--accent-blue)'
            : 'var(--border)';
        }}
      >
        {done && (
          <div className="absolute top-3 right-3" style={{ color: 'var(--accent-blue)' }}>
            <CheckCircle2 size={18} />
          </div>
        )}

        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none">{topic.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                style={{
                  background: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                #{String(topic.number).padStart(2, '0')}
              </span>
            </div>
            <h3
              className="font-semibold text-base leading-tight mb-1 truncate"
              style={{ color: 'var(--text)' }}
            >
              {topic.title}
            </h3>
            <p className="text-sm leading-snug" style={{ color: 'var(--text-muted)' }}>
              {topic.shortDescription}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
