import type { Topic } from '@/lib/types';

export const estruturasDeControle: Topic = {
  slug: '05-estruturas-de-controle',
  number: 5,
  title: 'Estruturas de Controle',
  emoji: '🔀',
  shortDescription: 'if, elif e else — tomando decisões no código.',
  sections: [
    {
      title: 'if, elif, else',
      content: `A estrutura de controle define qual bloco de código executa dependendo de uma condição.

• if   → "se isso for verdade, faça"
• elif → "senão, se isso for verdade, faça"
• else → "em qualquer outro caso, faça"

Só um bloco executa por vez. Python executa o primeiro que for True e pula os outros.`,
      codeExample: {
        language: 'python',
        code: `nota = 7.5

if nota >= 9:
    print("Excelente!")
elif nota >= 7:
    print("Aprovado")
elif nota >= 5:
    print("Recuperação")
else:
    print("Reprovado")

# Saída: Aprovado`,
        explanation: 'Python testa cada condição em ordem. Quando encontra uma True, executa e pula as demais.',
      },
    },
    {
      title: 'A indentação é obrigatória',
      content: `Em Python, a indentação (4 espaços ou 1 tab) define os blocos de código. Isso é diferente de C, Java ou JavaScript que usam chaves { }.`,
      codeExample: {
        language: 'python',
        code: `# CORRETO — indentação com 4 espaços
if True:
    print("dentro do if")
    print("ainda dentro do if")
print("fora do if")

# ERRADO — vai gerar IndentationError
# if True:
# print("erro!")`,
        explanation: 'IndentationError é um dos erros mais comuns para iniciantes. Misturar tabs e espaços também causa problemas.',
      },
      tip: 'Configure seu editor para usar 4 espaços ao pressionar Tab. VSCode faz isso automaticamente com Python.',
    },
    {
      title: 'Condições simples com if',
      content: 'Nem sempre você precisa de elif ou else:',
      codeExample: {
        language: 'python',
        code: `temperatura = 38.5

# if simples — sem else
if temperatura > 37.5:
    print("Febre detectada!")

# if com else
saldo = -50
if saldo >= 0:
    print("Saldo positivo")
else:
    print("Saldo negativo — cuidado!")`,
        explanation: 'Use else apenas quando precisar tratar o caso contrário. Nem sempre é necessário.',
      },
    },
    {
      title: 'match/case (Python 3.10+)',
      content: `O match/case é como um "switch" de outras linguagens — útil quando você testa o mesmo valor contra muitas opções:`,
      codeExample: {
        language: 'python',
        code: `dia = "segunda"

match dia:
    case "segunda" | "terça" | "quarta" | "quinta" | "sexta":
        print("Dia de trabalho")
    case "sábado" | "domingo":
        print("Fim de semana!")
    case _:
        print("Dia inválido")`,
        explanation: '_ funciona como o "else" do match — captura qualquer valor não listado acima.',
      },
      tip: 'match/case só funciona no Python 3.10 ou superior. Verifique a versão: python --version',
    },
  ],
  quiz: [
    {
      question: 'O que acontece se nenhuma condição do if/elif for True e não houver else?',
      options: [
        'Gera um erro',
        'Executa o último elif',
        'Nada — o programa continua normalmente',
        'Executa o if novamente',
      ],
      correctIndex: 2,
      explanation: 'Se nenhuma condição for True e não houver else, nenhum bloco é executado. O programa simplesmente continua depois da estrutura.',
    },
    {
      question: 'Em Python, o que define um bloco de código dentro de um if?',
      options: [
        'Chaves { }',
        'A indentação (espaços/tab)',
        'Dois pontos ::',
        'Parênteses ( )',
      ],
      correctIndex: 1,
      explanation: 'Python usa indentação (4 espaços) para definir blocos. Isso é único do Python — outras linguagens como C e Java usam chaves {}.',
    },
    {
      question: 'Quantos blocos de código são executados em uma estrutura if/elif/else?',
      options: [
        'Todos que tiverem condição True',
        'Apenas o primeiro que tiver condição True',
        'Sempre o else',
        'Depende do número de elif',
      ],
      correctIndex: 1,
      explanation: 'Python executa APENAS o primeiro bloco com condição True e ignora o restante. Por isso a ordem dos elif importa.',
    },
  ],
};
