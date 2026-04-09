import type { Topic } from '@/lib/types';

export const criptografia: Topic = {
  slug: '06-criptografia',
  number: 6,
  title: 'Criptografia',
  emoji: '🔐',
  shortDescription: 'Chaves, hashing e TLS — o que mantém seus dados seguros.',
  sections: [
    {
      title: 'Criptografia Simétrica vs Assimétrica',
      content: `Criptografia é o processo de transformar dados legíveis em dados ilegíveis (ciphertext) usando uma chave matemática.

SIMÉTRICA (chave única):
• Mesma chave para cifrar e decifrar
• Muito rápida
• Problema: como compartilhar a chave com segurança?
• Exemplos: AES-256, ChaCha20

ASSIMÉTRICA (par de chaves):
• Chave pública (pode compartilhar com todos)
• Chave privada (nunca compartilhar)
• O que é cifrado com a pública, só a privada decifra
• Lenta — usada para trocar chaves simétricas
• Exemplos: RSA-2048, ECDSA, Ed25519

Na prática (HTTPS/TLS):
  1. Assimétrica autentica o servidor e troca uma chave
  2. Simétrica cifra todo o restante da comunicação`,
      tip: 'AES-256 é considerado inquebrável com tecnologia atual — levaria mais tempo que a idade do universo para força bruta.',
    },
    {
      title: 'Hashing',
      content: `Hash é uma função de mão única: transforma qualquer dado em uma string de tamanho fixo. Você não pode reverter um hash para o dado original.

Características de um bom hash criptográfico:
• Determinístico: mesma entrada → sempre mesmo hash
• Avalanche: 1 bit diferente → hash completamente diferente
• Irreversível: impossível obter o original a partir do hash
• Sem colisão: difícil encontrar duas entradas com mesmo hash

Usos:
• Senhas — nunca salvar senha pura, salvar bcrypt/Argon2
• Integridade de arquivos — MD5/SHA256 para verificar downloads
• Assinaturas digitais
• Blockchain

Algoritmos:
• MD5, SHA1 → QUEBRADOS, não use para segurança
• SHA-256, SHA-3 → seguros para integridade
• bcrypt, Argon2, scrypt → seguros para senhas (lentos propositalmente)`,
      codeExample: {
        language: 'bash',
        code: `# Gerar hash SHA-256 de um arquivo
sha256sum arquivo.txt

# Verificar integridade de um download
echo "abc123...  arquivo.iso" | sha256sum --check

# Ver hash de uma string
echo -n "senha123" | sha256sum`,
        explanation: 'Para verificar se um arquivo baixado está íntegro, compare o SHA-256 que o site fornece com o que você gerou localmente.',
      },
    },
    {
      title: 'TLS e certificados',
      content: `TLS (Transport Layer Security) é o protocolo que faz o HTTPS funcionar. Ele usa criptografia assimétrica para autenticação e simétrica para dados.

Handshake TLS simplificado:
1. Cliente → Servidor: "Olá, suporto TLS 1.3, aqui meus cipher suites"
2. Servidor → Cliente: Certificado (chave pública + identidade assinada pela CA)
3. Cliente verifica o certificado com a CA confiável
4. Troca de chave de sessão (efêmera, via ECDH)
5. Comunicação cifrada com chave simétrica

Certificado digital:
• Emitido por uma CA (Certificate Authority) confiável — Let's Encrypt, DigiCert
• Contém: domínio, chave pública, validade, assinatura da CA
• Seu navegador tem uma lista de CAs confiáveis pré-instalada`,
    },
  ],
  quiz: [
    {
      question: 'Qual a diferença entre criptografia simétrica e assimétrica?',
      options: [
        'Simétrica usa duas chaves; assimétrica usa uma',
        'Simétrica usa uma chave para cifrar e decifrar; assimétrica usa um par (pública + privada)',
        'Assimétrica é mais rápida e por isso usada para cifrar todos os dados',
        'Simétrica é usada apenas para autenticação',
      ],
      correctIndex: 1,
      explanation: 'Simétrica: uma chave para tudo (rápida). Assimétrica: chave pública cifra / chave privada decifra (lenta mas permite comunicação segura sem compartilhar segredos antes). O HTTPS combina as duas.',
    },
    {
      question: 'Por que senhas devem ser armazenadas como bcrypt/Argon2 e não SHA-256?',
      options: [
        'bcrypt é mais fácil de implementar',
        'SHA-256 não funciona com senhas',
        'bcrypt/Argon2 são intencionalmente lentos, dificultando ataques de força bruta',
        'SHA-256 tem colisões com senhas',
      ],
      correctIndex: 2,
      explanation: 'SHA-256 é rápido demais — um atacante pode testar bilhões de combinações por segundo. bcrypt e Argon2 são deliberadamente lentos e com fator de custo ajustável, tornando ataques de força bruta inviáveis.',
    },
    {
      question: 'O que é uma CA (Certificate Authority)?',
      options: [
        'Um algoritmo de criptografia simétrica',
        'Uma entidade confiável que assina certificados digitais, validando a identidade de servidores',
        'O nome do protocolo que substitui o TLS',
        'Um tipo de firewall de aplicação',
      ],
      correctIndex: 1,
      explanation: 'A CA é uma entidade confiável (Let\'s Encrypt, DigiCert, etc.) que assina certificados digitais. Quando seu navegador vê um certificado assinado por uma CA da sua lista de confiança, sabe que o site é legítimo.',
    },
  ],
};
