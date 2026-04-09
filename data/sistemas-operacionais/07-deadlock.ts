import type { Topic } from '@/lib/types';

export const deadlock: Topic = {
  slug: '07-deadlock',
  number: 7,
  title: 'Deadlock',
  emoji: '🔒',
  shortDescription: 'Quando processos se bloqueiam mutuamente e o sistema trava.',
  sections: [
    {
      title: 'O que é Deadlock?',
      content: `Deadlock (abraço mortal) ocorre quando um conjunto de processos está bloqueado, cada um esperando um recurso que está com outro processo do conjunto — e nenhum pode prosseguir.

Exemplo clássico:
  Processo A: segura o arquivo X, precisa do arquivo Y
  Processo B: segura o arquivo Y, precisa do arquivo X
  → Ambos esperam para sempre

No mundo real, ocorre com:
• Locks em banco de dados (transações concorrentes)
• Semáforos e mutexes em sistemas concorrentes
• Comunicação entre processos (cada um espera o outro enviar)`,
    },
    {
      title: 'As 4 Condições de Coffman',
      content: `Deadlock só ocorre quando TODAS as 4 condições estão presentes simultaneamente:

1. EXCLUSÃO MÚTUA:
   Pelo menos um recurso é não-compartilhável — só um processo por vez pode usá-lo.

2. POSSE E ESPERA (Hold and Wait):
   Um processo segura ao menos um recurso enquanto espera por outros.

3. NÃO-PREEMPÇÃO:
   Recursos não podem ser forçosamente removidos de um processo — só ele pode liberá-los.

4. ESPERA CIRCULAR:
   Existe um ciclo: P1 espera por P2, P2 espera por P3, ..., Pn espera por P1.

Eliminar QUALQUER UMA dessas condições previne deadlock.`,
      tip: 'Em bancos de dados, deadlocks são detectados automaticamente e o SGBD aborta uma das transações (a "vítima") para quebrar o ciclo.',
    },
    {
      title: 'Prevenção, detecção e recuperação',
      content: `PREVENÇÃO (eliminar uma condição de Coffman):
• Ordenar recursos: todos os processos sempre adquirem locks na mesma ordem
  → Elimina espera circular
• Adquirir todos os recursos de uma vez (two-phase locking)
  → Elimina posse e espera
• Permitir preempção: se um processo precisa de um recurso ocupado, force a liberação
  → Elimina não-preempção

DETECÇÃO + RECUPERAÇÃO:
• Permitir deadlocks, mas detectar ciclos no grafo de espera
• Recuperação: encerrar um ou mais processos ("vítima"), liberar seus recursos
• Bancos de dados usam esta abordagem

EVITAÇÃO (Banker's Algorithm):
• Antes de alocar um recurso, verificar se o sistema ainda pode atingir um "estado seguro"
• Caro computacionalmente — raro em produção

OSTRICH ALGORITHM ("algoritmo do avestruz"):
• Ignorar o problema — se deadlock é raro, reiniciar manualmente quando ocorrer
• Ironicamente, é o que a maioria dos SOs usa para deadlocks raros`,
      codeExample: {
        language: 'python',
        code: `import threading

lock_a = threading.Lock()
lock_b = threading.Lock()

# DEADLOCK: thread 1 pega A depois B; thread 2 pega B depois A
def thread1():
    with lock_a:
        with lock_b:           # pode travar aqui
            print("Thread 1 terminou")

def thread2():
    with lock_b:
        with lock_a:           # pode travar aqui
            print("Thread 2 terminou")

# SOLUÇÃO: sempre adquirir na mesma ordem
def thread1_seguro():
    with lock_a:               # sempre A antes de B
        with lock_b:
            print("Thread 1 segura")

def thread2_seguro():
    with lock_a:               # mesma ordem!
        with lock_b:
            print("Thread 2 segura")`,
        explanation: 'Adquirir locks sempre na mesma ordem global elimina a condição de espera circular — a causa mais comum de deadlock em código.',
      },
    },
  ],
  quiz: [
    {
      question: 'Quais são as 4 condições necessárias para um deadlock ocorrer?',
      options: [
        'Prioridade, starvation, preempção e espera',
        'Exclusão mútua, posse e espera, não-preempção e espera circular',
        'Race condition, mutex, semáforo e monitor',
        'Fork, exec, wait e exit',
      ],
      correctIndex: 1,
      explanation: 'As 4 condições de Coffman: (1) Exclusão mútua, (2) Posse e espera, (3) Não-preempção, (4) Espera circular. Todas devem estar presentes simultaneamente. Eliminar qualquer uma previne deadlock.',
    },
    {
      question: 'Qual estratégia simples previne deadlock em código com múltiplos locks?',
      options: [
        'Usar um único lock global para todo o programa',
        'Nunca usar mais de dois locks ao mesmo tempo',
        'Sempre adquirir locks na mesma ordem global em todas as threads',
        'Usar try-except para capturar erros de deadlock',
      ],
      correctIndex: 2,
      explanation: 'Adquirir locks sempre na mesma ordem global elimina a condição de espera circular. Se todos os processos/threads sempre pegam lock_a antes de lock_b, nunca haverá ciclo de espera.',
    },
    {
      question: 'Como bancos de dados normalmente lidam com deadlocks?',
      options: [
        'Previnem completamente usando o Algoritmo do Banqueiro',
        'Ignoram deadlocks e esperam que o usuário reinicie',
        'Detectam ciclos no grafo de espera e abortam uma transação "vítima" para quebrar o ciclo',
        'Limitam cada transação a usar no máximo 2 tabelas',
      ],
      correctIndex: 2,
      explanation: 'SGBDs como PostgreSQL e MySQL detectam deadlocks automaticamente (ciclo no grafo de espera de transações) e abortam uma das transações envolvidas (a "vítima"), retornando um erro que a aplicação pode tratar e tentar novamente.',
    },
  ],
};
