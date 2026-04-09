import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { subjectTopics, subjects, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function getTopic(id: string) {
  const [row] = await db
    .select({
      id: subjectTopics.id,
      title: subjectTopics.title,
      content: subjectTopics.content,
      created_at: subjectTopics.created_at,
      subject_slug: subjects.slug,
      subject_title: subjects.title,
      subject_emoji: subjects.emoji,
      creator_nome: users.nome,
      creator_sobrenome: users.sobrenome,
      creator_turma: users.turma,
    })
    .from(subjectTopics)
    .leftJoin(subjects, eq(subjectTopics.subject_id, subjects.id))
    .leftJoin(users, eq(subjectTopics.created_by, users.id))
    .where(eq(subjectTopics.id, id))
    .limit(1);

  return row ?? null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default async function TopicoPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const topic = await getTopic(id);

  if (!topic || topic.subject_slug !== slug) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href={`/materias/${slug}`}
        className="flex items-center gap-1 text-sm mb-8"
        style={{ color: 'var(--text-muted)' }}
      >
        <ChevronLeft size={16} />
        {topic.subject_emoji} {topic.subject_title}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>{topic.title}</h1>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          {topic.creator_nome && (
            <span>
              Contribuído por{' '}
              <span style={{ color: 'var(--text)' }}>
                {topic.creator_nome} {topic.creator_sobrenome}
              </span>
              {topic.creator_turma && ` · ${topic.creator_turma}`}
            </span>
          )}
          <span>·</span>
          <span>{formatDate(topic.created_at.toISOString())}</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div
          className="text-sm leading-8 whitespace-pre-wrap"
          style={{ color: 'var(--text-muted)' }}
        >
          {topic.content}
        </div>
      </div>

      {/* Ação */}
      <div className="flex gap-3">
        <Link
          href={`/materias/${slug}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <ChevronLeft size={15} /> Voltar para {topic.subject_title}
        </Link>
        <Link
          href={`/forum/nova?subject=${slug}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: 'rgba(255,212,59,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,212,59,0.3)' }}
        >
          💬 Abrir dúvida no fórum
        </Link>
      </div>
    </div>
  );
}
