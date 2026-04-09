import Link from 'next/link';
import { Plus } from 'lucide-react';
import { allTopics } from '@/data/topics';
import { ThreadList } from './ThreadList';

interface ThreadRow {
  id: string;
  title: string;
  topic_slug: string | null;
  created_at: string;
  user_nome: string;
  user_sobrenome: string;
  reply_count: number;
}

async function getThreads(topic_slug?: string): Promise<ThreadRow[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const url = topic_slug
    ? `${base}/api/threads?topic_slug=${topic_slug}`
    : `${base}/api/threads`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ topic_slug?: string }>;
}) {
  const { topic_slug } = await searchParams;
  const threads = await getThreads(topic_slug);
  const topicMap = Object.fromEntries(allTopics.map(t => [t.slug, t]));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
            Fórum
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Dúvidas, discussões e troca de conhecimento.
          </p>
        </div>
        <Link
          href="/forum/nova"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#0d0d0d' }}
        >
          <Plus size={16} />
          Nova discussão
        </Link>
      </div>

      {/* Filtro por tópico */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/forum"
          className="px-3 py-1 rounded-full text-xs font-medium transition-all"
          style={{
            background: !topic_slug ? 'var(--accent)' : 'var(--bg-card)',
            color: !topic_slug ? '#0d0d0d' : 'var(--text-muted)',
            border: `1px solid ${!topic_slug ? 'var(--accent)' : 'var(--border)'}`,
          }}
        >
          Todos
        </Link>
        {allTopics.map(t => (
          <Link
            key={t.slug}
            href={`/forum?topic_slug=${t.slug}`}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background: topic_slug === t.slug ? 'var(--accent)' : 'var(--bg-card)',
              color: topic_slug === t.slug ? '#0d0d0d' : 'var(--text-muted)',
              border: `1px solid ${topic_slug === t.slug ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {t.emoji} {t.title}
          </Link>
        ))}
      </div>

      <ThreadList threads={threads} topicMap={topicMap} />
    </div>
  );
}
