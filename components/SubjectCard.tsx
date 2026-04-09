'use client';

import Link from 'next/link';

interface SubjectCardProps {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  topic_count: number;
}

export function SubjectCard({ slug, title, emoji, description, topic_count }: SubjectCardProps) {
  return (
    <Link href={`/materias/${slug}`} className="block">
      <div
        className="p-4 rounded-xl transition-all h-full"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)')}
        onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)')}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none">{emoji}</span>
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{title}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{description}</p>
            <p className="text-xs mt-2 font-mono" style={{ color: 'var(--accent)' }}>
              {topic_count} {topic_count === 1 ? 'tópico' : 'tópicos'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
