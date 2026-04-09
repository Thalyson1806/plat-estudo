import type { Topic } from '@/lib/types';

export const vpnProxy: Topic = {
  slug: '08-vpn-proxy',
  number: 8,
  title: 'VPN e Proxy',
  emoji: '🕵️',
  shortDescription: 'Privacidade, anonimato e acesso seguro a redes remotas.',
  sections: [
    {
      title: 'O que é uma VPN?',
      content: `VPN (Virtual Private Network) cria um túnel criptografado entre seu dispositivo e um servidor VPN. Todo tráfego passa por esse túnel.

Como funciona:
1. Seu dispositivo se conecta ao servidor VPN
2. Um túnel criptografado é estabelecido (ex: WireGuard, OpenVPN)
3. Todo tráfego sai pelo IP do servidor VPN
4. Sites e serviços veem o IP do servidor, não o seu

Casos de uso:
• Acesso remoto seguro à rede corporativa
• Proteger tráfego em Wi-Fi públicos
• Contornar restrições geográficas
• Privacidade (dificulta rastreamento pelo provedor)

Limitações:
• VPN não = anonimato total — o provedor da VPN vê seu tráfego
• Aumenta latência (dados passam por servidor extra)
• Não protege contra malware ou phishing`,
      tip: 'Empresas usam VPN para que funcionários remotos acessem sistemas internos com segurança, como se estivessem no escritório.',
    },
    {
      title: 'Proxy vs VPN',
      content: `Proxy e VPN têm funções parecidas mas diferenças importantes:

PROXY:
• Intermediário para requisições específicas (HTTP/HTTPS)
• Geralmente sem criptografia forte
• Não protege todo o tráfego do sistema
• Mais rápido e simples
• Uso comum: cache corporativo, filtro de conteúdo

VPN:
• Tunela TODO o tráfego do sistema operacional
• Criptografia forte de ponta a ponta
• Muda seu IP aparente globalmente
• Mais lento devido à criptografia

Reverse Proxy (ex: Nginx):
• Fica na frente dos servidores, não dos clientes
• Distribui requisições, balanceia carga
• Faz TLS termination, caching, compressão
• Exemplos: Nginx, Traefik, Cloudflare`,
      codeExample: {
        language: 'ini',
        code: `# Configuração básica de WireGuard VPN (servidor)
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <chave-privada-servidor>

[Peer]
PublicKey = <chave-publica-cliente>
AllowedIPs = 10.0.0.2/32

---

# Cliente
[Interface]
Address = 10.0.0.2/24
PrivateKey = <chave-privada-cliente>
DNS = 1.1.1.1

[Peer]
PublicKey = <chave-publica-servidor>
Endpoint = servidor.com:51820
AllowedIPs = 0.0.0.0/0`,
        explanation: 'WireGuard é o protocolo VPN moderno — mais simples, mais rápido e mais seguro que OpenVPN ou IPSec.',
      },
    },
    {
      title: 'Tor: o anonimato real',
      content: `O Tor (The Onion Router) vai além de uma VPN para anonimato real:

• Tráfego passa por 3 nós aleatórios (entrada, meio, saída)
• Cada nó conhece apenas o anterior e o próximo — ninguém vê o caminho completo
• Criptografia em camadas (como uma cebola)
• O nó de saída vê o destino mas não sabe quem é o usuário
• Muito mais lento que VPN

Tor é adequado para:
• Jornalistas e ativistas em regimes autoritários
• Acesso a .onion (serviços ocultos)
• Pesquisa de segurança

Tor não é adequado para:
• Streaming ou uso casual (muito lento)
• Anonimato perfeito (comportamento, JavaScript podem deanonimizar)`,
    },
  ],
  quiz: [
    {
      question: 'Qual é a principal diferença entre um Proxy e uma VPN?',
      options: [
        'Proxy é gratuito e VPN é sempre pago',
        'VPN tunela e criptografa todo o tráfego do sistema; Proxy geralmente intercepta apenas requisições específicas',
        'Proxy é mais seguro pois usa TLS duplo',
        'VPN funciona apenas em celulares',
      ],
      correctIndex: 1,
      explanation: 'VPN opera em nível de sistema operacional e cifra todo o tráfego. Proxy opera em nível de aplicação (geralmente HTTP/S) e não necessariamente cifra o tráfego ou cobre todos os protocolos.',
    },
    {
      question: 'Para que empresas normalmente usam VPN?',
      options: [
        'Para bloquear acesso dos funcionários à internet',
        'Para esconder o endereço IP do servidor web',
        'Para que funcionários remotos acessem redes internas com segurança',
        'Para substituir o HTTPS nas conexões internas',
      ],
      correctIndex: 2,
      explanation: 'VPN corporativa permite que funcionários remotos se conectem à rede interna da empresa com segurança, acessando sistemas internos como se estivessem fisicamente no escritório.',
    },
    {
      question: 'O que é um Reverse Proxy?',
      options: [
        'Uma VPN que funciona ao contrário (do servidor para o cliente)',
        'Um proxy que fica na frente dos servidores, recebendo requisições e distribuindo para os backends',
        'Um servidor DNS que resolve nomes ao contrário (IP → domínio)',
        'Um proxy que bloqueia requisições maliciosas',
      ],
      correctIndex: 1,
      explanation: 'Reverse proxy fica na frente dos servidores (não dos clientes). Recebe requisições da internet e as distribui para servidores internos. Usado para balanceamento de carga, TLS termination e caching. Nginx e Traefik são exemplos comuns.',
    },
  ],
};
