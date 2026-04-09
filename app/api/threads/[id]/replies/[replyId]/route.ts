import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { replies } from '@/lib/db/schema';
import { z } from 'zod';

type Params = { params: Promise<{ id: string; replyId: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { replyId } = await params;

  const [reply] = await db
    .select({ user_id: replies.user_id })
    .from(replies)
    .where(eq(replies.id, replyId))
    .limit(1);

  if (!reply) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  const isOwner = reply.user_id === session.user.id;
  const isAdmin = session.user.role === 'admin';
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  const body = await req.json();
  const parsed = z.object({ body: z.string().min(3).max(3000).trim() }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  await db.update(replies).set({ body: parsed.data.body }).where(eq(replies.id, replyId));

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { replyId } = await params;

  const [reply] = await db
    .select({ user_id: replies.user_id })
    .from(replies)
    .where(eq(replies.id, replyId))
    .limit(1);

  if (!reply) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  const isOwner = reply.user_id === session.user.id;
  const isAdmin = session.user.role === 'admin';
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  await db.delete(replies).where(eq(replies.id, replyId));

  return NextResponse.json({ ok: true });
}
