import Link from 'next/link';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { subjects, subjectTopics, threads, users } from '@/lib/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { BookOpen, MessageSquare, Plus, Users, ArrowRight } from 'lucide-react';
import { SubjectCard } from '@/components/SubjectCard';

// ─── Dashboard (logado) ───────────────────────────────────────────────────────

async function getDashboardData() {
  const recentSubjects = await db
    .select({
      slug: subjects.slug,
      title: subjects.title,
      emoji: subjects.emoji,
      description: subjects.description,
      topic_count: sql<number>`cast(count(${subjectTopics.id}) as int)`,
    })
    .from(subjects)
    .leftJoin(subjectTopics, eq(subjectTopics.subject_id, subjects.id))
    .groupBy(subjects.id)
    .orderBy(desc(subjects.created_at))
    .limit(6);

  const recentThreads = await db
    .select({
      id: threads.id,
      title: threads.title,
      created_at: threads.created_at,
      user_nome: users.nome,
      user_sobrenome: users.sobrenome,
    })
    .from(threads)
    .leftJoin(users, eq(threads.user_id, users.id))
    .orderBy(desc(threads.created_at))
    .limit(5);

  return { recentSubjects, recentThreads };
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(255,212,59,0.1)', color: 'var(--accent)' }}
      >
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>{value}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
      </div>
    </div>
  );
}

async function Dashboard({ nome }: { nome: string }) {
  const { recentSubjects, recentThreads } = await getDashboardData();

  // Python conta como matéria extra (estática)
  const pythonCard = {
    slug: 'python',
    title: 'Python',
    emoji: '🐍',
    description: '12 tópicos de revisão para Engenharia de Software.',
    topic_count: 12,
  };

  const allSubjects = [pythonCard, ...recentSubjects].slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
          Olá, {nome} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>O que vamos estudar hoje?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        <StatCard icon={<BookOpen size={18} />} label="Matérias disponíveis" value={String(recentSubjects.length + 1)} />
        <StatCard icon={<MessageSquare size={18} />} label="Discussões abertas" value={String(recentThreads.length)} />
        <StatCard icon={<Users size={18} />} label="Aberto a contribuições" value="Sim" />
      </div>

      {/* Matérias */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Matérias</h2>
        <div className="flex gap-2">
          <Link
            href="/materias/nova"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: 'var(--accent)', color: '#0d0d0d' }}
          >
            <Plus size={13} /> Nova matéria
          </Link>
          <Link
            href="/materias"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            Ver todas
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {allSubjects.map(s => (
          <SubjectCard key={s.slug} {...s} />
        ))}
      </div>

      {/* Fórum recente */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Discussões recentes</h2>
        <Link href="/forum" className="text-xs" style={{ color: 'var(--accent)' }}>
          Ver todas →
        </Link>
      </div>

      {recentThreads.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Nenhuma discussão ainda.{' '}
          <Link href="/forum/nova" style={{ color: 'var(--accent)' }}>Abra a primeira!</Link>
        </p>
      ) : (
        <div className="space-y-2">
          {recentThreads.map(t => (
            <Link key={t.id} href={`/forum/${t.id}`}>
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p className="text-sm truncate" style={{ color: 'var(--text)' }}>{t.title}</p>
                <span className="text-xs ml-4 shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {t.user_nome} {t.user_sobrenome}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Landing (não logado) ─────────────────────────────────────────────────────

function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div
          className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-6"
          style={{ background: 'rgba(255,212,59,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,212,59,0.3)' }}
        >
          Open source · Feito por estudantes
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--text)' }}>
          Uma plataforma de estudos<br />
          <span style={{ color: 'var(--accent)' }}>feita por quem estuda</span>
        </h1>

        <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: 'var(--text-muted)' }}>
          Matérias criadas pela comunidade, fórum de dúvidas e conteúdo que qualquer um pode contribuir. Para estudantes de TI.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/cadastro"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ background: 'var(--accent)', color: '#0d0d0d' }}
          >
            Criar conta grátis <ArrowRight size={16} />
          </Link>
          <Link
            href="/materias"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <BookOpen size={16} /> Ver matérias
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        className="border-t py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
            Como funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: '📚',
                title: 'Estude',
                desc: 'Acesse matérias organizadas por área: Python, Redes, S.O. e muito mais.',
              },
              {
                emoji: '✍️',
                title: 'Contribua',
                desc: 'Crie matérias, adicione tópicos e ajude outros estudantes a aprender.',
              },
              {
                emoji: '💬',
                title: 'Discuta',
                desc: 'Tire dúvidas no fórum, responda perguntas e troque conhecimento.',
              },
            ].map(f => (
              <div
                key={f.title}
                className="p-6 rounded-2xl text-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <p className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Pronto para começar?
          </p>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ background: 'var(--accent)', color: '#0d0d0d' }}
          >
            Criar conta grátis <ArrowRight size={16} />
          </Link>
          <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            Já tem conta?{' '}
            <Link href="/login" style={{ color: 'var(--accent)' }}>Entrar</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default async function Home() {
  const session = await auth();

  if (session) {
    return <Dashboard nome={session.user.nome} />;
  }

  return <Landing />;
}
