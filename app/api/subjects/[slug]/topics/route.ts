import { NextRequest, NextResponse } from 'next/server';
import { eq, max } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { subjects, subjectTopics } from '@/lib/db/schema';
import { z } from 'zod';

const topicSchema = z.object({
  title: z.string().min(3, 'Título muito curto').max(255).trim(),
  content: z.string().min(20, 'Conteúdo muito curto (mínimo 20 caracteres)').max(20000).trim(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { slug } = await params;

  const [subject] = await db
    .select({ id: subjects.id })
    .from(subjects)
    .where(eq(subjects.slug, slug))
    .limit(1);

  if (!subject) return NextResponse.json({ error: 'Matéria não encontrada' }, { status: 404 });

  const body = await req.json();
  const parsed = topicSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const [maxOrder] = await db
    .select({ val: max(subjectTopics.order_index) })
    .from(subjectTopics)
    .where(eq(subjectTopics.subject_id, subject.id));

  const next_order = (maxOrder?.val ?? -1) + 1;

  const [topic] = await db
    .insert(subjectTopics)
    .values({
      subject_id: subject.id,
      title: parsed.data.title,
      content: parsed.data.content,
      order_index: next_order,
      created_by: session.user.id,
    })
    .returning({ id: subjectTopics.id });

  return NextResponse.json({ id: topic.id }, { status: 201 });
}
