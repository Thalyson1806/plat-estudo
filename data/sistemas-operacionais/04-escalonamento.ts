import type { Topic } from '@/lib/types';

export const escalonamento: Topic = {
  slug: '04-escalonamento',
  number: 4,
  title: 'Escalonamento de CPU',
  emoji: '📅',
  shortDescription: 'Como o SO decide qual processo recebe a CPU a cada momento.',
  sections: [
    {
      title: 'O problema do escalonamento',
      content: `Em um sistema com vários processos e apenas alguns núcleos de CPU, o SO precisa decidir qual processo executa a cada instante. Esse trabalho é do escalonador (scheduler).

Objetivos que o escalonador tenta equilibrar:
• Maximizar utilização da CPU
• Maximizar throughput (processos finalizados por unidade de tempo)
• Minimizar tempo de espera (quanto um processo fica na fila)
• Minimizar tempo de resposta (latência para processos interativos)
• Garantir fairness (nenhum processo morre de fome/starvation)

Esses objetivos frequentemente conflitam entre si.

Tipos de processo:
• CPU-bound: passa mais tempo calculando (compilador, renderização)
• I/O-bound: passa mais tempo esperando I/O (servidor web, banco de dados)`,
    },
    {
      title: 'Algoritmos de escalonamento',
      content: `FCFS (First-Come, First-Served):
• Primeiro a chegar, primeiro a ser atendido
• Simples, mas pode causar convoy effect (processo longo bloqueia todos)

SJF (Shortest Job First):
• Executa o processo com menor burst de CPU
• Ótimo para throughput, mas causa starvation de processos longos
• Requer saber o tempo de execução antecipado (difícil na prática)

Round Robin (RR):
• Cada processo recebe um quantum de tempo (ex: 10ms)
• Ao esgotar o quantum, vai para o fim da fila
• Excelente para sistemas interativos
• O sistema Linux usa uma variação deste

Prioridade:
• Cada processo tem uma prioridade; CPU vai para o de maior prioridade
• Risco: starvation de processos de baixa prioridade
• Solução: aging — aumentar prioridade conforme o tempo de espera

Multilevel Queue:
• Diferentes filas para diferentes tipos de processo
• Processos interativos em fila de alta prioridade
• Processos em lote em fila de baixa prioridade`,
      tip: 'O Linux usa CFS (Completely Fair Scheduler) — cada processo recebe uma fração justa do tempo de CPU proporcional à sua prioridade, usando uma árvore rubro-negra para eficiência.',
    },
    {
      title: 'Preemptivo vs Não-preemptivo',
      content: `Escalonamento Preemptivo:
• O SO pode interromper um processo a qualquer momento
• Necessário para sistemas de tempo real e interativos
• Mais complexo — requer sincronização cuidadosa
• Usado por: Linux, Windows, macOS

Escalonamento Não-preemptivo (cooperativo):
• O processo mantém a CPU até terminar ou bloquear voluntariamente
• Simples, sem necessidade de sincronização por interrupção
• Risco: processo egoísta pode monopolizar a CPU
• Usado por: sistemas embarcados simples, versões antigas do Windows

Métricas importantes:
  Tempo de chegada: quando o processo foi submetido
  Burst time: tempo de CPU que o processo precisa
  Tempo de conclusão: quando terminou
  Turnaround time: conclusão - chegada
  Tempo de espera: turnaround - burst
  Tempo de resposta: primeira vez que recebeu CPU - chegada`,
    },
  ],
  quiz: [
    {
      question: 'O que é o quantum no algoritmo Round Robin?',
      options: [
        'A memória máxima que um processo pode usar',
        'O número máximo de processos que podem rodar simultaneamente',
        'O tempo máximo que um processo pode ocupar a CPU antes de ser interrompido',
        'A prioridade inicial de um processo recém-criado',
      ],
      correctIndex: 2,
      explanation: 'No Round Robin, cada processo recebe um quantum (fatia de tempo, ex: 10ms). Ao esgotar o quantum, o processo vai para o fim da fila e o próximo processo entra. Isso garante que nenhum processo monopolize a CPU.',
    },
    {
      question: 'O que é starvation em escalonamento?',
      options: [
        'Quando a CPU fica ociosa por falta de processos',
        'Quando um processo nunca recebe CPU porque outros de maior prioridade sempre chegam primeiro',
        'Quando um processo usa toda a memória disponível',
        'Quando dois processos entram em deadlock',
      ],
      correctIndex: 1,
      explanation: 'Starvation ocorre quando um processo de baixa prioridade nunca recebe a CPU porque sempre chegam processos de maior prioridade. A solução é aging: aumentar a prioridade conforme o tempo de espera.',
    },
    {
      question: 'Qual a diferença entre escalonamento preemptivo e não-preemptivo?',
      options: [
        'Preemptivo é mais lento pois verifica permissões extras',
        'No preemptivo, o SO pode interromper um processo a qualquer momento; no não-preemptivo, o processo mantém a CPU até voluntariamente ceder',
        'Não-preemptivo é usado apenas em sistemas multicore',
        'Preemptivo só funciona com processos de mesma prioridade',
      ],
      correctIndex: 1,
      explanation: 'Preemptivo: o SO pode retirar a CPU de um processo a qualquer momento (necessário para responsividade). Não-preemptivo: o processo só perde a CPU quando termina ou bloqueia voluntariamente (mais simples, mas arriscado).',
    },
  ],
};
