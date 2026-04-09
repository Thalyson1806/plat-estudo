import type { Topic } from '@/lib/types';

export const sistemasArquivos: Topic = {
  slug: '06-sistemas-arquivos',
  number: 6,
  title: 'Sistemas de Arquivos',
  emoji: '📁',
  shortDescription: 'Como o SO organiza, armazena e recupera dados no disco.',
  sections: [
    {
      title: 'O que é um sistema de arquivos?',
      content: `Um sistema de arquivos (filesystem) é a estrutura de dados que o SO usa para organizar e acessar dados em dispositivos de armazenamento (HD, SSD, pen drive).

Sem filesystem, o disco seria apenas uma sequência de bits sem estrutura.

Componentes principais:
• Arquivo: sequência de bytes com nome e metadados
• Diretório (pasta): container que agrupa arquivos e outros diretórios
• Inode (Unix): estrutura que armazena metadados de um arquivo
• Bloco: unidade mínima de armazenamento (geralmente 4KB)

Metadados de um arquivo:
• Tamanho
• Permissões (leitura, escrita, execução)
• Dono (usuário e grupo)
• Timestamps (criação, modificação, acesso)
• Ponteiros para os blocos de dados no disco`,
    },
    {
      title: 'Sistemas de arquivos comuns',
      content: `ext4 (Linux):
• Padrão no Linux há muitos anos
• Journaling: registra operações antes de executar → recuperação após crash
• Suporte a arquivos de até 16TB

NTFS (Windows):
• Padrão no Windows desde NT
• Suporte a permissões, compressão, criptografia (BitLocker)
• Journaling robusto

FAT32 / exFAT:
• FAT32: compatível com tudo, limite de 4GB por arquivo
• exFAT: para pen drives/SD cards — sem limite prático de tamanho
• Sem journaling → mais vulnerável a corrupção

APFS (macOS/iOS):
• Snapshots, clonagem instantânea, criptografia nativa
• Otimizado para SSD

ZFS / Btrfs:
• Sistemas modernos com integridade de dados (checksums)
• Snapshots, RAID embutido
• Usados em servidores e NAS`,
      codeExample: {
        language: 'bash',
        code: `# Ver sistemas de arquivos montados
df -h

# Ver inode de um arquivo
stat arquivo.txt
ls -i arquivo.txt

# Verificar espaço em disco
du -sh /var/log/*

# Verificar e reparar filesystem ext4
sudo fsck /dev/sda1

# Criar filesystem ext4 em uma partição
sudo mkfs.ext4 /dev/sdb1

# Montar partição
sudo mount /dev/sdb1 /mnt/dados`,
        explanation: 'Comandos essenciais para gerenciar discos e sistemas de arquivos em servidores Linux.',
      },
    },
    {
      title: 'Permissões Unix',
      content: `No Unix/Linux, cada arquivo tem permissões para 3 categorias:
  dono (user), grupo, outros (others)

Cada categoria tem 3 bits: r (read=4), w (write=2), x (execute=1)

Exemplo: -rwxr-xr--
  - = arquivo comum (d = diretório, l = link)
  rwx = dono: leitura + escrita + execução (7)
  r-x = grupo: leitura + execução (5)
  r-- = outros: somente leitura (4)
  Notação octal: 754

Permissões especiais:
  SUID (4000): executa com permissões do dono
  SGID (2000): herda grupo do diretório
  Sticky bit (1000): só o dono pode apagar (ex: /tmp)`,
      tip: 'chmod 755 é padrão para executáveis públicos. chmod 600 para chaves SSH (só o dono lê/escreve). chmod 644 para arquivos de configuração.',
    },
  ],
  quiz: [
    {
      question: 'O que é um inode em sistemas Unix?',
      options: [
        'O nome do arquivo no diretório',
        'Uma estrutura que armazena metadados de um arquivo (permissões, tamanho, timestamps, ponteiros para dados)',
        'Um bloco de dados de 4KB no disco',
        'Um tipo especial de arquivo para links simbólicos',
      ],
      correctIndex: 1,
      explanation: 'Inode (index node) contém todos os metadados de um arquivo: permissões, dono, tamanho, timestamps e ponteiros para os blocos de dados no disco. O nome do arquivo está no diretório, não no inode.',
    },
    {
      question: 'O que é journaling em um sistema de arquivos?',
      options: [
        'Um sistema de backup automático de arquivos',
        'O log de acesso de quem leu cada arquivo',
        'O registro de operações pendentes que permite recuperação após um crash',
        'Um sistema de compressão de arquivos pouco usados',
      ],
      correctIndex: 2,
      explanation: 'Journaling registra operações em um journal (log) antes de executá-las. Se o sistema travar no meio de uma operação, o filesystem pode consultar o journal para completar ou desfazer a operação, evitando corrupção.',
    },
    {
      question: 'O que significa a permissão chmod 755 em Unix?',
      options: [
        'Dono: somente leitura; Grupo: leitura e escrita; Outros: execução',
        'Dono: leitura, escrita e execução (7); Grupo: leitura e execução (5); Outros: leitura e execução (5)',
        'Apenas o dono pode acessar o arquivo',
        'Todos podem ler, escrever e executar o arquivo',
      ],
      correctIndex: 1,
      explanation: '7 = rwx (4+2+1), 5 = r-x (4+1). Então 755 = dono tem controle total, grupo e outros podem ler e executar mas não escrever. Padrão para executáveis e diretórios públicos.',
    },
  ],
};
