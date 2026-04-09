import type { Topic } from '@/lib/types';

export const entradaSaida: Topic = {
  slug: '08-entrada-saida',
  number: 8,
  title: 'Entrada e Saída (I/O)',
  emoji: '🔌',
  shortDescription: 'Como o SO gerencia comunicação com dispositivos e operações de I/O.',
  sections: [
    {
      title: 'O problema de I/O',
      content: `I/O (Input/Output) é qualquer comunicação com o mundo externo ao processador: disco, rede, teclado, mouse, GPU, USB.

O grande problema: I/O é ordens de magnitude mais lento que a CPU.

Tempos aproximados (comparação):
  Registrador de CPU:        ~0.3 ns
  Cache L1:                  ~1 ns
  RAM (DRAM):                ~100 ns
  SSD NVMe (leitura):        ~0.1 ms  (100.000x mais lento que RAM)
  HDD (leitura, seek):       ~10 ms
  Rede local (LAN):          ~0.1 ms
  Internet (100ms de ping):  ~100 ms

Conclusão: se um programa fica bloqueado esperando I/O, a CPU fica parada.
O SO resolve isso com diferentes técnicas de I/O.`,
    },
    {
      title: 'Tipos de I/O',
      content: `I/O SÍNCRONO (Bloqueante):
• O processo espera a operação completar antes de continuar
• Simples de programar, mas desperdiça CPU
• Exemplo: read() padrão em C/Python

I/O ASSÍNCRONO (Não-bloqueante):
• O processo inicia a operação e continua rodando
• Recebe notificação quando o I/O completa (callback, evento)
• Mais complexo, mas muito mais eficiente
• Exemplos: async/await em JavaScript/Python, aio no Linux

I/O MULTIPLEXADO (select/poll/epoll):
• Um único processo/thread monitorar múltiplos fds simultaneamente
• Usado em servidores de alta performance (Nginx, Redis, Node.js)
• epoll (Linux) é mais eficiente que select para muitas conexões

DMA (Direct Memory Access):
• Hardware dedicado transfere dados entre dispositivo e RAM sem ocupar a CPU
• CPU só é notificada (interrupção) quando a transferência termina
• Usado em discos, placas de rede, GPU`,
      tip: 'Node.js usa I/O assíncrono + epoll por baixo dos panos. É por isso que um único processo Node consegue lidar com milhares de conexões simultâneas sem criar uma thread por conexão.',
    },
    {
      title: 'Escalonamento de disco',
      content: `HDDs têm um braço mecânico que precisa se mover até a trilha certa (seek). Minimizar o movimento do braço maximiza o throughput.

Algoritmos de escalonamento de disco:

FCFS: atende na ordem de chegada. Simples mas cabeçote pode se mover muito.

SSTF (Shortest Seek Time First): vai para o pedido mais próximo. Eficiente mas causa starvation de pedidos distantes.

SCAN (elevador): vai em uma direção, atendendo pedidos, inverte ao chegar no fim.
  → Movimento previsível, sem starvation

C-SCAN (Circular SCAN): sempre vai em um sentido, volta ao início ao chegar no fim.
  → Distribuição mais uniforme de tempo de espera

SSDs não têm partes mecânicas, então escalonamento de disco é irrelevante para eles. O gargalo em SSD é a fila de comandos NVMe.`,
      codeExample: {
        language: 'python',
        code: `import asyncio

# I/O SÍNCRONO: bloqueia a execução
def buscar_sincrono(url):
    import urllib.request
    return urllib.request.urlopen(url).read()

# I/O ASSÍNCRONO: libera a event loop enquanto espera
async def buscar_assíncrono(session, url):
    async with session.get(url) as response:
        return await response.text()

# Buscar 3 URLs em paralelo (não sequencial)
async def main():
    import aiohttp
    urls = ['http://a.com', 'http://b.com', 'http://c.com']
    async with aiohttp.ClientSession() as session:
        tasks = [buscar_assíncrono(session, u) for u in urls]
        resultados = await asyncio.gather(*tasks)
    return resultados`,
        explanation: 'Com I/O assíncrono, as 3 requisições de rede acontecem "ao mesmo tempo" — enquanto uma aguarda resposta, as outras já foram disparadas. Muito mais rápido que sequencial.',
      },
    },
  ],
  quiz: [
    {
      question: 'O que é I/O bloqueante?',
      options: [
        'I/O que bloqueia outros dispositivos de acessar o disco',
        'Operação em que o processo fica parado aguardando o I/O completar antes de continuar',
        'Uma técnica de I/O que melhora a performance usando buffer',
        'I/O que ocorre em modo kernel sem a participação do processo',
      ],
      correctIndex: 1,
      explanation: 'No I/O bloqueante (síncrono), o processo chama read() e fica suspenso até a operação terminar. A CPU pode executar outros processos nesse tempo (o SO escalona outro processo), mas o processo chamador fica parado.',
    },
    {
      question: 'O que é DMA (Direct Memory Access)?',
      options: [
        'Um tipo de memória de acesso direto no processador (cache)',
        'Hardware dedicado que transfere dados entre dispositivo e RAM sem ocupar a CPU',
        'Uma técnica de compressão de dados em disco',
        'Um protocolo de comunicação entre processos',
      ],
      correctIndex: 1,
      explanation: 'DMA permite que dispositivos (disco, placa de rede) transferam dados diretamente para a RAM sem ocupar a CPU. A CPU só é notificada via interrupção quando a transferência termina, ficando livre para outras tarefas durante o processo.',
    },
    {
      question: 'Por que algoritmos de escalonamento de disco são irrelevantes para SSDs?',
      options: [
        'SSDs são muito rápidos e nunca criam filas de requisições',
        'SSDs não são gerenciados pelo sistema operacional',
        'SSDs não têm partes mecânicas, então não há custo de seek — não há movimento a minimizar',
        'SSDs usam seu próprio algoritmo de escalonamento internamente',
      ],
      correctIndex: 2,
      explanation: 'Algoritmos como SCAN minimizam o movimento mecânico do braço leitor do HDD. SSDs são eletrônicos — acessar qualquer endereço tem o mesmo custo. O gargalo em SSDs é a fila de comandos NVMe, não o seek time.',
    },
  ],
};
