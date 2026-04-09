import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { subjects, subjectTopics } from '@/lib/db/schema';
import { SubjectCard } from '@/components/SubjectCard';
import { desc, eq, sql } from 'drizzle-orm';

async function getSubjects() {
  return db
    .select({
      slug: subjects.slug,
      title: subjects.title,
      description: subjects.description,
      emoji: subjects.emoji,
      created_at: subjects.created_at,
      topic_count: sql<number>`cast(count(${subjectTopics.id}) as int)`,
    })
    .from(subjects)
    .leftJoin(subjectTopics, eq(subjectTopics.subject_id, subjects.id))
    .groupBy(subjects.id)
    .orderBy(desc(subjects.created_at));
}

const STATIC_MODULES = [
  {
    slug: 'python',
    title: 'Python',
    emoji: '🐍',
    description: '12 tópicos de revisão para Engenharia de Software.',
    topic_count: 12,
  },
  {
    slug: 'redes-seguranca',
    title: 'Redes e Segurança',
    emoji: '🔒',
    description: 'OSI, TCP/IP, DNS, HTTP, Criptografia, Ataques e VPN.',
    topic_count: 8,
  },
  {
    slug: 'sistemas-operacionais',
    title: 'Sistemas Operacionais',
    emoji: '🖥️',
    description: 'Processos, Threads, Escalonamento, Memória, Deadlock e I/O.',
    topic_count: 8,
  },
];

export default async function MateriasPage() {
  const session = await auth();
  const dbSubjects = await getSubjects();
  const all = [...STATIC_MODULES, ...dbSubjects];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Matérias</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {all.length} {all.length === 1 ? 'matéria disponível' : 'matérias disponíveis'}
          </p>
        </div>
        {session && (
          <Link
            href="/materias/nova"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--accent)', color: '#0d0d0d' }}
          >
            <Plus size={15} /> Nova matéria
          </Link>
        )}
      </div>

      {all.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p>Nenhuma matéria ainda.</p>
          {session && (
            <Link href="/materias/nova" className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--accent)' }}>
              Criar a primeira matéria →
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map(s => (
            <SubjectCard key={s.slug} {...s} />
          ))}
        </div>
      )}
    </div>
  );
}
