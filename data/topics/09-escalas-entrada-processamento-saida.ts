import type { Topic } from '@/lib/types';

export const escalasEntradaProcessamentoSaida: Topic = {
  slug: '09-escalas-entrada-processamento-saida',
  number: 9,
  title: 'Entrada, Processamento e Saída',
  emoji: '🔄',
  shortDescription: 'O modelo IPO — a base de qualquer programa.',
  sections: [
    {
      title: 'O modelo IPO',
      content: `Todo programa pode ser dividido em 3 etapas:

• Input (Entrada)       → Receber dados do usuário ou do ambiente
• Process (Processamento) → Calcular, transformar, decidir
• Output (Saída)        → Mostrar o resultado

┌──────────────────────────────────────────────┐
│  [ENTRADA] → [PROCESSAMENTO] → [SAÍDA]       │
│  input()      cálculos/lógica   print()      │
└──────────────────────────────────────────────┘

Este modelo é chamado de IPO (Input-Process-Output) e é a base de qualquer algoritmo.`,
      tip: 'Antes de escrever código, pergunte: qual é a entrada? O que processo? Qual a saída esperada?',
    },
    {
      title: 'input() — recebendo dados',
      content: `A função input() pausa o programa e espera o usuário digitar algo. SEMPRE retorna uma string, independente do que for digitado.`,
      codeExample: {
        language: 'python',
        code: `# input() sempre retorna string
nome = input("Digite seu nome: ")
print(type(nome))   # <class 'str'>

# Para números, converta com int() ou float()
idade = int(input("Sua idade: "))
altura = float(input("Sua altura (ex: 1.75): "))

print(f"Olá, {nome}!")
print(f"Você tem {idade} anos e {altura}m de altura.")`,
        explanation: 'Nunca esqueça de converter o input() quando precisar de número. Somar "5" + "3" = "53" (concatenação!), não 8.',
      },
      tip: 'input() retorna SEMPRE string. Antes de fazer qualquer cálculo, converta com int() ou float().',
    },
    {
      title: 'print() — exibindo resultados',
      content: 'print() tem várias formas de formatar a saída:',
      codeExample: {
        language: 'python',
        code: `nome = "Ana"
nota = 8.756

# Jeito 1: concatenação (trabalhoso)
print("Aluna: " + nome)

# Jeito 2: vírgula (adiciona espaço automático)
print("Nota:", nota)

# Jeito 3: f-string (melhor e mais legível)
print(f"Aluna: {nome}, Nota: {nota:.1f}")

# Formatações úteis
print(f"{nota:.2f}")    # 8.76 (2 casas decimais)
print(f"{nota:.0f}")    # 9    (sem decimal)
print(f"{1000000:,}")   # 1,000,000 (separador de milhar)

# Sem quebra de linha
print("A", end=" ")
print("B", end=" ")
print("C")
# Saída: A B C`,
        explanation: 'f-strings são a forma moderna e preferida. O :.2f significa: mostrar com 2 casas decimais.',
      },
    },
    {
      title: 'Exemplo completo: calcular média',
      content: 'Aplicando o modelo IPO completo:',
      codeExample: {
        language: 'python',
        code: `# === ENTRADA ===
print("Calculadora de Média")
print("-" * 25)
nota1 = float(input("Nota 1: "))
nota2 = float(input("Nota 2: "))
nota3 = float(input("Nota 3: "))

# === PROCESSAMENTO ===
media = (nota1 + nota2 + nota3) / 3

if media >= 7:
    situacao = "Aprovado"
elif media >= 5:
    situacao = "Recuperação"
else:
    situacao = "Reprovado"

# === SAÍDA ===
print(f"\\nMédia: {media:.1f}")
print(f"Situação: {situacao}")`,
        explanation: 'Separar o código em blocos de Entrada, Processamento e Saída melhora muito a organização e leitura.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual o tipo de dado retornado por input()?',
      options: ['int', 'float', 'str', 'Depende do que o usuário digitar'],
      correctIndex: 2,
      explanation: 'input() SEMPRE retorna str (string), independente do que for digitado. Você precisa converter explicitamente com int() ou float() quando necessário.',
    },
    {
      question: 'O que significa IPO no contexto de programação?',
      options: [
        'Integer, Print, Output',
        'Input, Process, Output',
        'Interface, Program, Object',
        'Instruction, Parse, Operation',
      ],
      correctIndex: 1,
      explanation: 'IPO = Input (Entrada), Process (Processamento), Output (Saída). É o modelo básico de qualquer programa ou algoritmo.',
    },
    {
      question: 'O que acontece se você executar: x = input("Número: ") e o usuário digita "5", depois faz print(x + x)?',
      options: ['10', '55', 'Erro', '5 5'],
      correctIndex: 1,
      explanation: 'Como input() retorna string, x = "5". Somar strings concatena: "5" + "5" = "55". Para obter 10, você precisaria fazer: x = int(input("Número: "))',
    },
  ],
};
