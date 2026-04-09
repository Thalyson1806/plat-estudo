import { z } from 'zod';

export const registerSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter ao menos 2 caracteres').max(100).trim(),
  sobrenome: z.string().min(2, 'Sobrenome deve ter ao menos 2 caracteres').max(100).trim(),
  email: z.string().email('E-mail inválido').toLowerCase().trim(),
  senha: z
    .string()
    .min(8, 'Senha deve ter ao menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha precisa ter ao menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha precisa ter ao menos um número'),
  turma: z.string().max(50).trim().optional().default(''),
  curso: z.string().min(2, 'Curso é obrigatório').max(100).trim(),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

export const threadSchema = z.object({
  title: z.string().min(5, 'Título deve ter ao menos 5 caracteres').max(255).trim(),
  body: z.string().min(10, 'Conteúdo deve ter ao menos 10 caracteres').max(5000).trim(),
  topic_slug: z.string().max(100).optional().nullable(),
});

export const replySchema = z.object({
  body: z.string().min(3, 'Resposta deve ter ao menos 3 caracteres').max(3000).trim(),
});
