import type { Topic } from '@/lib/types';

export const oQueESo: Topic = {
  slug: '01-o-que-e-so',
  number: 1,
  title: 'O que é um Sistema Operacional',
  emoji: '💻',
  shortDescription: 'A camada de software que gerencia hardware e permite rodar programas.',
  sections: [
    {
      title: 'Definição e papel do SO',
      content: `Um Sistema Operacional (SO) é o software que fica entre o hardware e os programas do usuário. Ele é o intermediário que:

• Gerencia recursos: CPU, memória, disco, dispositivos de I/O
• Fornece abstrações: processos, arquivos, sockets
• Garante isolamento: impede que um programa afete outro
• Interface com o usuário: shell, GUI

Sem SO, cada programa precisaria controlar o hardware diretamente — caótico e inviável.

Exemplos de SO:
• Desktop: Windows 11, macOS 15, Ubuntu Linux
• Servidor: Linux (Debian, RHEL, Alpine)
• Mobile: Android (Linux kernel), iOS (XNU kernel)
• Embarcado: FreeRTOS, VxWorks`,
      tip: 'O Linux domina servidores, nuvem (AWS, GCP, Azure) e dispositivos Android. Saber comandos Linux básicos é essencial para qualquer engenheiro de software.',
    },
    {
      title: 'Modos de operação: Kernel e Usuário',
      content: `O processador opera em dois modos:

MODO KERNEL (privilegiado):
• Acesso total ao hardware
• Executa o próprio SO
• Pode executar qualquer instrução de CPU

MODO USUÁRIO (restrito):
• Acesso limitado — não pode falar com hardware diretamente
• Onde seus programas rodam
• Para acessar hardware, faz uma SYSCALL (system call)

System Calls são a ponte entre os dois modos:
  Programa → syscall → Kernel → Hardware → resposta → Programa

Exemplos de syscalls:
  open(), read(), write() → arquivos
  fork(), exec() → processos
  socket(), connect() → rede
  mmap(), brk() → memória`,
      codeExample: {
        language: 'c',
        code: `// Sem SO: você controlaria hardware diretamente (impossível em modo usuário)
// Com SO: usa syscalls para operações privilegiadas

#include <unistd.h>
#include <fcntl.h>

int main() {
    // Isso internamente faz uma syscall "open" para o kernel
    int fd = open("arquivo.txt", O_RDONLY);

    char buf[100];
    // Syscall "read"
    read(fd, buf, 100);

    // Syscall "write" (fd=1 é stdout)
    write(1, buf, 100);

    // Syscall "close"
    close(fd);
    return 0;
}`,
        explanation: 'Funções como open() e read() em C são wrappers de syscalls. Em Python, o mesmo acontece quando você usa open() — o SO faz o trabalho real.',
      },
    },
    {
      title: 'Tipos de SO',
      content: `Monolítico:
• Todo o SO roda em modo kernel como um bloco único
• Rápido, mas instável — bug em qualquer parte derruba tudo
• Exemplos: Linux (apesar do nome, é monolítico com módulos)

Microkernel:
• Apenas o mínimo no kernel; resto em modo usuário
• Mais estável e seguro, mas mais lento (comunicação entre processos)
• Exemplos: Minix, seL4, QNX

Híbrido:
• Mistura dos dois — kernel pequeno mas com alguns serviços privilegiados
• Exemplos: Windows NT, macOS XNU

Exokernel / Unikernel:
• Extremamente minimalistas
• Usados em pesquisa ou VMs especializadas`,
    },
  ],
  quiz: [
    {
      question: 'Qual é a função principal de um Sistema Operacional?',
      options: [
        'Executar aplicativos de forma mais rápida',
        'Gerenciar recursos de hardware e fornecer abstrações para programas',
        'Proteger o computador contra vírus',
        'Controlar o acesso à internet',
      ],
      correctIndex: 1,
      explanation: 'O SO gerencia CPU, memória, disco e dispositivos, oferecendo abstrações (processos, arquivos, sockets) para que programas possam rodar sem precisar controlar o hardware diretamente.',
    },
    {
      question: 'O que é uma System Call (syscall)?',
      options: [
        'Uma função de biblioteca que calcula algoritmos complexos',
        'Um vírus que invade o kernel do sistema operacional',
        'A interface pela qual programas em modo usuário requisitam serviços do kernel',
        'Um processo especial que só o administrador pode executar',
      ],
      correctIndex: 2,
      explanation: 'Syscalls são a ponte entre modo usuário (onde programas rodam) e modo kernel (onde o SO tem acesso total ao hardware). open(), read(), write(), fork() são exemplos de syscalls.',
    },
    {
      question: 'Qual a diferença entre SO monolítico e microkernel?',
      options: [
        'Monolítico é mais lento e microkernel é mais rápido',
        'Monolítico roda todo o SO em modo kernel; microkernel mantém apenas o mínimo no kernel',
        'Microkernel é usado apenas em sistemas embarcados',
        'Monolítico não suporta múltiplos processos simultaneamente',
      ],
      correctIndex: 1,
      explanation: 'Monolítico (como Linux) coloca todo o SO no kernel — rápido, mas um bug pode derrubar tudo. Microkernel mantém apenas o mínimo privilegiado, com mais estabilidade mas com custo de comunicação entre processos.',
    },
  ],
};
