import type { Topic } from '@/lib/types';

export const tiposDeDados: Topic = {
  slug: '02-tipos-de-dados',
  number: 2,
  title: 'Tipos de Dados e Variáveis',
  emoji: '📦',
  shortDescription: 'int, float, str, bool — os blocos de construção de qualquer programa.',
  sections: [
    {
      title: 'O que é uma variável?',
      content: `Uma variável é um nome que aponta para um valor na memória. Em Python, você não precisa declarar o tipo — o Python descobre sozinho.

Regras de nomes:
• Use letras, números e underscores
• Não comece com número
• Use snake_case (palavras separadas por _)
• Evite nomes como: list, str, type (palavras reservadas do Python)`,
      codeExample: {
        language: 'python',
        code: `# Declaração simples
nome = "João"
idade = 21
altura = 1.75
ativo = True

# Com type hints (Python 3.5+) — opcional mas recomendado
nome: str = "João"
idade: int = 21
altura: float = 1.75
ativo: bool = True`,
        explanation: 'Type hints não mudam o comportamento do código — são apenas documentação para o programador e IDEs.',
      },
    },
    {
      title: 'Os 5 tipos básicos',
      content: `Python tem 5 tipos de dados primitivos:

• int   → números inteiros           ex: 42, -7, 0
• float → números decimais           ex: 3.14, -0.5, 2.0
• str   → texto (string)             ex: "olá", 'mundo'
• bool  → verdadeiro ou falso        ex: True, False
• None  → ausência de valor          ex: resultado = None`,
      codeExample: {
        language: 'python',
        code: `# Verificando o tipo com type()
print(type(42))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type("oi"))     # <class 'str'>
print(type(True))     # <class 'bool'>
print(type(None))     # <class 'NoneType'>`,
        explanation: 'A função type() é sua aliada para debugar — use sempre que estiver em dúvida sobre o tipo de uma variável.',
      },
    },
    {
      title: 'Conversão de tipos',
      content: `Você pode converter entre tipos com funções built-in. Isso é essencial porque input() sempre retorna string!`,
      codeExample: {
        language: 'python',
        code: `# Conversão de tipos
texto = "42"
numero = int(texto)     # "42" → 42
decimal = float(texto)  # "42" → 42.0
de_volta = str(numero)  # 42 → "42"

# Cuidado: isso vai dar erro!
# int("3.14")  ← não funciona direto

# Jeito certo:
correto = int(float("3.14"))  # → 3

# bool converte qualquer coisa
print(bool(0))     # False
print(bool(1))     # True
print(bool(""))    # False
print(bool("oi"))  # True`,
        explanation: 'Valores "vazios" como 0, "", [], None são considerados False. Todo o resto é True.',
      },
      tip: 'Sempre converta o input() para o tipo correto antes de usar. Ex: idade = int(input("Sua idade: "))',
    },
  ],
  quiz: [
    {
      question: 'Qual o tipo de dado de: x = 3.14 ?',
      options: ['int', 'str', 'float', 'bool'],
      correctIndex: 2,
      explanation: 'Números com ponto decimal são do tipo float em Python.',
    },
    {
      question: 'O que acontece se você tentar fazer: int("hello") ?',
      options: [
        'Retorna 0',
        'Retorna None',
        'Gera um erro (ValueError)',
        'Retorna a string sem alteração',
      ],
      correctIndex: 2,
      explanation: 'int() só converte strings que representam números inteiros. "hello" não é um número, então gera ValueError.',
    },
    {
      question: 'Qual função uso para descobrir o tipo de uma variável?',
      options: ['typeof()', 'type()', 'gettype()', 'isinstance()'],
      correctIndex: 1,
      explanation: 'type() é a função built-in do Python para verificar o tipo de qualquer objeto.',
    },
  ],
};
