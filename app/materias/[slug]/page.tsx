import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Plus } from 'lucide-react';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { subjects, subjectTopics, users } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { TopicList } from './TopicList';
import { SubjectAdminActions } from './SubjectAdminActions';

async function getSubject(slug: string) {
  const [subject] = await db
    .select({
      id: subjects.id,
      slug: subjects.slug,
      title: subjects.title,
      description: subjects.description,
      emoji: subjects.emoji,
      creator_nome: users.nome,
      creator_sobrenome: users.sobrenome,
    })
    .from(subjects)
    .leftJoin(users, eq(subjects.created_by, users.id))
    .where(eq(subjects.slug, slug))
    .limit(1);

  if (!subject) return null;

  const topics = await db
    .select({
      id: subjectTopics.id,
      title: subjectTopics.title,
      order_index: subjectTopics.order_index,
      created_at: subjectTopics.created_at,
      creator_nome: users.nome,
      creator_sobrenome: users.sobrenome,
    })
    .from(subjectTopics)
    .leftJoin(users, eq(subjectTopics.created_by, users.id))
    .where(eq(subjectTopics.subject_id, subject.id))
    .orderBy(asc(subjectTopics.order_index), asc(subjectTopics.created_at));

  return { subject, topics };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === 'python') redirect('/materias/python/topicos');
  if (slug === 'redes-seguranca') redirect('/materias/redes-seguranca/topicos');
  if (slug === 'sistemas-operacionais') redirect('/materias/sistemas-operacionais/topicos');

  const data = await getSubject(slug);
  if (!data) notFound();

  const { subject, topics } = data;
  const session = await auth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/materias" className="flex items-center gap-1 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <ChevronLeft size={16} /> Matérias
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{subject.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{subject.title}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{subject.description}</p>
            {subject.creator_nome && (
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                Criada por {subject.creator_nome} {subject.creator_sobrenome}
              </p>
            )}
          </div>
        </div>
        {session && (
          <Link
            href={`/materias/${slug}/novo-topico`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shrink-0"
            style={{ background: 'var(--accent)', color: '#0d0d0d' }}
          >
            <Plus size={15} /> Adicionar tópico
          </Link>
        )}
      </div>

      {/* Ações admin */}
      {session?.user.role === 'admin' && (
        <div className="mb-6">
          <SubjectAdminActions slug={slug} />
        </div>
      )}

      {/* Lista de tópicos */}
      <div>
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>
          {topics.length} {topics.length === 1 ? 'tópico' : 'tópicos'}
        </h2>

        <TopicList topics={topics} slug={slug} isLoggedIn={!!session} />
      </div>
    </div>
  );
}
