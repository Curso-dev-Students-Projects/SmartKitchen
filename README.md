## SmartKitchen

O SmartKitchen é uma aplicação de gerenciamento de estoque residencial. Com ele, você controla o que entra e sai da sua despensa, recebe alertas sobre produtos próximos do vencimento e até sugestões de receitas usando os ingredientes disponíveis. Tudo isso de forma simples, rápida e acessível de qualquer lugar.

**Filosofia do projeto**
Será implementado em forma de API RESTful na arquitetura MVC e terá domínio próprio.

**Tecnologias e Ferramentas**

-   _JavaScript_
-   _Node v18 (Hydrogen)_
-   _Docker_
-   _Postgres v16_
-   _Prettier, ESLint e EditorConfig_ - para padronização de estilo de código.
-   _Jest_ - para testes automatizados

**Deploy e Hospedagem**

-   _Vercel_ - como plataforma de deploy serverless
-   _GitHub Actions_ - Para fluxo de CI/CD
-   _Branch protection rules_ para não enviar direto para branch main

**Cultura devops**

-   _Code Review_ - com sugestões de melhoria
-   _Reuniões diárias_ - para discutir demandas e dificuldades
-   _GitHub Issues_ - rastreamento de tarefas
-   _GitHub Milestones_ - Marcos do projeto

**Funcionalidades Principais (MVP)**

-   _Cadastro rápido de itens_ - Adicione produtos com nome, quantidade, data de validade e categoria.
-   _Alertas automáticos_ - Receba notificações quando um item estiver perto de acabar ou vencer.
-   _Categorias personalizáveis_ - Organize seus produtos por tipo, marca ou localização (ex: prateleira).

**Ideias Futuras**

-   _Sugestões de receitas_ - Recomendações baseadas nos ingredientes que você já tem em casa.
-   _Leitura de código de barras_ - Adicione itens ao estoque de forma instantânea usando a câmera.
-   _Integração com IA_ - Crie cardápios semanais automaticamente.
-   _Lista de compras inteligente_ - Geração automática de listas com base no que está faltando.
-   _Assistente via WhatsApp_ - Consulte seu estoque e peça sugestões de receitas através de mensagens.
-   _Compartilhamento familiar_ - Permita que todos os membros da família visualizem e atualizem o estoque.
