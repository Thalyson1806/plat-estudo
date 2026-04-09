import type { Topic } from '@/lib/types';

export const strings: Topic = {
  slug: '11-strings',
  number: 11,
  title: 'Strings (Textos)',
  emoji: '💬',
  shortDescription: 'Manipule textos com f-strings, fatiamento e métodos úteis.',
  sections: [
    {
      title: 'Aspas e tipos de string',
      content: `Python aceita três formas de definir strings:

• Aspas simples: 'texto'
• Aspas duplas: "texto"
• Aspas triplas: """texto""" (múltiplas linhas)

Escolha a que for mais conveniente. Use aspas duplas quando o texto tem aspas simples (ex: "it's ok"), e vice-versa.`,
      codeExample: {
        language: 'python',
        code: `# Todas são strings válidas
a = 'Olá, mundo!'
b = "Python é incrível"
c = """Isso é
uma string
de múltiplas linhas"""

# Para incluir aspas dentro da string
d = "Ele disse 'oi'"
e = 'Ela respondeu "olá"'

print(a, b, c, d, e, sep="\\n")`,
        explanation: 'Strings com aspas triplas são ótimas para textos longos e docstrings (comentários de funções).',
      },
    },
    {
      title: 'f-strings e concatenação',
      content: `f-strings (format strings) são a forma moderna de inserir variáveis em texto — muito mais legível que concatenação:`,
      codeExample: {
        language: 'python',
        code: `nome = "Carlos"
idade = 22
media = 8.756

# Concatenação (trabalhosa e feia)
print("Aluno: " + nome + ", Idade: " + str(idade))

# f-string (limpa e poderosa)
print(f"Aluno: {nome}, Idade: {idade}")
print(f"Média: {media:.2f}")     # 8.76
print(f"Aprovado: {media >= 7}") # True

# Expressões dentro de {}
print(f"Dobro da idade: {idade * 2}")  # 44`,
        explanation: 'Dentro das chaves {} de uma f-string você pode colocar qualquer expressão Python, não só variáveis.',
      },
      tip: 'Sempre prefira f-strings. São mais legíveis, menos propensas a erro e mais rápidas que concatenação.',
    },
    {
      title: 'Métodos de string',
      content: 'Strings têm dezenas de métodos. Estes são os mais usados:',
      codeExample: {
        language: 'python',
        code: `texto = "  Olá, Mundo Python!  "

print(texto.strip())          # "Olá, Mundo Python!" (remove espaços)
print(texto.upper())          # "  OLÁ, MUNDO PYTHON!  "
print(texto.lower())          # "  olá, mundo python!  "
print(texto.strip().replace("Python", "Dev"))  # "Olá, Mundo Dev!"

frase = "Python é legal e Python é poderoso"
print(frase.count("Python"))  # 2
print(frase.find("legal"))    # 10 (índice onde começa)
print(frase.split())          # ['Python', 'é', 'legal', ...]

# Verificações
email = "user@email.com"
print(email.endswith(".com"))  # True
print("123".isdigit())         # True
print("abc".isalpha())         # True`,
        explanation: 'Métodos não modificam a string original — retornam uma nova string. Strings são imutáveis em Python.',
      },
    },
    {
      title: 'Fatiamento (slicing)',
      content: 'Você pode extrair partes de uma string com a notação [início:fim:passo]:',
      codeExample: {
        language: 'python',
        code: `texto = "Python"
#         0123456  (índices)
#        -654321   (índices negativos)

print(texto[0])      # P (primeiro)
print(texto[-1])     # n (último)
print(texto[0:3])    # Pyt (índices 0,1,2)
print(texto[2:])     # thon (do 2 até o fim)
print(texto[:4])     # Pyth (do início até 3)
print(texto[::2])    # Pto (passo 2)
print(texto[::-1])   # nohtyP (invertido!)

# Verificar comprimento
print(len(texto))    # 6`,
        explanation: 'texto[::-1] é o truque clássico para inverter uma string. O passo -1 percorre de trás para frente.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual o resultado de "Python"[::-1]?',
      options: ['"Python"', '"nohtyP"', '"Pytho"', 'Erro'],
      correctIndex: 1,
      explanation: '[::-1] inverte a string — percorre de trás para frente com passo -1. "Python" invertido é "nohtyP".',
    },
    {
      question: 'O que o método strip() faz em uma string?',
      options: [
        'Remove todas as letras',
        'Remove espaços do início e do fim',
        'Divide a string em partes',
        'Converte para maiúsculas',
      ],
      correctIndex: 1,
      explanation: 'strip() remove espaços (e outros caracteres de espaçamento como \\n e \\t) do início e do fim da string.',
    },
    {
      question: 'Qual a vantagem das f-strings sobre a concatenação com "+"?',
      options: [
        'f-strings são mais rápidas de digitar e mais legíveis',
        'f-strings só funcionam com números',
        'Concatenação é preferível em todos os casos',
        'Não há diferença prática',
      ],
      correctIndex: 0,
      explanation: 'f-strings são mais legíveis, evitam erros de conversão de tipo (não precisa do str()) e permitem formatação diretamente na string.',
    },
  ],
};
