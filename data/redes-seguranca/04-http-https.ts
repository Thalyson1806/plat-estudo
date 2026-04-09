import type { Topic } from '@/lib/types';

export const httpHttps: Topic = {
  slug: '04-http-https',
  number: 4,
  title: 'HTTP e HTTPS',
  emoji: '🔗',
  shortDescription: 'O protocolo que move a web — e como o S faz toda a diferença.',
  sections: [
    {
      title: 'O que é HTTP?',
      content: `HTTP (HyperText Transfer Protocol) é o protocolo da camada de aplicação usado para transferir dados na web. É um protocolo de requisição-resposta: o cliente pede, o servidor responde.

Métodos HTTP principais:
• GET     → Buscar dados (sem body, idempotente)
• POST    → Criar recurso (com body)
• PUT     → Substituir recurso completo
• PATCH   → Atualizar parte do recurso
• DELETE  → Apagar recurso

Códigos de status:
• 2xx → Sucesso (200 OK, 201 Created, 204 No Content)
• 3xx → Redirecionamento (301, 302, 307)
• 4xx → Erro do cliente (400 Bad Request, 401, 403, 404)
• 5xx → Erro do servidor (500, 502, 503)`,
    },
    {
      title: 'HTTP vs HTTPS',
      content: `HTTPS = HTTP + TLS (Transport Layer Security)

HTTP:
• Dados trafegam em texto puro
• Qualquer um na rede pode interceptar e ler
• Porta padrão: 80

HTTPS:
• Dados são criptografados com TLS
• Mesmo interceptado, o conteúdo é ilegível
• Autenticação via certificado digital (garante que é o site real)
• Porta padrão: 443

O cadeado no navegador = conexão HTTPS com certificado válido.`,
      tip: 'Nunca envie senhas, dados de cartão ou informações pessoais por conexões HTTP. Sempre verifique o cadeado.',
    },
    {
      title: 'Estrutura de uma requisição HTTP',
      content: `Uma requisição HTTP tem: método, URL, cabeçalhos e corpo.`,
      codeExample: {
        language: 'text',
        code: `# Requisição HTTP (texto puro)
POST /api/login HTTP/1.1
Host: exemplo.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{"email": "user@email.com", "senha": "1234"}

---

# Resposta do servidor
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session=abc123; HttpOnly; Secure

{"token": "eyJhbGci...", "nome": "João"}`,
        explanation: 'Requisições HTTP são texto estruturado. O HTTPS criptografa esse conteúdo antes de transmitir pela rede.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual método HTTP é usado para CRIAR um novo recurso no servidor?',
      options: ['GET', 'DELETE', 'POST', 'HEAD'],
      correctIndex: 2,
      explanation: 'POST é usado para criar novos recursos. GET busca dados existentes. PUT/PATCH atualizam. DELETE remove.',
    },
    {
      question: 'O que o código de status HTTP 404 significa?',
      options: [
        'Erro interno do servidor',
        'Recurso não encontrado',
        'Acesso não autorizado',
        'Requisição com sucesso',
      ],
      correctIndex: 1,
      explanation: '404 Not Found indica que o recurso solicitado não existe no servidor. Faz parte da família 4xx que representa erros do lado do cliente.',
    },
    {
      question: 'Qual é a principal diferença entre HTTP e HTTPS?',
      options: [
        'HTTPS é mais lento e por isso deve ser evitado',
        'HTTPS usa uma porta diferente mas transmite os mesmos dados',
        'HTTPS criptografa os dados com TLS, impedindo interceptação',
        'HTTP é mais seguro pois não usa certificados que podem ser falsos',
      ],
      correctIndex: 2,
      explanation: 'O HTTPS usa TLS para criptografar os dados em trânsito. Mesmo que alguém intercepte os pacotes, o conteúdo é ilegível sem a chave privada do servidor.',
    },
  ],
};
