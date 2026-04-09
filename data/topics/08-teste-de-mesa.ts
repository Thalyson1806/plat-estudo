import type { Topic } from '@/lib/types';

export const testeDeMesa: Topic = {
  slug: '08-teste-de-mesa',
  number: 8,
  title: 'Teste de Mesa',
  emoji: '📋',
  shortDescription: 'Rastreie variáveis manualmente para entender o que o código faz.',
  sections: [
    {
      title: 'O que é o teste de mesa?',
      content: `Teste de mesa é a técnica de simular a execução de um programa manualmente, acompanhando o valor de cada variável linha por linha.

Para que serve:
• Entender a lógica de um código sem executá-lo
• Encontrar bugs antes mesmo de rodar o programa
• Responder questões de prova que perguntam "o que esse código imprime?"

Como fazer:
1. Crie uma tabela com uma coluna por variável
2. Adicione uma coluna para a saída (print)
3. Execute mentalmente, linha por linha
4. Preencha a tabela com os valores`,
      tip: 'Em prova, o teste de mesa é a técnica mais cobrada para entender o que um código faz. Pratique até ficar automático.',
    },
    {
      title: 'Exemplo passo a passo',
      content: `Vamos rastrear este código:

\`\`\`python
i = 1
soma = 0
while i <= 4:
    soma = soma + i
    i = i + 1
print(soma)
\`\`\`

Tabela de execução:

┌──────┬───────┬───────────────────┐
│  i   │ soma  │ Observação        │
├──────┼───────┼───────────────────┤
│  1   │   0   │ valores iniciais  │
├──────┼───────┼───────────────────┤
│  1   │   1   │ 0+1=1, i→2        │
│  2   │   3   │ 1+2=3, i→3        │
│  3   │   6   │ 3+3=6, i→4        │
│  4   │  10   │ 6+4=10, i→5       │
├──────┼───────┼───────────────────┤
│  5   │  10   │ 5>4: sai do loop  │
└──────┴───────┴───────────────────┘

Resultado: print(soma) → 10`,
    },
    {
      title: 'Simulando com print()',
      content: 'Em código, você pode usar print() dentro do loop para simular o teste de mesa:',
      codeExample: {
        language: 'python',
        code: `print(f"{'i':>4} {'soma':>6}")
print("-" * 12)

i = 1
soma = 0
while i <= 4:
    soma = soma + i
    print(f"{i:>4} {soma:>6}")
    i = i + 1

print("-" * 12)
print(f"Resultado: {soma}")`,
        explanation: 'Este padrão de debug com print() é exatamente o que chamamos de teste de mesa automatizado.',
      },
    },
    {
      title: 'Outro exemplo: fatorial',
      content: 'Trace o código do fatorial de 5:',
      codeExample: {
        language: 'python',
        code: `n = 5
fatorial = 1
i = 1

print(f"{'i':>3} {'fatorial':>10}")
while i <= n:
    fatorial = fatorial * i
    print(f"{i:>3} {fatorial:>10}")
    i += 1

print(f"\\n5! = {fatorial}")
# 5! = 120`,
        explanation: 'Trace: 1×1=1, 1×2=2, 2×3=6, 6×4=24, 24×5=120. O teste de mesa mostra cada multiplicação.',
      },
    },
  ],
  quiz: [
    {
      question: 'O que o teste de mesa rastreia?',
      options: [
        'O tempo de execução do programa',
        'O valor das variáveis a cada passo da execução',
        'Os erros de sintaxe do código',
        'A memória usada pelo programa',
      ],
      correctIndex: 1,
      explanation: 'O teste de mesa acompanha o valor de cada variável linha por linha, permitindo entender o comportamento do código sem executá-lo.',
    },
    {
      question: 'Qual o valor de "x" ao final?\nx = 2\nfor i in range(3):\n    x = x * 2',
      options: ['4', '8', '16', '6'],
      correctIndex: 2,
      explanation: 'Trace: i=0: x=2*2=4, i=1: x=4*2=8, i=2: x=8*2=16. Ao final, x = 16.',
    },
    {
      question: 'Para que serve adicionar print() estratégicos dentro de um loop?',
      options: [
        'Para deixar o código mais bonito',
        'Para aumentar o desempenho',
        'Para simular o teste de mesa e acompanhar os valores das variáveis',
        'Para evitar erros de compilação',
      ],
      correctIndex: 2,
      explanation: 'print() estratégicos dentro de loops funcionam como um teste de mesa automático — mostram os valores das variáveis a cada iteração.',
    },
  ],
};
