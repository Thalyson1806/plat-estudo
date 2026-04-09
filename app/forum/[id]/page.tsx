import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Tag } from 'lucide-react';
import { auth } from '@/auth';
import { allTopics } from '@/data/topics';
import { ReplyForm } from './ReplyForm';
import { ThreadActions, ReplyActions } from './ThreadActions';

interface ThreadData {
  thread: {
    id: string;
    title: string;
    body: string;
    topic_slug: string | null;
    created_at: string;
    user_id: string;
    user_nome: string;
    user_sobrenome: string;
    user_turma: string;
    user_curso: string;
  };
  replies: {
    id: string;
    body: string;
    created_at: string;
    user_id: string;
    user_nome: string;
    user_sobrenome: string;
    user_turma: string;
  }[];
}

async function getThread(id: string): Promise<ThreadData | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${base}/api/threads/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Avatar({ nome, sobrenome }: { nome: string; sobrenome: string }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: 'var(--accent)', color: '#0d0d0d' }}
    >
      {nome[0]}{sobrenome[0]}
    </div>
  );
}

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getThread(id);
  if (!data) notFound();

  const session = await auth();
  const { thread, replies } = data;
  const topicMap = Object.fromEntries(allTopics.map(t => [t.slug, t]));
  const topic = thread.topic_slug ? topicMap[thread.topic_slug] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/forum" className="flex items-center gap-1 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        <ChevronLeft size={16} />
        Voltar ao fórum
      </Link>

      {/* Thread principal */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        {topic && (
          <span
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mb-3"
            style={{ background: 'rgba(255,212,59,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,212,59,0.3)' }}
          >
            <Tag size={10} />
            {topic.emoji} {topic.title}
          </span>
        )}

        <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
          {thread.title}
        </h1>

        <div className="flex items-start gap-3 mb-4">
          <Avatar nome={thread.user_nome} sobrenome={thread.user_sobrenome} />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {thread.user_nome} {thread.user_sobrenome}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {thread.user_turma} · {thread.user_curso} · {formatDate(thread.created_at)}
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
          {thread.body}
        </p>

        {(session?.user.id === thread.user_id || session?.user.role === 'admin') && (
          <ThreadActions
            threadId={thread.id}
            initialTitle={thread.title}
            initialBody={thread.body}
          />
        )}
      </div>

      {/* Respostas */}
      <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>
        {replies.length} {replies.length === 1 ? 'resposta' : 'respostas'}
      </h2>

      <div className="space-y-4 mb-8">
        {replies.map(r => (
          <div
            key={r.id}
            className="rounded-xl p-4"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <Avatar nome={r.user_nome} sobrenome={r.user_sobrenome} />
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {r.user_nome} {r.user_sobrenome}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {r.user_turma} · {formatDate(r.created_at)}
                </p>
              </div>
            </div>
            <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
              {r.body}
            </p>

            {(session?.user.id === r.user_id || session?.user.role === 'admin') && (
              <ReplyActions
                threadId={id}
                replyId={r.id}
                initialBody={r.body}
              />
            )}
          </div>
        ))}
      </div>

      {/* Formulário de resposta */}
      {session ? (
        <ReplyForm threadId={id} />
      ) : (
        <div
          className="text-center py-6 rounded-xl text-sm"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <Link href="/login" className="font-medium" style={{ color: 'var(--accent)' }}>
            Entre na sua conta
          </Link>{' '}
          para responder esta discussão.
        </div>
      )}
    </div>
  );
}
