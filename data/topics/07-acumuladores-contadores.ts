import type { Topic } from '@/lib/types';

export const acumuladoresContadores: Topic = {
  slug: '07-acumuladores-contadores',
  number: 7,
  title: 'Acumuladores e Contadores',
  emoji: '📊',
  shortDescription: 'Somar e contar dentro de loops — padrão que aparece em toda prova.',
  sections: [
    {
      title: 'O que é um contador?',
      content: `Um contador é uma variável que incrementa (ou decrementa) em 1 a cada iteração do loop. Serve para contar quantas vezes algo aconteceu.

Padrão clássico:
1. Inicialize FORA do loop com 0
2. Incremente DENTRO do loop com += 1`,
      codeExample: {
        language: 'python',
        code: `numeros = [3, 7, 2, 8, 4, 5, 1, 9, 6]

contador_pares = 0  # ← inicializa FORA

for n in numeros:
    if n % 2 == 0:
        contador_pares += 1  # ← incrementa DENTRO

print(f"Quantidade de pares: {contador_pares}")
# Saída: Quantidade de pares: 3 (2, 8, 4, 6)`,
        explanation: 'Inicializar fora do loop é essencial — se inicializar dentro, o contador reseta a cada iteração.',
      },
      tip: 'Contador = começa em 0, soma 1. Acumulador = começa em 0, soma o valor da variável.',
    },
    {
      title: 'O que é um acumulador?',
      content: `Um acumulador soma (ou multiplica) valores ao longo das iterações. Diferente do contador, ele adiciona o valor da variável, não apenas 1.`,
      codeExample: {
        language: 'python',
        code: `notas = [8.5, 7.0, 9.5, 6.0, 7.5]

soma = 0  # ← acumulador, inicializa em 0

for nota in notas:
    soma += nota  # soma += nota (não += 1!)

media = soma / len(notas)
print(f"Soma: {soma}")
print(f"Média: {media:.1f}")
# Soma: 38.5   Média: 7.7`,
        explanation: 'len(notas) retorna o tamanho da lista. Dividir a soma pelo total dá a média.',
      },
    },
    {
      title: 'Contador e acumulador juntos',
      content: 'Frequentemente você usa os dois ao mesmo tempo:',
      codeExample: {
        language: 'python',
        code: `valores = [10, -3, 25, -8, 14, -1, 7]

soma_positivos = 0    # acumulador
qtd_negativos = 0     # contador

for v in valores:
    if v > 0:
        soma_positivos += v
    elif v < 0:
        qtd_negativos += 1

print(f"Soma dos positivos: {soma_positivos}")
print(f"Quantidade de negativos: {qtd_negativos}")
# Soma dos positivos: 56
# Quantidade de negativos: 3`,
        explanation: 'Perceba que cada variável é inicializada fora do loop e modificada dentro, mas com regras diferentes.',
      },
    },
    {
      title: 'Erro comum: inicializar dentro do loop',
      content: 'Veja a diferença entre o código correto e o errado:',
      codeExample: {
        language: 'python',
        code: `numeros = [1, 2, 3, 4, 5]

# ❌ ERRADO — soma reseta a cada iteração!
for n in numeros:
    soma = 0       # ← dentro do loop!
    soma += n
print(soma)        # 5 (só o último!)

# ✅ CORRETO — soma acumula todas as iterações
soma = 0           # ← fora do loop
for n in numeros:
    soma += n
print(soma)        # 15 (correto!)`,
        explanation: 'Este é o erro #1 com acumuladores. A inicialização deve sempre estar ANTES do loop.',
      },
    },
  ],
  quiz: [
    {
      question: 'Por que o acumulador deve ser inicializado FORA do loop?',
      options: [
        'Por convenção, mas não é obrigatório',
        'Para evitar que o valor seja resetado a cada iteração',
        'Porque variáveis dentro de loops não funcionam em Python',
        'Para economizar memória',
      ],
      correctIndex: 1,
      explanation: 'Se inicializado dentro do loop, a variável volta ao valor inicial (0) a cada iteração, perdendo os valores acumulados anteriormente.',
    },
    {
      question: 'Qual a diferença entre um contador e um acumulador?',
      options: [
        'Não há diferença — são a mesma coisa',
        'Contador soma 1 a cada iteração; acumulador soma o valor de uma variável',
        'Contador usa +=, acumulador usa -=',
        'Acumulador conta itens, contador soma valores',
      ],
      correctIndex: 1,
      explanation: 'Contador: qtd += 1 (sempre incrementa 1). Acumulador: soma += valor (incrementa o valor atual da variável).',
    },
    {
      question: 'Qual o valor de "total" ao final deste código?\ntotal = 0\nfor i in range(1, 5):\n    total += i',
      options: ['4', '10', '5', '15'],
      correctIndex: 1,
      explanation: 'range(1, 5) gera 1, 2, 3, 4. total = 0+1+2+3+4 = 10.',
    },
  ],
};
