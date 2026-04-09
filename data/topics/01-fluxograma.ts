import type { Topic } from '@/lib/types';

export const fluxograma: Topic = {
  slug: '01-fluxograma',
  number: 1,
  title: 'Fluxograma',
  emoji: '🗺️',
  shortDescription: 'Visualize a lógica antes de escrever código.',
  sections: [
    {
      title: 'O que é um fluxograma?',
      content: `Um fluxograma é um diagrama que representa visualmente os passos de um processo ou algoritmo. Antes de escrever qualquer linha de código, um bom programador pensa na lógica — e o fluxograma é a ferramenta para isso.

Ele serve para:
• Organizar o raciocínio antes de codificar
• Comunicar a lógica para outras pessoas
• Detectar erros de lógica antes de virar bug no código`,
    },
    {
      title: 'Símbolos Básicos',
      content: `Cada símbolo representa um tipo de operação diferente:

┌─────────────────────────────────────────┐
│  OVAL (elipse)     → Início / Fim       │
│  RETÂNGULO         → Processo           │
│  LOSANGO           → Decisão (sim/não)  │
│  PARALELOGRAMO     → Entrada / Saída    │
│  SETA              → Fluxo/direção      │
└─────────────────────────────────────────┘`,
      tip: 'Memorize: oval = começar/terminar, retângulo = fazer algo, losango = perguntar, paralelogramo = mostrar/receber.',
    },
    {
      title: 'Exemplo: verificar se número é par',
      content: `Veja o fluxograma em ASCII art para o problema "Verificar se um número é par ou ímpar":

    ┌─────────────┐
    │   INÍCIO    │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │  Leia N     │  ← Entrada (paralelogramo)
    └──────┬──────┘
           │
    ┌──────▼──────────┐
    │  N % 2 == 0?    │  ← Decisão (losango)
    └──┬──────────┬───┘
    SIM│          │NÃO
  ┌────▼────┐ ┌───▼─────┐
  │ "PAR"   │ │ "ÍMPAR" │  ← Saída
  └────┬────┘ └───┬─────┘
       └────┬─────┘
    ┌────────▼────────┐
    │      FIM        │
    └─────────────────┘`,
      tip: 'Use o draw.io (app.diagrams.net) para criar fluxogramas bonitos e profissionais de graça.',
    },
    {
      title: 'Do fluxograma para o código',
      content: 'Cada símbolo do fluxograma vira uma parte do código Python:',
      codeExample: {
        language: 'python',
        code: `# Fluxograma → Código Python

# INÍCIO (implícito)

# ENTRADA (paralelogramo)
n = int(input("Digite um número: "))

# DECISÃO (losango)
if n % 2 == 0:
    # SAÍDA (paralelogramo)
    print("PAR")
else:
    print("ÍMPAR")

# FIM (implícito)`,
        explanation: 'Cada bloco do fluxograma vira diretamente uma instrução Python.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual símbolo representa uma DECISÃO (sim ou não) em um fluxograma?',
      options: ['Retângulo', 'Oval/Elipse', 'Losango', 'Paralelogramo'],
      correctIndex: 2,
      explanation: 'O losango é usado para decisões — ele tem duas saídas: "sim" e "não" (ou verdadeiro/falso).',
    },
    {
      question: 'Para que serve o paralelogramo em um fluxograma?',
      options: [
        'Representar o início e o fim',
        'Representar entrada ou saída de dados',
        'Representar um cálculo ou processo',
        'Representar um loop',
      ],
      correctIndex: 1,
      explanation: 'O paralelogramo representa entrada de dados (ex: input) e saída (ex: print).',
    },
    {
      question: 'Qual a principal vantagem de criar um fluxograma ANTES de escrever o código?',
      options: [
        'Gera o código automaticamente',
        'Substitui a necessidade de comentários',
        'Ajuda a organizar a lógica e detectar erros antes de codificar',
        'Garante que o código vai rodar mais rápido',
      ],
      correctIndex: 2,
      explanation: 'O fluxograma ajuda a pensar na lógica antes de se preocupar com sintaxe. Erros de lógica são muito mais fáceis de corrigir no diagrama do que no código.',
    },
  ],
};
