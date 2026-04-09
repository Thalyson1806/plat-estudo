import { NextRequest, NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { subjects, subjectTopics, users } from '@/lib/db/schema';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [subject] = await db
    .select({
      id: subjects.id,
      slug: subjects.slug,
      title: subjects.title,
      description: subjects.description,
      emoji: subjects.emoji,
      created_at: subjects.created_at,
      creator_nome: users.nome,
      creator_sobrenome: users.sobrenome,
    })
    .from(subjects)
    .leftJoin(users, eq(subjects.created_by, users.id))
    .where(eq(subjects.slug, slug))
    .limit(1);

  if (!subject) return NextResponse.json({ error: 'Matéria não encontrada' }, { status: 404 });

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

  return NextResponse.json({ subject, topics });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  const { slug } = await params;

  const [subject] = await db
    .select({ id: subjects.id })
    .from(subjects)
    .where(eq(subjects.slug, slug))
    .limit(1);

  if (!subject) return NextResponse.json({ error: 'Matéria não encontrada' }, { status: 404 });

  await db.delete(subjects).where(eq(subjects.slug, slug));

  return NextResponse.json({ ok: true });
}
