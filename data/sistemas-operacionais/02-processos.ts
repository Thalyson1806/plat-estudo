import type { Topic } from '@/lib/types';

export const processos: Topic = {
  slug: '02-processos',
  number: 2,
  title: 'Processos',
  emoji: '⚙️',
  shortDescription: 'Um programa em execução — criação, estados e ciclo de vida.',
  sections: [
    {
      title: 'O que é um processo?',
      content: `Um processo é um programa em execução. Quando você abre o Chrome, o SO cria um processo. Cada processo tem:

• PID (Process ID): número único de identificação
• Espaço de endereçamento: memória exclusiva (código, dados, heap, stack)
• Estado atual da CPU: registradores, program counter
• Descritores de arquivo: arquivos abertos, sockets
• Informações de controle: prioridade, usuário dono, processo pai

Diferença entre programa e processo:
  Programa = arquivo executável em disco (estático)
  Processo = instância do programa rodando (dinâmico, tem estado)

Você pode ter vários processos rodando o mesmo programa.`,
    },
    {
      title: 'Estados de um processo',
      content: `Um processo transita entre estados ao longo da sua vida:

    ┌──────────┐     admitido     ┌──────────┐
    │  NOVO    │ ──────────────→  │  PRONTO  │
    └──────────┘                  └────┬─────┘
                                       │  escalonado
                                  ┌────▼─────┐
                              ←── │ EXECUÇÃO │ ───→  (termina)  ┌──────────┐
                     interrompido └────┬─────┘                   │  MORTO   │
                                       │  aguarda I/O            └──────────┘
                                  ┌────▼─────┐
                                  │ BLOQUEADO│ ──→ (I/O pronto) → PRONTO
                                  └──────────┘

• NOVO: processo sendo criado
• PRONTO: na fila, esperando CPU
• EXECUÇÃO: rodando na CPU
• BLOQUEADO: aguardando evento (I/O, timer, sinal)
• MORTO: terminou ou foi encerrado`,
      tip: 'Processos passam mais tempo em BLOQUEADO (esperando I/O) do que em EXECUÇÃO. Por isso, o escalonador pode colocar outro processo na CPU enquanto um espera o disco.',
    },
    {
      title: 'Criação e comunicação entre processos',
      content: `No Unix/Linux, processos são criados com fork() + exec():

• fork() cria uma cópia exata do processo atual (processo filho)
• exec() substitui o processo pelo novo programa

Comunicação entre processos (IPC):
• Pipe: canal unidirecional (| no shell)
• Socket: comunicação em rede ou local
• Memória compartilhada: mais rápido, mais cuidado com sincronização
• Sinal: notificação assíncrona (SIGKILL, SIGTERM, SIGINT)`,
      codeExample: {
        language: 'bash',
        code: `# Listar processos com detalhes
ps aux

# Árvore de processos (quem criou quem)
pstree -p

# Matar processo pelo PID
kill 1234

# Matar pelo nome
pkill firefox

# Enviar sinal SIGTERM (encerramento gracioso)
kill -SIGTERM 1234

# Ver uso de CPU e memória em tempo real
top
htop`,
        explanation: 'Esses comandos são essenciais para monitorar e controlar processos em um servidor Linux.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual a diferença entre um programa e um processo?',
      options: [
        'São a mesma coisa — processo é apenas outro nome para programa',
        'Programa é o código em execução; processo é o arquivo em disco',
        'Programa é o arquivo executável em disco; processo é uma instância do programa em execução',
        'Processo só existe em sistemas operacionais Unix',
      ],
      correctIndex: 2,
      explanation: 'Programa é estático (arquivo no disco). Processo é dinâmico — é uma instância do programa rodando, com memória, PID e estado próprios. Você pode ter vários processos do mesmo programa.',
    },
    {
      question: 'Por que um processo entra no estado BLOQUEADO?',
      options: [
        'Porque o SO decidiu remover da CPU por excesso de uso',
        'Porque está aguardando um evento externo, como conclusão de operação de I/O',
        'Porque outro processo de maior prioridade foi criado',
        'Porque o processo tentou acessar memória inválida',
      ],
      correctIndex: 1,
      explanation: 'Um processo bloqueia quando precisa esperar algo externo — uma leitura de disco, entrada do usuário, resposta de rede. Enquanto bloqueia, a CPU pode ser usada por outro processo.',
    },
    {
      question: 'O que o comando fork() faz em sistemas Unix?',
      options: [
        'Encerra o processo atual e inicia um novo',
        'Cria uma cópia exata do processo atual, gerando um processo filho',
        'Carrega um novo programa na memória',
        'Aloca mais memória para o processo atual',
      ],
      correctIndex: 1,
      explanation: 'fork() duplica o processo: o processo pai continua executando e um processo filho é criado como cópia. Normalmente o filho chama exec() logo após para substituir seu conteúdo pelo novo programa.',
    },
  ],
};
