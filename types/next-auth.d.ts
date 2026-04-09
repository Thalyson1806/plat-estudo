import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      nome: string;
      sobrenome: string;
      turma: string;
      curso: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    nome: string;
    sobrenome: string;
    turma: string;
    curso: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    nome: string;
    sobrenome: string;
    turma: string;
    curso: string;
    role: string;
  }
}
