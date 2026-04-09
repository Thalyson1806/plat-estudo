import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { threads, replies } from '@/lib/db/schema';
import { replySchema } from '@/lib/validations';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { id: thread_id } = await params;

  const [thread] = await db
    .select({ id: threads.id })
    .from(threads)
    .where(eq(threads.id, thread_id))
    .limit(1);

  if (!thread) return NextResponse.json({ error: 'Thread não encontrada' }, { status: 404 });

  const body = await req.json();
  const parsed = replySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  await db.insert(replies).values({
    thread_id,
    user_id: session.user.id,
    body: parsed.data.body,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
