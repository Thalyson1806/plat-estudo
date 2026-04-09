import { NextRequest, NextResponse } from 'next/server';
import { desc, eq, sql } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { threads, replies, users } from '@/lib/db/schema';
import { threadSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic_slug = searchParams.get('topic_slug');
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
  const limit = 20;
  const offset = (page - 1) * limit;

  const query = db
    .select({
      id: threads.id,
      title: threads.title,
      topic_slug: threads.topic_slug,
      created_at: threads.created_at,
      user_nome: users.nome,
      user_sobrenome: users.sobrenome,
      reply_count: sql<number>`cast(count(${replies.id}) as int)`,
    })
    .from(threads)
    .leftJoin(users, eq(threads.user_id, users.id))
    .leftJoin(replies, eq(replies.thread_id, threads.id))
    .groupBy(threads.id, users.nome, users.sobrenome)
    .orderBy(desc(threads.created_at))
    .limit(limit)
    .offset(offset);

  if (topic_slug) {
    const rows = await query.where(eq(threads.topic_slug, topic_slug));
    return NextResponse.json(rows);
  }

  const rows = await query;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const body = await req.json();
  const parsed = threadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const [thread] = await db
    .insert(threads)
    .values({
      user_id: session.user.id,
      title: parsed.data.title,
      body: parsed.data.body,
      topic_slug: parsed.data.topic_slug ?? null,
    })
    .returning({ id: threads.id });

  return NextResponse.json({ id: thread.id }, { status: 201 });
}
