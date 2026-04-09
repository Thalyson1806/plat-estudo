import { NextRequest, NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { threads, replies, users } from '@/lib/db/schema';
import { z } from 'zod';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [thread] = await db
    .select({
      id: threads.id,
      title: threads.title,
      body: threads.body,
      topic_slug: threads.topic_slug,
      created_at: threads.created_at,
      user_id: threads.user_id,
      user_nome: users.nome,
      user_sobrenome: users.sobrenome,
      user_turma: users.turma,
      user_curso: users.curso,
    })
    .from(threads)
    .leftJoin(users, eq(threads.user_id, users.id))
    .where(eq(threads.id, id))
    .limit(1);

  if (!thread) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  const threadReplies = await db
    .select({
      id: replies.id,
      body: replies.body,
      created_at: replies.created_at,
      user_id: replies.user_id,
      user_nome: users.nome,
      user_sobrenome: users.sobrenome,
      user_turma: users.turma,
    })
    .from(replies)
    .leftJoin(users, eq(replies.user_id, users.id))
    .where(eq(replies.thread_id, id))
    .orderBy(asc(replies.created_at));

  return NextResponse.json({ thread, replies: threadReplies });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { id } = await params;

  const [thread] = await db
    .select({ user_id: threads.user_id })
    .from(threads)
    .where(eq(threads.id, id))
    .limit(1);

  if (!thread) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  const isOwner = thread.user_id === session.user.id;
  const isAdmin = session.user.role === 'admin';
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  const body = await req.json();
  const parsed = z.object({
    title: z.string().min(5).max(255).trim(),
    body: z.string().min(10).max(5000).trim(),
  }).safeParse(body);

  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  await db
    .update(threads)
    .set({ title: parsed.data.title, body: parsed.data.body, updated_at: new Date() })
    .where(eq(threads.id, id));

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { id } = await params;

  const [thread] = await db
    .select({ user_id: threads.user_id })
    .from(threads)
    .where(eq(threads.id, id))
    .limit(1);

  if (!thread) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  const isOwner = thread.user_id === session.user.id;
  const isAdmin = session.user.role === 'admin';
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  await db.delete(threads).where(eq(threads.id, id));

  return NextResponse.json({ ok: true });
}
