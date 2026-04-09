import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { loginSchema } from '@/lib/validations';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, senha } = parsed.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) return null;

        const senhaOk = await bcrypt.compare(senha, user.senha_hash);
        if (!senhaOk) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.nome} ${user.sobrenome}`,
          nome: user.nome,
          sobrenome: user.sobrenome,
          turma: user.turma,
          curso: user.curso,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nome = user.nome;
        token.sobrenome = user.sobrenome;
        token.turma = user.turma;
        token.curso = user.curso;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.nome = token.nome as string;
      session.user.sobrenome = token.sobrenome as string;
      session.user.turma = token.turma as string;
      session.user.curso = token.curso as string;
      session.user.role = token.role as string;
      return session;
    },
  },
});
