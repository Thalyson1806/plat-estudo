'use client';

import Link from 'next/link';
import type { Topic } from '@/lib/types';

interface Props {
  topic: Topic;
  basePath: string; // ex: /materias/redes-seguranca/topico
}

export function StaticModuleTopicCard({ topic, basePath }: Props) {
  return (
    <Link href={`${basePath}/${topic.slug}`} className="block group">
      <div
        className="relative rounded-xl p-5 transition-all duration-200 cursor-pointer"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(255,212,59,0.15)';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none">{topic.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                style={{ background: 'var(--border)', color: 'var(--text-muted)' }}
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
