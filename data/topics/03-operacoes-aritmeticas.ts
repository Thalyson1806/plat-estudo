import type { Topic } from '@/lib/types';

export const operacoesAritmeticas: Topic = {
  slug: '03-operacoes-aritmeticas',
  number: 3,
  title: 'Operações Aritméticas',
  emoji: '🧮',
  shortDescription: '+, -, *, /, //, %, ** — e como Python decide a ordem dos cálculos.',
  sections: [
    {
      title: 'Operadores básicos',
      content: `Python tem 7 operadores aritméticos. Os três últimos são os que mais caem em prova:

• +   → adição              5 + 3 = 8
• -   → subtração           5 - 3 = 2
• *   → multiplicação       5 * 3 = 15
• /   → divisão real        7 / 2 = 3.5   (sempre float!)
• //  → divisão inteira     7 // 2 = 3    (descarta o resto)
• %   → módulo (resto)      7 % 2 = 1
• **  → potência            2 ** 3 = 8`,
      codeExample: {
        language: 'python',
        code: `# Exemplos de todos os operadores
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333...
print(10 // 3)  # 3   (só a parte inteira)
print(10 % 3)   # 1   (sobrou 1 na divisão)
print(2 ** 10)  # 1024`,
        explanation: 'O % (módulo) é muito útil para verificar se um número é par: se n % 2 == 0, é par.',
      },
    },
    {
      title: 'Ordem de precedência',
      content: `Python segue a mesma ordem da matemática (PEMDAS):

1. ( )  → Parênteses primeiro
2. **   → Potenciação
3. * / // %  → Multiplicação e divisão (da esquerda para a direita)
4. + -  → Adição e subtração (da esquerda para a direita)`,
      codeExample: {
        language: 'python',
        code: `# Sem parênteses
print(2 + 3 * 4)    # 14, não 20 (* vem antes de +)

# Com parênteses — você controla a ordem
print((2 + 3) * 4)  # 20

# Exemplo prático: calcular IMC
peso = 70
altura = 1.75
imc = peso / altura ** 2   # altura** antes de /
print(f"IMC: {imc:.1f}")   # 22.9`,
        explanation: 'Sempre use parênteses quando a ordem importa. Código legível > código "esperto".',
      },
      tip: 'Dica de prova: 2 + 3 * 4 = 14, não 20. A multiplicação sempre vem antes da adição.',
    },
    {
      title: 'Operadores de atribuição',
      content: `Atalhos para modificar uma variável no lugar:`,
      codeExample: {
        language: 'python',
        code: `saldo = 100

saldo += 50   # saldo = saldo + 50  → 150
saldo -= 30   # saldo = saldo - 30  → 120
saldo *= 2    # saldo = saldo * 2   → 240
saldo //= 3   # saldo = saldo // 3  → 80
saldo %= 7    # saldo = saldo % 7   → 3

print(saldo)  # 3`,
        explanation: 'Esses operadores são equivalentes a escrever a versão longa — só poupam digitação.',
      },
    },
    {
      title: 'Exemplo prático: calcular desconto',
      content: 'Veja um cálculo realista usando operações aritméticas:',
      codeExample: {
        language: 'python',
        code: `preco = 250.00
desconto_pct = 15   # 15%

desconto = preco * desconto_pct / 100
preco_final = preco - desconto

print(f"Preço original: R$ {preco:.2f}")
print(f"Desconto: R$ {desconto:.2f}")
print(f"Preço final: R$ {preco_final:.2f}")`,
        explanation: 'f-strings com :.2f formatam o número com 2 casas decimais — essencial para valores monetários.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual o resultado de: 17 % 5 ?',
      options: ['3', '2', '1', '3.4'],
      correctIndex: 1,
      explanation: '17 dividido por 5 dá 3 com resto 2. O operador % retorna apenas o resto: 17 = 5*3 + 2.',
    },
    {
      question: 'O que o operador // faz em Python?',
      options: [
        'Divide e retorna resultado float',
        'Divide e descarta a parte decimal (divisão inteira)',
        'Calcula o resto da divisão',
        'Calcula a potência',
      ],
      correctIndex: 1,
      explanation: '// é a divisão inteira: 7 // 2 = 3 (o .5 é descartado, não arredondado).',
    },
    {
      question: 'Qual o resultado de: 2 + 3 ** 2 * 4 ?',
      options: ['100', '38', '20', '44'],
      correctIndex: 1,
      explanation: 'Ordem: 3**2=9, depois 9*4=36, depois 2+36=38. Potência antes de multiplicação, multiplicação antes de adição.',
    },
  ],
};
