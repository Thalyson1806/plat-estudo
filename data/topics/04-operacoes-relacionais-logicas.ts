import type { Topic } from '@/lib/types';

export const operacoesRelacionaisLogicas: Topic = {
  slug: '04-operacoes-relacionais-logicas',
  number: 4,
  title: 'Operações Relacionais e Lógicas',
  emoji: '⚖️',
  shortDescription: 'Compare valores e combine condições com and, or e not.',
  sections: [
    {
      title: 'Operadores relacionais',
      content: `Operadores relacionais comparam dois valores e retornam True ou False:

• ==  → igual a                5 == 5  → True
• !=  → diferente de           5 != 3  → True
• >   → maior que              5 > 3   → True
• <   → menor que              5 < 3   → False
• >=  → maior ou igual que     5 >= 5  → True
• <=  → menor ou igual que     3 <= 5  → True`,
      codeExample: {
        language: 'python',
        code: `idade = 18

print(idade == 18)  # True
print(idade != 18)  # False
print(idade >= 18)  # True
print(idade < 21)   # True

# Atenção! = é atribuição, == é comparação
x = 10      # atribui 10 a x
x == 10     # compara x com 10 (retorna True)`,
        explanation: 'Confundir = com == é um dos erros mais comuns. = atribui, == compara.',
      },
      tip: 'Cuidado com == vs =. Este erro é clássico em prova.',
    },
    {
      title: 'Operadores lógicos',
      content: `Combinam múltiplas condições:

• and  → ambas precisam ser True    True and True = True
• or   → basta uma ser True         True or False = True
• not  → inverte o resultado        not True = False`,
      codeExample: {
        language: 'python',
        code: `# Exemplo: validação de acesso
idade = 20
tem_cartao = True

# Precisa ter 18+ E ter cartão
pode_entrar = idade >= 18 and tem_cartao
print(pode_entrar)  # True

# Desconto para crianças OU idosos
crianca = False
idoso = True
tem_desconto = crianca or idoso
print(tem_desconto)  # True

# not inverte
bloqueado = False
print(not bloqueado)  # True`,
        explanation: 'and = as duas precisam ser True. or = basta uma ser True. not = vira ao contrário.',
      },
    },
    {
      title: 'Tabela verdade',
      content: `Decore esta tabela — ela aparece em prova:

┌───────┬───────┬─────────────┬────────────┬───────────┐
│   A   │   B   │  A and B    │  A or B    │   not A   │
├───────┼───────┼─────────────┼────────────┼───────────┤
│ True  │ True  │    True     │    True    │   False   │
│ True  │ False │    False    │    True    │   False   │
│ False │ True  │    False    │    True    │   True    │
│ False │ False │    False    │    False   │   True    │
└───────┴───────┴─────────────┴────────────┴───────────┘`,
      tip: 'and é restritivo (ambos True). or é permissivo (basta um True).',
    },
    {
      title: 'Exemplo prático',
      content: 'Validação de login com múltiplas condições:',
      codeExample: {
        language: 'python',
        code: `usuario = "admin"
senha = "1234"
tentativas = 3

login_ok = usuario == "admin" and senha == "1234"
pode_tentar = tentativas > 0

if login_ok and pode_tentar:
    print("Acesso liberado!")
elif not pode_tentar:
    print("Conta bloqueada.")
else:
    print("Usuário ou senha incorretos.")`,
        explanation: 'Combinamos and, not e comparações para criar uma lógica de autenticação simples.',
      },
    },
  ],
  quiz: [
    {
      question: 'Qual o resultado de: True and False ?',
      options: ['True', 'False', 'None', 'Erro'],
      correctIndex: 1,
      explanation: 'and exige que AMBOS sejam True. Como um deles é False, o resultado é False.',
    },
    {
      question: 'Qual o resultado de: not (5 > 3) ?',
      options: ['True', 'False', '5', '3'],
      correctIndex: 1,
      explanation: '5 > 3 é True. not True é False. O not inverte o resultado boolean.',
    },
    {
      question: 'O que diferencia = de == em Python?',
      options: [
        'São a mesma coisa',
        '= compara, == atribui',
        '= atribui valor a variável, == compara dois valores',
        'Ambos são operadores de comparação',
      ],
      correctIndex: 2,
      explanation: '= é o operador de atribuição (x = 5 coloca 5 em x). == é o operador de igualdade (x == 5 verifica se x é igual a 5).',
    },
  ],
};
