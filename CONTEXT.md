# Projeto Telefônica / Vivo Clone

## Objetivo Principal
Criar um clone do site da Vivo (E-commerce e Portais) para servir como portfólio de peso.
**Objetivo de Carreira:** Conquistar a vaga de **Desenvolvedor Full Stack Pleno | E-Commerce e Portais | São Paulo** na Telefônica/Vivo.

## Contexto de Negócio (Domínio Vivo)
- **E-commerce vs Sistema de Planos:** A Vivo possui seu E-commerce tradicional, mas também um **Sistema de Planos dedicado**. Nossa API deve refletir essa modelagem.
- **Integração Mobile (WebViews):** A arquitetura dos portais/sistemas web da Vivo é fortemente consumida através de **WebViews** (provavelmente no app Meu Vivo). Isso exige APIs otimizadas e tratamento rigoroso de CORS/Tokens.
- **Padrão API Gateway / BFF:** O front-end atua como uma vitrine que unifica dados de vários microsserviços do back-end.

## Escopo Estratégico do Portfólio (A "Fatia Vertical")
Como construir a Telefônica inteira é inviável, o projeto focará em uma **Fatia Vertical** de alta complexidade para demonstrar senioridade. O backend será focado em 3 pilares:
1. **Módulo de Planos:** O Core Domain do negócio. (Listagem, Criação e Filtros de planos B2C).
2. **Módulo de Usuários e Autenticação (JWT):** Simula a área de "Autoatendimento". Focado em segurança e perfis.
3. **Módulo de Assinatura/Checkout:** Onde o *Usuário* adquire um *Plano*. Este módulo é crucial pois demonstra habilidade de **integração entre bounded contexts** (requisito forte da vaga).

## Regras de Interação com o Mentor (IA)
- **NÃO ESCREVER CÓDIGO PRONTO:** O mentor atua como Tech Lead. Ele explica, guia e desenha no quadro branco, mas o usuário é quem digita o código.
- **Padrão Arquitetural:** Clean Architecture "Feature-First" (inspirado no padrão do Aluizio Developer).
- **Testes (TDD):** Seguir estritamente o ciclo Red-Green-Refactor com Jest (Unitário e E2E).

## Mapeamento de Requisitos da Vaga vs. Projeto Atual

### Back-end (O que estamos fazendo agora)
- [x] **Domínio de Node.js com NestJS para construção de APIs:** API construída do zero com Clean Architecture pesada.
- [x] **Familiaridade com bancos de dados relacionais e uso de ORMs:** PostgreSQL via Docker e Prisma ORM.
- [x] **Experiência com Docker:** Banco de dados rodando em container.
- [x] **Experiência com testes automatizados (Jest):** Cobertura TDD absoluta (Testes Unitários com Mocks/Spies e Testes E2E isolados).
- [x] **Boas práticas e Code Review:** Aplicando SOLID, DRY, Exception Filters globais, DTOs com class-validator e Mappers.

### Front-end (Próximas etapas)
- [ ] **Experiência sólida com React e ecossistema front-end:** TypeScript, consumo desta API REST.
- [ ] **Arquitetura para WebViews:** Componentização focada em performance mobile-first.
- [ ] **Testes de Front-end:** React Testing Library.

### DevOps / Cloud (Diferenciais para aplicar depois)
- [ ] **Conhecimento em AWS:** Fazer deploy da API (EC2, Lambda) e assets do front-end (S3).
- [ ] **CI/CD e pipelines de deploy:** Criar Github Actions para rodar testes Jest.

---
*Este documento serve como a Estrela Guia do projeto. Cada feature desenvolvida deve ser um argumento de venda na entrevista técnica da Vivo.*
