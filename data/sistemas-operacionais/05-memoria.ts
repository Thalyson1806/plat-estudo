import type { Topic } from '@/lib/types';

export const memoria: Topic = {
  slug: '05-gerenciamento-memoria',
  number: 5,
  title: 'Gerenciamento de Memória',
  emoji: '🧠',
  shortDescription: 'Como o SO aloca, protege e otimiza o uso da RAM.',
  sections: [
    {
      title: 'Memória virtual',
      content: `Cada processo acredita que tem acesso a um espaço de endereçamento enorme e exclusivo — isso é memória virtual.

Na realidade:
• A memória virtual é mapeada para memória física (RAM) pelo SO
• Esse mapeamento é feito pela MMU (Memory Management Unit) do hardware
• Cada processo tem seu próprio mapeamento → isolamento total

Vantagens da memória virtual:
• Isolamento: um processo não acessa memória de outro
• Mais memória que a física: partes não usadas ficam no disco (swap)
• Carregamento sob demanda: páginas carregadas só quando necessárias
• Compartilhamento: bibliotecas como libc mapeadas em múltiplos processos

Layout de memória de um processo:
┌─────────────┐ endereço alto
│    Stack    │ ← variáveis locais, chamadas de função (cresce para baixo)
│      ↓      │
│   (vazio)   │
│      ↑      │
│    Heap     │ ← alocação dinâmica (malloc, new)
│    BSS      │ ← variáveis globais não inicializadas
│    Data     │ ← variáveis globais inicializadas
│    Code     │ ← código executável (read-only)
└─────────────┘ endereço baixo (0x0)`,
    },
    {
      title: 'Paginação e Segmentação',
      content: `PAGINAÇÃO:
• Divide a memória virtual e física em blocos de tamanho fixo (páginas, ex: 4KB)
• Tabela de páginas mapeia página virtual → frame físico
• Page Fault: processo acessa uma página não carregada → SO carrega do disco
• TLB (Translation Lookaside Buffer): cache de traduções de endereço → muito mais rápido

SEGMENTAÇÃO:
• Divide a memória em segmentos de tamanho variável (código, stack, heap, dados)
• Cada segmento tem base e limite
• Mais intuitivo, mas fragmentação externa é um problema

Sistemas modernos usam paginação (às vezes com segmentação superficial).

Swap:
• Quando a RAM está cheia, páginas pouco usadas são movidas para o disco
• Swap in: trazer página do disco para RAM
• Swap out: mover página da RAM para o disco
• Muito mais lento que RAM — swap excessivo = sistema lento`,
      tip: 'Memory leak: quando um programa aloca memória dinamicamente mas nunca libera. Em C/C++ é manual (free/delete). Em linguagens com GC (Python, Java, JS), o garbage collector faz isso.',
    },
    {
      title: 'Estratégias de substituição de página',
      content: `Quando há page fault e a RAM está cheia, o SO precisa escolher qual página remover:

OPT (Ótimo):
• Remove a página que não será usada pelo maior tempo
• Impossível na prática (precisaria ver o futuro) — usado como benchmark

LRU (Least Recently Used):
• Remove a página não usada há mais tempo
• Boa aproximação do OPT, mas cara de implementar com precisão

Clock (aproximação do LRU):
• Bit de referência por página; mão do relógio varre e reseta bits
• Muito mais eficiente que LRU puro — usado por Linux

FIFO (First-In, First-Out):
• Remove a página mais antiga na memória
• Simples mas ineficiente — pode remover páginas muito usadas

Anomalia de Belady:
• Com FIFO, adicionar mais RAM pode aumentar o número de page faults!`,
    },
  ],
  quiz: [
    {
      question: 'O que é memória virtual?',
      options: [
        'Memória que existe apenas durante a execução de um programa e é apagada ao fechar',
        'Uma abstração que dá a cada processo a ilusão de ter um espaço de endereçamento exclusivo e grande',
        'A memória do processador (cache L1/L2/L3)',
        'O espaço em disco usado como extensão da RAM',
      ],
      correctIndex: 1,
      explanation: 'Memória virtual é uma abstração criada pelo SO + MMU. Cada processo vê um espaço de endereçamento exclusivo e contínuo, mas na realidade ele é mapeado para frames físicos de RAM (e possivelmente swap no disco).',
    },
    {
      question: 'O que acontece durante um Page Fault?',
      options: [
        'O processo é terminado por erro de memória',
        'O SO detecta que uma página acessada não está na RAM e a carrega do disco',
        'A CPU trava e reinicia o sistema',
        'O processo perde sua prioridade de escalonamento',
      ],
      correctIndex: 1,
      explanation: 'Page Fault é uma interrupção: o processo tentou acessar uma página virtual que não está mapeada na RAM. O SO pausa o processo, carrega a página do disco para a RAM, atualiza a tabela de páginas e retoma o processo.',
    },
    {
      question: 'O que é swap em gerenciamento de memória?',
      options: [
        'O processo de copiar dados entre dois registradores da CPU',
        'A troca de processos entre núcleos de CPU',
        'A área em disco usada para armazenar páginas quando a RAM está cheia',
        'Uma técnica de criptografia de memória',
      ],
      correctIndex: 2,
      explanation: 'Swap é uma área no disco (partição ou arquivo) que o SO usa para mover páginas pouco usadas quando a RAM está cheia. É muito mais lento que RAM — swap excessivo causa degradação severa de desempenho.',
    },
  ],
};
