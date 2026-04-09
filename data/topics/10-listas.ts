import type { Topic } from '@/lib/types';

export const listas: Topic = {
  slug: '10-listas',
  number: 10,
  title: 'Listas',
  emoji: '📝',
  shortDescription: 'Armazene múltiplos valores em uma única variável.',
  sections: [
    {
      title: 'Criando e acessando listas',
      content: `Uma lista armazena múltiplos valores em sequência, acessíveis por índice (posição). O índice começa em 0!

• Lista vazia: []
• Com itens: [valor1, valor2, valor3]
• Pode misturar tipos (mas evite — boa prática)`,
      codeExample: {
        language: 'python',
        code: `frutas = ["maçã", "banana", "laranja", "uva"]

# Acessando por índice (começa em 0)
print(frutas[0])   # maçã
print(frutas[1])   # banana
print(frutas[-1])  # uva (último elemento)
print(frutas[-2])  # laranja (penúltimo)

# Tamanho da lista
print(len(frutas)) # 4

# Modificando um elemento
frutas[1] = "manga"
print(frutas)      # ['maçã', 'manga', 'laranja', 'uva']`,
        explanation: 'Índices negativos contam do final: -1 é o último, -2 é o penúltimo, etc.',
      },
      tip: 'Índice começa em 0! O primeiro elemento é lista[0], não lista[1]. Este erro é muito comum.',
    },
    {
      title: 'Métodos principais',
      content: 'Os métodos mais usados de lista:',
      codeExample: {
        language: 'python',
        code: `numeros = [3, 1, 4, 1, 5, 9, 2, 6]

numeros.append(7)       # adiciona 7 no final
print(numeros)          # [3, 1, 4, 1, 5, 9, 2, 6, 7]

numeros.remove(1)       # remove a primeira ocorrência de 1
print(numeros)          # [3, 4, 1, 5, 9, 2, 6, 7]

ultimo = numeros.pop()  # remove e retorna o último
print(ultimo)           # 7

numeros.sort()          # ordena in-place
print(numeros)          # [1, 2, 3, 4, 5, 6, 9]

numeros.sort(reverse=True)  # ordem decrescente
print(numeros)          # [9, 6, 5, 4, 3, 2, 1]`,
        explanation: 'sort() modifica a lista original. Se quiser manter a original, use sorted(lista) que retorna uma nova lista.',
      },
    },
    {
      title: 'Iterando com for',
      content: 'Percorrer listas com for é o padrão mais comum:',
      codeExample: {
        language: 'python',
        code: `notas = [8.5, 7.0, 9.5, 5.0, 7.5]

# Jeito 1: iterar pelos valores
for nota in notas:
    print(nota)

# Jeito 2: iterar com índice
for i in range(len(notas)):
    print(f"Posição {i}: {notas[i]}")

# Jeito 3: enumerate (melhor dos dois mundos)
for i, nota in enumerate(notas):
    print(f"Aluno {i+1}: {nota}")`,
        explanation: 'enumerate() retorna o índice e o valor ao mesmo tempo — é a forma mais Pythônica de iterar com índice.',
      },
    },
    {
      title: 'Lista de listas (matriz)',
      content: 'Uma lista pode conter outras listas — isso forma uma matriz:',
      codeExample: {
        language: 'python',
        code: `# Matriz 3x3 (3 linhas, 3 colunas)
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Acessando elementos
print(matriz[0][0])  # 1 (linha 0, coluna 0)
print(matriz[1][2])  # 6 (linha 1, coluna 2)

# Percorrendo a matriz
for linha in matriz:
    for elemento in linha:
        print(elemento, end=" ")
    print()  # quebra de linha`,
        explanation: 'matriz[linha][coluna] — primeiro o índice da linha, depois o da coluna.',
      },
    },
  ],
  quiz: [
    {
      question: 'Dada a lista: cores = ["vermelho", "azul", "verde"]\nQual o resultado de cores[-1]?',
      options: ['"vermelho"', '"azul"', '"verde"', 'Erro — índice inválido'],
      correctIndex: 2,
      explanation: 'Índices negativos contam do final. -1 é o último elemento, que é "verde".',
    },
    {
      question: 'Qual método adiciona um elemento ao FINAL de uma lista?',
      options: ['insert()', 'add()', 'append()', 'push()'],
      correctIndex: 2,
      explanation: 'append() adiciona ao final. insert(índice, valor) adiciona em uma posição específica.',
    },
    {
      question: 'Qual o valor de len(["a", "b", "c", "d"])?',
      options: ['3', '4', '5', '0'],
      correctIndex: 1,
      explanation: 'len() retorna o número de elementos. A lista tem 4 elementos: "a", "b", "c", "d".',
    },
  ],
};
