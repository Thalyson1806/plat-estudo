import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { subjectTopics, users } from '@/lib/db/schema';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string; id: string }> }) {
  const { id } = await params;

  const [topic] = await db
    .select({
      id: subjectTopics.id,
      title: subjectTopics.title,
      content: subjectTopics.content,
      order_index: subjectTopics.order_index,
      created_at: subjectTopics.created_at,
      creator_nome: users.nome,
      creator_sobrenome: users.sobrenome,
    })
    .from(subjectTopics)
    .leftJoin(users, eq(subjectTopics.created_by, users.id))
    .where(eq(subjectTopics.id, id))
    .limit(1);

  if (!topic) return NextResponse.json({ error: 'Tópico não encontrado' }, { status: 404 });

  return NextResponse.json(topic);
}
