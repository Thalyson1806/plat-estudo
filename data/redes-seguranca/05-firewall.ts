import type { Topic } from '@/lib/types';

export const firewall: Topic = {
  slug: '05-firewall',
  number: 5,
  title: 'Firewall e Segurança de Rede',
  emoji: '🛡️',
  shortDescription: 'Como filtrar tráfego e proteger redes de ataques externos.',
  sections: [
    {
      title: 'O que é um Firewall?',
      content: `Um firewall é um sistema (hardware ou software) que monitora e controla o tráfego de rede com base em regras de segurança. Ele age como um porteiro: deixa passar o que é permitido e bloqueia o resto.

Tipos de firewall:

• Packet Filter: analisa cabeçalhos dos pacotes (IP, porta, protocolo)
  → Mais simples e rápido, mas sem contexto

• Stateful Inspection: rastreia o estado das conexões
  → Sabe se um pacote faz parte de uma conexão legítima

• Application Layer (WAF): analisa conteúdo da aplicação
  → Detecta ataques como SQL Injection e XSS

• Next-Generation Firewall (NGFW): combina tudo acima + IPS + inspeção profunda`,
      tip: 'Um firewall de borda protege a rede externa. Um firewall no host protege o próprio servidor. Use ambos.',
    },
    {
      title: 'Regras de firewall',
      content: `Regras definem o que é permitido ou bloqueado. A ordem importa: a primeira regra que casar é aplicada.

Elementos de uma regra:
• Origem (IP de quem envia)
• Destino (IP de quem recebe)
• Porta/Protocolo
• Ação: ALLOW ou DENY

Exemplo de política típica:
  ALLOW  entrada  porta 443  (HTTPS público)
  ALLOW  entrada  porta 22   (SSH só do meu IP)
  DENY   entrada  tudo       (bloqueia o resto)
  ALLOW  saída    tudo       (servidor pode sair)`,
      codeExample: {
        language: 'bash',
        code: `# UFW (Uncomplicated Firewall) no Linux Ubuntu

# Habilitar firewall
sudo ufw enable

# Liberar HTTPS
sudo ufw allow 443/tcp

# Liberar SSH só de um IP específico
sudo ufw allow from 203.0.113.5 to any port 22

# Bloquear porta 3306 (MySQL) externamente
sudo ufw deny 3306

# Ver regras ativas
sudo ufw status verbose`,
        explanation: 'UFW é o firewall padrão do Ubuntu. Simples de usar e suficiente para a maioria dos servidores web.',
      },
    },
    {
      title: 'DMZ e segmentação de rede',
      content: `A DMZ (Demilitarized Zone) é uma rede intermediária entre a internet e a rede interna.

Internet → [Firewall externo] → DMZ → [Firewall interno] → Rede interna

Na DMZ ficam servidores que precisam ser públicos (web, email).
Na rede interna ficam banco de dados, servidores internos.

Mesmo que um atacante comprometa o servidor web na DMZ, ele ainda precisa passar pelo segundo firewall para acessar o banco de dados.`,
    },
  ],
  quiz: [
    {
      question: 'O que é um WAF (Web Application Firewall)?',
      options: [
        'Um firewall que filtra apenas por endereço IP',
        'Um firewall que analisa o conteúdo da camada de aplicação, detectando ataques como SQL Injection',
        'Um roteador com função de NAT',
        'Um software antivírus para servidores',
      ],
      correctIndex: 1,
      explanation: 'WAF (Web Application Firewall) opera na camada de aplicação (HTTP) e inspeciona o conteúdo das requisições, bloqueando ataques como SQL Injection, XSS e CSRF antes de chegarem à aplicação.',
    },
    {
      question: 'Por que a ordem das regras em um firewall é importante?',
      options: [
        'Não é importante, todas as regras são avaliadas igualmente',
        'Apenas a última regra é aplicada',
        'A primeira regra que casar com o pacote é aplicada, ignorando as demais',
        'Regras DENY sempre têm prioridade sobre ALLOW, independente da ordem',
      ],
      correctIndex: 2,
      explanation: 'Firewalls processam regras em ordem e aplicam a primeira que corresponder ao tráfego. Uma regra ALLOW antes de um DENY geral pode deixar passar tráfego que deveria ser bloqueado.',
    },
    {
      question: 'Qual é o objetivo de uma DMZ (Demilitarized Zone)?',
      options: [
        'Substituir o firewall principal por ser mais segura',
        'Isolar servidores públicos da rede interna, adicionando uma camada extra de proteção',
        'Permitir que usuários externos acessem a rede interna com segurança',
        'Bloquear todo o tráfego externo',
      ],
      correctIndex: 1,
      explanation: 'A DMZ coloca servidores públicos (como web servers) em uma rede intermediária. Mesmo comprometidos, o atacante ainda enfrenta outro firewall para chegar à rede interna.',
    },
  ],
};
