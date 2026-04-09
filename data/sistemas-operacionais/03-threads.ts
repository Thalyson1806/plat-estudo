import type { Topic } from '@/lib/types';

export const threads: Topic = {
  slug: '03-threads-concorrencia',
  number: 3,
  title: 'Threads e Concorrência',
  emoji: '🧵',
  shortDescription: 'Execução simultânea dentro de um processo e os problemas que surgem.',
  sections: [
    {
      title: 'Threads vs Processos',
      content: `Uma thread (linha de execução) é a unidade básica de execução da CPU. Um processo pode ter múltiplas threads.

Processo = container com recursos (memória, arquivos)
Thread = linha de execução dentro do processo

Threads do mesmo processo COMPARTILHAM:
• Espaço de endereçamento (memória heap, código)
• Descritores de arquivo (sockets, arquivos abertos)
• Variáveis globais

Cada thread tem o SEU PRÓPRIO:
• Stack (pilha de chamadas)
• Registradores da CPU
• Program counter

Vantagem das threads sobre processos:
• Comunicação mais fácil (memória compartilhada)
• Criação muito mais rápida (menos overhead)
• Melhor aproveitamento de CPUs multi-core`,
      tip: 'Threads são mais leves que processos, mas compartilhar memória exige cuidado: o que uma thread muda, todas as outras veem.',
    },
    {
      title: 'Problemas de concorrência',
      content: `Quando múltiplas threads acessam a mesma memória, surgem problemas:

RACE CONDITION (condição de corrida):
O resultado depende da ordem de execução das threads.
  Thread 1: lê saldo (100)
  Thread 2: lê saldo (100)
  Thread 1: debita 50, escreve 50
  Thread 2: debita 30, escreve 70 ← ERRADO! deveria ser 20

DEADLOCK:
Duas threads se bloqueiam mutuamente esperando recursos:
  Thread A: segura lock X, espera lock Y
  Thread B: segura lock Y, espera lock X
  → Ambas esperam para sempre

STARVATION:
Uma thread nunca recebe CPU/recursos porque outras têm prioridade maior.

Soluções:
• Mutex (lock): garante acesso exclusivo a um recurso por vez
• Semáforo: controla acesso de N threads simultaneamente
• Monitor: abstração de alto nível (Java synchronized, Python Lock)
• Operações atômicas: leitura+escrita indivisível (compare-and-swap)`,
    },
    {
      title: 'Paralelismo vs Concorrência',
      content: `Termos frequentemente confundidos:

CONCORRÊNCIA:
• Múltiplas tarefas em progresso ao mesmo tempo
• Pode ser em uma única CPU (interleaving)
• Foco: estrutura do programa

PARALELISMO:
• Múltiplas tarefas executando literalmente ao mesmo tempo
• Requer múltiplos núcleos de CPU
• Foco: performance

Um programa pode ser concorrente sem ser paralelo (single-core com threads).
E pode ser paralelo sem ser concorrente (múltiplas CPUs com código sequencial).

GIL no Python:
Python tem uma trava global (GIL) que impede duas threads de executar bytecode Python simultaneamente. Para paralelismo real em Python: use multiprocessing ou async (I/O bound) em vez de threads.`,
      codeExample: {
        language: 'python',
        code: `import threading

saldo = 100
lock = threading.Lock()

def debitar(valor):
    global saldo
    # Sem lock → race condition!
    # Com lock → acesso exclusivo
    with lock:
        atual = saldo
        saldo = atual - valor
        print(f"Debitou {valor}, saldo: {saldo}")

t1 = threading.Thread(target=debitar, args=(50,))
t2 = threading.Thread(target=debitar, args=(30,))

t1.start()
t2.start()
t1.join()
t2.join()

print(f"Saldo final: {saldo}")  # deve ser 20`,
        explanation: 'O lock garante que apenas uma thread por vez executa o bloco crítico. Sem ele, o resultado seria imprevisível.',
      },
    },
  ],
  quiz: [
    {
      question: 'O que threads de um mesmo processo compartilham?',
      options: [
        'Stack e registradores, mas não a memória heap',
        'Nada — cada thread é completamente isolada',
        'Espaço de endereçamento (heap, código) e descritores de arquivo',
        'Apenas o PID do processo pai',
      ],
      correctIndex: 2,
      explanation: 'Threads do mesmo processo compartilham memória (heap, código, variáveis globais) e descritores de arquivo. Cada thread tem sua própria stack e registradores.',
    },
    {
      question: 'O que é uma Race Condition?',
      options: [
        'Quando duas threads correm para terminar uma tarefa mais rápido',
        'Quando o resultado de uma operação depende da ordem imprevisível de execução de threads',
        'Quando uma thread aguarda indefinidamente por um recurso',
        'Quando duas threads entram em deadlock',
      ],
      correctIndex: 1,
      explanation: 'Race condition ocorre quando múltiplas threads acessam e modificam dados compartilhados sem sincronização, e o resultado depende da ordem de execução — que é não-determinística.',
    },
    {
      question: 'Qual é a diferença entre concorrência e paralelismo?',
      options: [
        'São sinônimos — significam a mesma coisa',
        'Concorrência requer múltiplos núcleos; paralelismo funciona em um único núcleo',
        'Concorrência é sobre múltiplas tarefas em progresso (pode ser em 1 core); paralelismo é execução literal simultânea em múltiplos cores',
        'Paralelismo é mais lento pois sincroniza os núcleos',
      ],
      correctIndex: 2,
      explanation: 'Concorrência = estrutura (múltiplas tarefas gerenciadas, possível em 1 core via time-slicing). Paralelismo = execução física simultânea em múltiplos cores. Um programa pode ser concorrente sem ser paralelo.',
    },
  ],
};
