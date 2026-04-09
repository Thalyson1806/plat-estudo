import type { Topic } from '@/lib/types';

export const protocoloTcpIp: Topic = {
  slug: '02-protocolo-tcp-ip',
  number: 2,
  title: 'TCP/IP e Endereçamento',
  emoji: '🌐',
  shortDescription: 'Como computadores se identificam e se comunicam na internet.',
  sections: [
    {
      title: 'A pilha TCP/IP',
      content: `O TCP/IP é o conjunto de protocolos que realmente roda a internet. Enquanto o OSI é teórico, o TCP/IP é prático. Ele tem 4 camadas:

┌──────────────────────────────────────────┐
│  APLICAÇÃO     HTTP, DNS, FTP, SMTP      │
│  TRANSPORTE    TCP, UDP                  │
│  INTERNET      IP, ICMP, ARP             │
│  ACESSO À REDE Ethernet, Wi-Fi           │
└──────────────────────────────────────────┘

Cada camada encapsula os dados da camada acima adicionando seu cabeçalho (header).`,
    },
    {
      title: 'Endereços IP: IPv4 e IPv6',
      content: `O endereço IP identifica um dispositivo na rede.

IPv4 (32 bits): 4 números de 0 a 255 separados por ponto
  Exemplo: 192.168.1.100
  Total: ~4,3 bilhões de endereços (já esgotados!)

IPv6 (128 bits): 8 grupos de 4 hex separados por ":"
  Exemplo: 2001:0db8:85a3::8a2e:0370:7334
  Total: 340 undecilhões de endereços

Endereços privados (não roteáveis na internet):
• 10.0.0.0/8
• 172.16.0.0/12
• 192.168.0.0/16

O NAT (Network Address Translation) permite que vários dispositivos com IP privado compartilhem um único IP público.`,
      tip: 'O IP do seu PC em casa (ex: 192.168.0.x) é privado. O IP que sites veem é o IP público do seu roteador.',
    },
    {
      title: 'Portas e sockets',
      content: `O IP identifica o computador. A porta identifica o serviço/processo dentro do computador.

Portas bem conhecidas (0-1023):
• 80   → HTTP
• 443  → HTTPS
• 22   → SSH
• 21   → FTP
• 53   → DNS
• 3306 → MySQL
• 5432 → PostgreSQL

Um socket é a combinação de IP + porta: 192.168.1.10:8080
É isso que permite que um servidor atenda múltiplas conexões simultaneamente.`,
      codeExample: {
        language: 'bash',
        code: `# Ver conexões ativas e portas abertas no Linux/Mac
netstat -tuln

# Ver qual processo usa uma porta específica
lsof -i :3000

# Testar conectividade com IP e porta
nc -zv google.com 443`,
        explanation: 'Esses comandos ajudam a diagnosticar problemas de rede e ver quais serviços estão rodando.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual é a principal diferença entre IPv4 e IPv6?',
      options: [
        'IPv6 é mais lento que IPv4',
        'IPv4 usa 128 bits e IPv6 usa 32 bits',
        'IPv6 usa 128 bits e oferece muito mais endereços que o IPv4 (32 bits)',
        'IPv6 é privado e IPv4 é público',
      ],
      correctIndex: 2,
      explanation: 'IPv4 usa 32 bits (~4,3 bilhões de endereços, já esgotados). IPv6 usa 128 bits, oferecendo um número astronomicamente maior de endereços para resolver o esgotamento.',
    },
    {
      question: 'O que é uma porta de rede?',
      options: [
        'Um conector físico no computador',
        'Um número que identifica um serviço ou processo dentro de um computador',
        'O endereço IP de um servidor',
        'Um tipo de cabo de rede',
      ],
      correctIndex: 1,
      explanation: 'A porta é um número (0-65535) que identifica qual processo/serviço dentro de um computador deve receber um pacote. O IP encontra o computador, a porta encontra o serviço.',
    },
    {
      question: 'O que é NAT (Network Address Translation)?',
      options: [
        'Um protocolo para criptografar dados',
        'Um algoritmo de roteamento entre países',
        'Uma técnica que permite múltiplos dispositivos com IP privado compartilharem um IP público',
        'Um tipo de firewall',
      ],
      correctIndex: 2,
      explanation: 'O NAT é o que permite que todos os dispositivos da sua rede doméstica (com IPs privados como 192.168.x.x) acessem a internet através de um único IP público do roteador.',
    },
  ],
};
