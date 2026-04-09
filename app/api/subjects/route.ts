import { NextRequest, NextResponse } from 'next/server';
import { desc, eq, sql } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { subjects, subjectTopics, users } from '@/lib/db/schema';
import { z } from 'zod';

const createSchema = z.object({
  title: z.string().min(2, 'Título muito curto').max(255).trim(),
  description: z.string().min(10, 'Descrição muito curta').max(500).trim(),
  emoji: z.string().min(1).max(10).trim(),
  slug: z
    .string()
    .min(2)
    .max(100)
    .toLowerCase()
    .trim()
    .regex(/^[a-z0-9-]+$/, 'Slug só pode ter letras minúsculas, números e hífens'),
});

export async function GET() {
  const rows = await db
    .select({
      id: subjects.id,
      slug: subjects.slug,
      title: subjects.title,
      description: subjects.description,
      emoji: subjects.emoji,
      created_at: subjects.created_at,
      creator_nome: users.nome,
      creator_sobrenome: users.sobrenome,
      topic_count: sql<number>`cast(count(${subjectTopics.id}) as int)`,
    })
    .from(subjects)
    .leftJoin(users, eq(subjects.created_by, users.id))
    .leftJoin(subjectTopics, eq(subjectTopics.subject_id, subjects.id))
    .groupBy(subjects.id, users.nome, users.sobrenome)
    .orderBy(desc(subjects.created_at));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { title, description, emoji, slug } = parsed.data;

  const [existing] = await db
    .select({ id: subjects.id })
    .from(subjects)
    .where(eq(subjects.slug, slug))
    .limit(1);

  if (existing) {
    return NextResponse.json({ error: 'Este slug já está em uso. Escolha outro.' }, { status: 409 });
  }

  const [subject] = await db
    .insert(subjects)
    .values({ title, description, emoji, slug, created_by: session.user.id })
    .returning({ slug: subjects.slug });

  return NextResponse.json({ slug: subject.slug }, { status: 201 });
}
