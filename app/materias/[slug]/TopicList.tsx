'use client';

import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';

interface TopicRow {
  id: string;
  title: string;
  order_index: number;
  created_at: Date;
  creator_nome: string | null;
  creator_sobrenome: string | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function TopicList({
  topics,
  slug,
  isLoggedIn,
}: {
  topics: TopicRow[];
  slug: string;
  isLoggedIn: boolean;
}) {
  if (topics.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)', color: 'var(--text-muted)' }}
      >
        <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
        <p className="text-sm mb-2">Nenhum tópico ainda.</p>
        {isLoggedIn ? (
          <Link href={`/materias/${slug}/novo-topico`} className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Seja o primeiro a contribuir →
          </Link>
        ) : (
          <Link href="/cadastro" className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Entre para contribuir →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((t, idx) => (
        <Link key={t.id} href={`/materias/${slug}/topico/${t.id}`} className="block">
          <div
            className="flex items-center gap-4 p-4 rounded-xl transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)')}
          >
            <span className="text-sm font-mono font-bold w-8 text-center shrink-0" style={{ color: 'var(--accent)' }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>{t.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={11} /> {formatDate(t.created_at.toISOString())}
                </span>
                {t.creator_nome && (
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    por {t.creator_nome}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
