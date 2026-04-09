'use client';

import Link from 'next/link';
import { MessageSquare, Tag } from 'lucide-react';

interface ThreadRow {
  id: string;
  title: string;
  topic_slug: string | null;
  created_at: string;
  user_nome: string;
  user_sobrenome: string;
  reply_count: number;
}

interface Topic {
  slug: string;
  title: string;
  emoji: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function ThreadList({ threads, topicMap }: { threads: ThreadRow[]; topicMap: Record<string, Topic> }) {
  if (threads.length === 0) {
    return (
      <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
        <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
        <p>Nenhuma discussão ainda. Seja o primeiro a abrir uma!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {threads.map(t => {
        const topic = t.topic_slug ? topicMap[t.topic_slug] : null;
        return (
          <Link key={t.id} href={`/forum/${t.id}`} className="block group">
            <div
              className="flex items-center justify-between p-4 rounded-xl transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)')}
            >
              <div className="flex-1 min-w-0">
                {topic && (
                  <span
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mb-1"
                    style={{ background: 'rgba(255,212,59,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,212,59,0.3)' }}
                  >
                    <Tag size={10} />
                    {topic.emoji} {topic.title}
                  </span>
                )}
                <p className="font-medium text-sm truncate" style={{ color: 'var(--text)' }}>
                  {t.title}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {t.user_nome} {t.user_sobrenome} · {formatDate(t.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-4 shrink-0 text-xs" style={{ color: 'var(--text-muted)' }}>
                <MessageSquare size={14} />
                {t.reply_count}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
