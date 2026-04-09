import type { Topic } from '@/lib/types';

export const estruturasDeRepeticao: Topic = {
  slug: '06-estruturas-de-repeticao',
  number: 6,
  title: 'Estruturas de Repetição',
  emoji: '🔁',
  shortDescription: 'while e for — repetindo ações sem copiar e colar código.',
  sections: [
    {
      title: 'while — repita enquanto',
      content: `O while executa um bloco repetidamente enquanto a condição for True. Use quando você NÃO sabe quantas vezes vai repetir.

Cuidado: se a condição nunca ficar False, o loop é infinito!`,
      codeExample: {
        language: 'python',
        code: `# Contagem regressiva
contador = 5

while contador > 0:
    print(contador)
    contador -= 1  # essencial! sem isso → loop infinito

print("BOOM! 🚀")

# Saída: 5, 4, 3, 2, 1, BOOM!`,
        explanation: 'O contador -= 1 garante que a condição vai ficar False em algum momento. Sempre garanta uma condição de saída.',
      },
      tip: 'Se seu programa travar, provavelmente tem um loop infinito. Ctrl+C para parar.',
    },
    {
      title: 'for com range() — repita N vezes',
      content: `O for percorre uma sequência. Com range(), você define quantas vezes repetir. Use quando você SABE quantas vezes vai repetir.`,
      codeExample: {
        language: 'python',
        code: `# range(5) → gera 0, 1, 2, 3, 4
for i in range(5):
    print(i)

# range(início, fim) — fim não incluso
for i in range(1, 6):
    print(i)    # 1, 2, 3, 4, 5

# range(início, fim, passo)
for i in range(0, 11, 2):
    print(i)    # 0, 2, 4, 6, 8, 10

# Tabuada do 7
for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")`,
        explanation: 'range(fim) começa do 0. range(início, fim) — o fim nunca é incluído. range(início, fim, passo) controla o incremento.',
      },
    },
    {
      title: 'break e continue',
      content: `Controlam o fluxo dentro do loop:

• break    → sai do loop imediatamente
• continue → pula para a próxima iteração`,
      codeExample: {
        language: 'python',
        code: `# break — para quando achar o número
for i in range(1, 11):
    if i == 5:
        print("Achei o 5, parando!")
        break
    print(i)
# Saída: 1, 2, 3, 4, Achei o 5, parando!

# continue — pula os pares
for i in range(1, 11):
    if i % 2 == 0:
        continue    # pula e vai para o próximo
    print(i)
# Saída: 1, 3, 5, 7, 9`,
        explanation: 'break é útil para busca (sair quando achar). continue é útil para filtrar (pular certas iterações).',
      },
    },
    {
      title: 'while vs for — quando usar cada um',
      content: `A regra prática:

• for  → quando você sabe o número de repetições
         "repita 10 vezes", "percorra esta lista"

• while → quando a repetição depende de uma condição
          "repita até o usuário acertar", "enquanto tiver dados"`,
      codeExample: {
        language: 'python',
        code: `# for — sei quantas vezes (5 tentativas)
for tentativa in range(1, 6):
    print(f"Tentativa {tentativa}")

# while — não sei quantas vezes (até acertar)
senha_correta = "1234"
digitada = ""

while digitada != senha_correta:
    digitada = input("Digite a senha: ")
    if digitada != senha_correta:
        print("Senha errada, tente de novo.")

print("Acesso liberado!")`,
        explanation: 'Perceba: o while é ideal quando a condição de parada depende do usuário ou de algo imprevisível.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual o resultado de range(2, 8, 2)?',
      options: ['2, 4, 6, 8', '2, 4, 6', '2, 3, 4, 5, 6, 7', '0, 2, 4, 6'],
      correctIndex: 1,
      explanation: 'range(2, 8, 2) começa em 2, vai até 8 (exclusive), com passo 2: 2, 4, 6. O 8 não é incluído.',
    },
    {
      question: 'O que o comando break faz dentro de um loop?',
      options: [
        'Pausa o loop por 1 segundo',
        'Pula para a próxima iteração',
        'Encerra o loop imediatamente',
        'Reinicia o loop do começo',
      ],
      correctIndex: 2,
      explanation: 'break para o loop completamente e o código continua após o bloco do loop.',
    },
    {
      question: 'Quando é mais adequado usar while ao invés de for?',
      options: [
        'Quando você sabe exatamente quantas vezes repetir',
        'Quando a repetição depende de uma condição que pode variar',
        'Quando está percorrendo uma lista',
        'while é sempre melhor que for',
      ],
      correctIndex: 1,
      explanation: 'Use while quando não sabe quantas iterações serão necessárias — quando depende de input do usuário, de dados externos ou de uma condição dinâmica.',
    },
  ],
};
