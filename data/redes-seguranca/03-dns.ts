import type { Topic } from '@/lib/types';

export const dns: Topic = {
  slug: '03-dns',
  number: 3,
  title: 'DNS',
  emoji: '📖',
  shortDescription: 'O sistema que traduz nomes de domínio em endereços IP.',
  sections: [
    {
      title: 'O que é DNS?',
      content: `DNS (Domain Name System) é o sistema que converte nomes de domínio legíveis (google.com) em endereços IP (142.250.78.46) que computadores entendem.

Sem DNS, você precisaria memorizar o IP de cada site que quisesse acessar. O DNS funciona como a "agenda de contatos" da internet.

Hierarquia de domínios:
  . (raiz)
  └── com
      └── google
          └── mail (mail.google.com)`,
      tip: 'Quando você digita um endereço no navegador, o DNS é a primeira coisa que acontece antes de qualquer conexão com o servidor.',
    },
    {
      title: 'Como funciona uma consulta DNS',
      content: `Passo a passo quando você acessa "google.com":

1. Seu computador verifica o cache local (já visitou antes?)
2. Pergunta ao resolver DNS do seu provedor (ou 8.8.8.8)
3. O resolver pergunta ao servidor raiz (.)
4. O servidor raiz aponta para o servidor TLD (.com)
5. O servidor TLD aponta para o servidor autoritativo do google.com
6. O servidor autoritativo responde com o IP: 142.250.78.46
7. O resolver guarda em cache e devolve para você

Todo esse processo leva menos de 100ms normalmente.`,
      codeExample: {
        language: 'bash',
        code: `# Consultar o IP de um domínio
nslookup google.com

# Consulta detalhada com dig
dig google.com

# Ver registro MX (email) de um domínio
dig google.com MX

# Forçar uso de DNS específico (8.8.8.8 = Google)
nslookup google.com 8.8.8.8`,
        explanation: 'Use nslookup ou dig para diagnosticar problemas de DNS ou simplesmente entender como um domínio está configurado.',
      },
    },
    {
      title: 'Tipos de registros DNS',
      content: `Cada domínio pode ter vários tipos de registros:

• A       → Mapeia domínio para IPv4
• AAAA    → Mapeia domínio para IPv6
• CNAME   → Alias — aponta para outro domínio
• MX      → Servidor de email do domínio
• TXT     → Texto livre (verificação, SPF, DKIM)
• NS      → Servidores de nomes autoritativos
• PTR     → Reverso: IP → domínio

Exemplo de zona DNS:
  google.com.    A     142.250.78.46
  google.com.    MX    aspmx.l.google.com
  www.google.com CNAME google.com`,
    },
  ],
  quiz: [
    {
      question: 'Qual é a função principal do DNS?',
      options: [
        'Criptografar conexões na internet',
        'Traduzir nomes de domínio em endereços IP',
        'Gerenciar senhas de sites',
        'Rotear pacotes entre roteadores',
      ],
      correctIndex: 1,
      explanation: 'O DNS (Domain Name System) converte nomes legíveis como "google.com" em endereços IP que os computadores usam para se conectar. É a "agenda" da internet.',
    },
    {
      question: 'Qual tipo de registro DNS aponta um domínio para um endereço IPv4?',
      options: ['CNAME', 'MX', 'A', 'NS'],
      correctIndex: 2,
      explanation: 'O registro A (Address) mapeia um nome de domínio diretamente para um endereço IPv4. Para IPv6, usa-se o registro AAAA.',
    },
    {
      question: 'O que é DNS cache e por que ele existe?',
      options: [
        'É um banco de dados de senhas armazenado no servidor DNS',
        'É o armazenamento temporário de respostas DNS para evitar consultas repetidas',
        'É um arquivo de configuração do sistema operacional',
        'É o histórico de sites visitados no navegador',
      ],
      correctIndex: 1,
      explanation: 'O cache DNS armazena temporariamente respostas de consultas anteriores. Isso acelera a navegação (não precisa repetir todo o processo de resolução) e reduz a carga nos servidores DNS.',
    },
  ],
};
