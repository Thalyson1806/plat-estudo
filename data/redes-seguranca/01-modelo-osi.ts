import type { Topic } from '@/lib/types';

export const modeloOsi: Topic = {
  slug: '01-modelo-osi',
  number: 1,
  title: 'Modelo OSI',
  emoji: '🧱',
  shortDescription: 'As 7 camadas que explicam como redes de computadores funcionam.',
  sections: [
    {
      title: 'O que é o Modelo OSI?',
      content: `O Modelo OSI (Open Systems Interconnection) é um padrão criado pela ISO que divide a comunicação em rede em 7 camadas. Cada camada tem uma responsabilidade específica e se comunica apenas com a camada acima e abaixo dela.

Ele não descreve como as redes funcionam na prática (isso é o TCP/IP), mas serve como referência para entender e diagnosticar problemas de rede.`,
    },
    {
      title: 'As 7 Camadas',
      content: `As camadas vão de baixo (física) para cima (aplicação):

┌────────────────────────────────────────────────────┐
│  7 - APLICAÇÃO     HTTP, FTP, DNS, SMTP            │
│  6 - APRESENTAÇÃO  Criptografia, compressão        │
│  5 - SESSÃO        Controle de sessão/diálogo      │
│  4 - TRANSPORTE    TCP / UDP (portas)              │
│  3 - REDE          IP, roteamento                  │
│  2 - ENLACE        MAC, switches, frames           │
│  1 - FÍSICA        Cabos, sinais elétricos/ópticos │
└────────────────────────────────────────────────────┘`,
      tip: 'Mnemônico para lembrar de cima para baixo: "All People Seem To Need Data Processing" (Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física).',
    },
    {
      title: 'Camadas mais cobradas em provas',
      content: `As camadas mais importantes para Engenharia de Software são:

• Camada 7 (Aplicação): onde seus programas vivem — HTTP, WebSocket, gRPC
• Camada 4 (Transporte): TCP garante entrega ordenada; UDP é mais rápido mas sem garantia
• Camada 3 (Rede): endereços IP e roteamento entre redes diferentes
• Camada 2 (Enlace): endereços MAC, comunicação dentro da mesma rede local

Quando um pacote sai do seu computador, ele "desce" as 7 camadas adicionando cabeçalhos. Ao chegar no destino, ele "sobe" as camadas removendo cada cabeçalho.`,
    },
  ],
  quiz: [
    {
      question: 'Em qual camada do modelo OSI o protocolo IP opera?',
      options: ['Camada 2 - Enlace', 'Camada 3 - Rede', 'Camada 4 - Transporte', 'Camada 7 - Aplicação'],
      correctIndex: 1,
      explanation: 'O protocolo IP (Internet Protocol) opera na Camada 3 (Rede), responsável pelo endereçamento lógico e roteamento de pacotes entre redes.',
    },
    {
      question: 'Qual protocolo da Camada de Transporte garante entrega ordenada e sem perdas?',
      options: ['UDP', 'IP', 'TCP', 'HTTP'],
      correctIndex: 2,
      explanation: 'O TCP (Transmission Control Protocol) é orientado a conexão e garante entrega confiável e ordenada. O UDP é mais rápido mas não oferece essas garantias.',
    },
    {
      question: 'O que o Modelo OSI representa?',
      options: [
        'Um protocolo de comunicação usado na internet',
        'Um padrão de referência que divide a comunicação em 7 camadas',
        'O sistema operacional dos roteadores',
        'Um algoritmo de criptografia',
      ],
      correctIndex: 1,
      explanation: 'O Modelo OSI é um modelo de referência conceitual — não um protocolo em si. Ele organiza a comunicação em rede em 7 camadas para facilitar entendimento, desenvolvimento e diagnóstico.',
    },
  ],
};
