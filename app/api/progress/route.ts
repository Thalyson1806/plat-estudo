import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { progress } from '@/lib/db/schema';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ slugs: [] });

  const rows = await db
    .select({ topic_slug: progress.topic_slug })
    .from(progress)
    .where(eq(progress.user_id, session.user.id));

  return NextResponse.json({ slugs: rows.map(r => r.topic_slug) });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { slug } = await req.json();
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Slug inválido' }, { status: 400 });
  }

  // upsert — ignora se já existir
  const [existing] = await db
    .select({ id: progress.id })
    .from(progress)
    .where(and(eq(progress.user_id, session.user.id), eq(progress.topic_slug, slug)))
    .limit(1);

  if (!existing) {
    await db.insert(progress).values({ user_id: session.user.id, topic_slug: slug });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { slug } = await req.json();
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Slug inválido' }, { status: 400 });
  }

  await db
    .delete(progress)
    .where(and(eq(progress.user_id, session.user.id), eq(progress.topic_slug, slug)));

  return NextResponse.json({ ok: true });
}
