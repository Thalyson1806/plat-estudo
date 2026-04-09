# Plataforma de Estudos UMC

Plataforma colaborativa de estudos para alunos de graduação em Engenharia de Software e áreas relacionadas. Qualquer pessoa pode contribuir com conteúdo, tirar dúvidas no fórum e ajudar outros estudantes.

**Desenvolvedor inicial:** Thalyson Lima

---

## Sobre o projeto

A plataforma nasceu com o objetivo de centralizar material de estudo de qualidade, de forma simples e direta — sem enrolação e sem cara de curso online. O foco é revisão rápida, conteúdo prático e comunidade.

### O que a plataforma oferece

- **Módulos de estudo** com tópicos, exemplos de código e quizzes interativos
- **Fórum** para dúvidas e discussões entre os alunos
- **Contribuição aberta** — qualquer usuário cadastrado pode criar matérias e adicionar tópicos
- **Módulos fixos** com conteúdo já incluso: Python, Redes e Segurança, Sistemas Operacionais

### Módulos incluídos por padrão

| Módulo | Tópicos | Conteúdo |
|---|:---:|---|
| 🐍 Python | 12 | Variáveis, estruturas de controle, listas, strings, boas práticas... |
| 🔒 Redes e Segurança | 8 | OSI, TCP/IP, DNS, HTTP/HTTPS, Firewall, Criptografia, Ataques, VPN |
| 🖥️ Sistemas Operacionais | 8 | Processos, Threads, Escalonamento, Memória, Deadlock, I/O... |

---

## Como contribuir com conteúdo

Existem duas formas de contribuir com conteúdo:

### Pelo site (sem precisar de código)
1. Crie uma conta na plataforma
2. Acesse **Matérias** → **Nova matéria** para criar uma matéria nova
3. Dentro de qualquer matéria, clique em **Adicionar tópico**
4. Escreva o conteúdo e salve — fica disponível para todos na hora

### Pelo código (módulos estáticos)
Para adicionar conteúdo nos módulos fixos (Python, Redes, SO) ou criar um novo módulo estático:

1. Fork o repositório
2. Adicione os arquivos de tópico em `data/[nome-do-modulo]/`
3. Crie ou atualize o `index.ts` do módulo
4. Abra um Pull Request descrevendo o que foi adicionado

Veja como os arquivos de `data/redes-seguranca/` estão estruturados como referência.

---

## Permissões

| Ação | Visitante | Usuário | Admin |
|---|:---:|:---:|:---:|
| Ver matérias e tópicos | ✅ | ✅ | ✅ |
| Ver e ler o fórum | ✅ | ✅ | ✅ |
| Criar matéria | ❌ | ✅ | ✅ |
| Adicionar tópico | ❌ | ✅ | ✅ |
| Criar/responder no fórum | ❌ | ✅ | ✅ |
| Editar/apagar próprio conteúdo | ❌ | ✅ | ✅ |
| Apagar qualquer conteúdo | ❌ | ❌ | ✅ |
| Apagar matérias | ❌ | ❌ | ✅ |

---

## Reportar problemas

Encontrou um bug ou tem uma sugestão? Abra uma [issue](../../issues) descrevendo:
- O que aconteceu
- O que você esperava que acontecesse
- Como reproduzir (se for um bug)

---

## Stack técnica

Next.js 16 · TypeScript · Tailwind CSS · Auth.js v5 · Drizzle ORM · Neon (PostgreSQL) · Vercel

---

## Licença

MIT — use, modifique e distribua livremente, desde que mantenha a atribuição.
