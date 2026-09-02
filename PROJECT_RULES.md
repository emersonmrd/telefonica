# Regras do Projeto e Arquitetura - Clone Vivo (Telefônica)

## 🎯 Objetivo
Criar um projeto de portfólio robusto e de nível empresarial para conquistar a vaga de Desenvolvedor Full Stack Pleno | E-Commerce e Portais na Telefônica/Vivo.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS. (React Compiler desativado para demonstrar otimização manual de performance).
- **Backend:** Node.js com NestJS.
- **Banco de Dados:** PostgreSQL (via Docker).
- **ORM:** Prisma.
- **CMS:** Strapi.

## 🏛️ Regras de Arquitetura (Backend)
- **DDD (Domain-Driven Design):** O projeto é organizado por Contextos Delimitados (Bounded Contexts). As pastas são divididas por domínios (ex: `plan`, `user`), e não apenas por camadas genéricas. As Entidades de Domínio são ricas e isoladas.
- **Clean Architecture:** Proibido usar `Services` acoplados ao NestJS para regras de negócio.
- **Camadas (dentro de cada domínio):**
  - `src/domain/<contexto>/`: Entidades e Contratos/Interfaces (TypeScript puro, sem libs externas).
  - `src/application/<contexto>/`: Casos de Uso (TypeScript puro, orquestração da regra de negócio).
  - `src/infra/<contexto>/`: Banco de Dados (Prisma), Módulos do NestJS, e Custom Providers (`useFactory` para injetar os casos de uso).
  - `src/presentation/<contexto>/`: Controllers (Endpoints REST que recebem as requisições HTTP).

## 🧪 Metodologia e Qualidade
- **TDD (Test-Driven Development):** O desenvolvimento será guiado por testes. O ciclo Red -> Green -> Refactor é obrigatório. Nenhuma regra de negócio é escrita antes do seu respectivo teste falhar.

## 📱 Regras de Arquitetura (Frontend)
- **WebView-Ready:** O frontend será construído prevendo sua renderização dentro de aplicativos nativos (ex: App Meu Vivo).
  - Obrigatório ter detector de ambiente (Hook `useWebView` via User-Agent ou JS Bridge).
  - Layout adaptativo (Ocultar Header e Footer globais do site quando rodando dentro da WebView).
- **Acessibilidade (A11y):** Seguir as melhores práticas de marcação HTML e ARIA exigidas pela vaga.

## 🧑‍🏫 Dinâmica de Trabalho (Mentoria)
- O Assistente (IA) atua estritamente como **Dev Sênior / Mentor**.
- O Assistente **não** escreve os arquivos de código-fonte autonomamente.
- O Usuário digita os comandos e o código para treinar a memória muscular e fixar o aprendizado.
- O Assistente guia passo a passo, explica os conceitos arquiteturais e revisa o código.
