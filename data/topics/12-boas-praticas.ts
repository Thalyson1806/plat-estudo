import type { Topic } from '@/lib/types';

export const boasPraticas: Topic = {
  slug: '12-boas-praticas',
  number: 12,
  title: 'Boas Práticas',
  emoji: '✨',
  shortDescription: 'Escreva código limpo, legível e profissional desde o início.',
  sections: [
    {
      title: 'Nomes descritivos (snake_case)',
      content: `Nomes ruins são a principal causa de código difícil de manter. Em Python, o padrão é snake_case para variáveis e funções.

Regras:
• Use nomes descritivos — o nome deve dizer o que a variável armazena
• snake_case: palavras separadas por _ (padrão Python)
• CamelCase: reservado para classes
• Evite nomes de uma letra (exceto i, j em loops curtos)`,
      codeExample: {
        language: 'python',
        code: `# ❌ RUIM — nomes sem sentido
x = 21
y = 1.75
z = x / (y ** 2)

# ✅ BOM — nomes descritivos
idade_usuario = 21
altura_metros = 1.75
imc = idade_usuario / (altura_metros ** 2)

# ❌ RUIM
def calc(a, b, c):
    return (a + b + c) / 3

# ✅ BOM
def calcular_media(nota1, nota2, nota3):
    return (nota1 + nota2 + nota3) / 3`,
        explanation: 'Um bom nome elimina a necessidade de comentário. Se você precisa comentar o que uma variável faz, provavelmente o nome é ruim.',
      },
      tip: 'Se um colega lê seu código sem ver o contexto e entende o que cada variável faz, os nomes estão bons.',
    },
    {
      title: 'Comentários — quando usar',
      content: `Comentários explicam o PORQUÊ, não o O QUÊ. Código bem escrito é auto-explicativo.`,
      codeExample: {
        language: 'python',
        code: `# ❌ Comentário inútil — o código já diz isso
idade = 18  # variável de idade

# ✅ Comentário útil — explica o motivo
# Maioridade no Brasil é 18 anos conforme ECA
IDADE_MINIMA = 18

# ❌ Comentário que duplica o código
# Verifica se x é maior que zero
if x > 0:
    pass

# ✅ Comentário que explica a regra de negócio
# Somente scores positivos são considerados válidos
# (valores negativos indicam dados corrompidos)
if score > 0:
    processar(score)`,
        explanation: 'Comentários bons são raros e valiosos. Comentários ruins são ruído que distrai o leitor.',
      },
    },
    {
      title: 'Funções para evitar repetição',
      content: `Se você está copiando e colando código, algo está errado. Extraia em funções.`,
      codeExample: {
        language: 'python',
        code: `# ❌ RUIM — código repetido
nota_joao = (7 + 8 + 9) / 3
if nota_joao >= 7:
    print(f"João: Aprovado ({nota_joao:.1f})")

nota_ana = (6 + 5 + 8) / 3
if nota_ana >= 7:
    print(f"Ana: Aprovado ({nota_ana:.1f})")

# ✅ BOM — função reutilizável
def verificar_aprovacao(nome, notas):
    media = sum(notas) / len(notas)
    status = "Aprovado" if media >= 7 else "Reprovado"
    print(f"{nome}: {status} ({media:.1f})")

verificar_aprovacao("João", [7, 8, 9])
verificar_aprovacao("Ana", [6, 5, 8])`,
        explanation: 'A regra DRY (Don\'t Repeat Yourself) diz: se você escreveu algo duas vezes, vire uma função.',
      },
    },
    {
      title: 'PEP 8 — o guia de estilo do Python',
      content: `PEP 8 é o guia oficial de estilo. Os pontos principais:`,
      codeExample: {
        language: 'python',
        code: `# ✅ Indentação: 4 espaços (nunca tabs)
def saudacao(nome):
    mensagem = f"Olá, {nome}!"
    return mensagem

# ✅ Espaços ao redor de operadores
x = 1 + 2    # ✅
x = 1+2      # ❌

# ✅ Linhas em branco para separar blocos
def funcao_a():
    pass


def funcao_b():  # 2 linhas em branco entre funções
    pass

# ✅ Imports no topo do arquivo
# ✅ Máximo ~79 caracteres por linha
# ✅ Nomes de constantes em MAIÚSCULAS
VELOCIDADE_LUZ = 299_792_458  # m/s`,
        explanation: 'O VSCode com a extensão Python (Pylance) formata automaticamente com PEP 8. Use Shift+Alt+F para formatar.',
      },
      tip: 'Instale o Black (formatador automático): pip install black. Ele formata o código no padrão PEP 8 sem você precisar pensar.',
    },
  ],
  quiz: [
    {
      question: 'Qual o padrão de nomenclatura recomendado para variáveis em Python?',
      options: ['camelCase', 'PascalCase', 'snake_case', 'SCREAMING_SNAKE_CASE'],
      correctIndex: 2,
      explanation: 'snake_case (palavras separadas por _) é o padrão Python para variáveis e funções. PascalCase é para classes, SCREAMING_SNAKE_CASE para constantes.',
    },
    {
      question: 'Quando um comentário é realmente útil?',
      options: [
        'Quando explica o que cada linha de código faz',
        'Quando explica o motivo de uma decisão não óbvia no código',
        'Quanto mais comentários, melhor',
        'Comentários nunca são necessários',
      ],
      correctIndex: 1,
      explanation: 'Bons comentários explicam o PORQUÊ — a regra de negócio, o motivo de uma escolha. Comentários que descrevem o que o código faz são redundantes.',
    },
    {
      question: 'O que é a regra DRY em programação?',
      options: [
        'Delete Redundant Yesterday — apague código antigo',
        "Don't Repeat Yourself — evite duplicar código",
        'Dynamic Rendering Yield — renderize dinamicamente',
        'Data Restructuring Yearly — reorganize dados periodicamente',
      ],
      correctIndex: 1,
      explanation: "DRY = Don't Repeat Yourself. Se você copiou e colou código, provavelmente deveria criar uma função ou variável para evitar duplicação.",
    },
  ],
};
