# SmartKitchen

O SmartKitchen é uma aplicação de gerenciamento de estoque residencial. Com ele, você controla o que entra e sai da sua despensa, recebe alertas sobre produtos próximos do vencimento e até sugestões de receitas usando os ingredientes disponíveis. Tudo isso de forma simples, rápida e acessível de qualquer lugar.

---

### Filosofia do projeto

Será implementado em forma de API RESTful na arquitetura MVC e terá domínio próprio.

---

### Tecnologias e Ferramentas

-   **JavaScript**
-   **Node v18** (Hydrogen)
-   **Docker** (Opcional do desenvolvedor, mas fortemente recomendado!)
-   **Postgres v16**
-   **Prettier**, **ESLint** e **EditorConfig** - para padronização de estilo de código.
-   **Jest** - para testes automatizados

---

### Deploy e Hospedagem

-   **Vercel** - como plataforma de deploy serverless
-   **GitHub Actions** - Para fluxo de CI/CD
-   **Branch protection rules** para não enviar direto para branch main

---

### Cultura devops

-   **Code Review** - com sugestões de melhoria
-   **Reuniões diárias** - para discutir demandas e dificuldades
-   **GitHub Issues** - rastreamento de tarefas
-   **GitHub Milestones** - Marcos do projeto

---

### Funcionalidades Principais (MVP)

-   **Cadastro rápido de itens** - Adicione produtos com nome, quantidade, data de validade e categoria.
-   **Alertas automáticos** - Receba notificações quando um item estiver perto de acabar ou vencer.
-   **Categorias personalizáveis** - Organize seus produtos por tipo, marca ou localização (ex: prateleira).

---

### Ideias Futuras

-   **Sugestões de receitas** - Recomendações baseadas nos ingredientes que você já tem em casa.
-   **Leitura de código de barras** - Adicione itens ao estoque de forma instantânea usando a câmera.
-   **Integração com IA** - Crie cardápios semanais automaticamente.
-   **Lista de compras inteligente** - Geração automática de listas com base no que está faltando.
-   **Assistente via WhatsApp** - Consulte seu estoque e peça sugestões de receitas através de mensagens.
-   **Compartilhamento familiar** - Permita que todos os membros da família visualizem e atualizem o estoque.

---

### Executar projeto localmente

Para montar o ambiente completo de desenvolvimento, recomendamos fortemente seguir os passos dessa aula aqui do curso.dev: `https://curso.dev/web/ambiente-de-desenvolvimento-windows`

Após terminar essa aula, você já terá no seu ambiente configurado o:

-   WSL2
-   docker
-   Node v18
-   NVM e NPM
-   Git e GitHub
-   Visual Studio Code

Após finalizar essa aula, vá até o diretório raiz do projeto, inicie o PowerShell e, em seguida, o WSL2 digitando apenas `wsl`. Depois, instale as dependências no arquivo `package.json` com o comando `npm i` e suba o ambiente de desenvolvimento com o comando `npm run dev`. Se preferir testar o ambiente, use a opção de dividir o terminal dentro do VSCode e execute no segundo terminal o comando `wsl` e, em seguida, `npm run test` para executar os testes automatizados no ambiente.

---

### Contribuições

#### 1. Criar uma nova branch para funcionalidades ou correções

Sempre que for implementar uma nova funcionalidade, crie uma branch a partir da branch principal `main`:
`git checkout -b nome-da-branch`

#### 2. Fazer commits incrementais

Ao desenvolver, faça commits pequenos e frequentes, descrevendo claramente o que foi alterado em cada commit.

#### 3. Validar alterações

Antes de fazer um push, valide suas alterações para garantir que elas passarão pelo fluxo de CI/CD ao abrir um PR no GitHub. Para isso, rode os comandos:

`npm run lint:prettier:fix` - Para ajustar o estilo de código.
`npm run lint:eslint:check` - Para checar se as convenções de código estão sendo seguidas.
`npm run test` - Para verificar se os testes não apontam algo quebrado.

#### 4. Push da branch para o repositório remoto

Quando tiver um conjunto de commits pronto, envie a branch para o repositório:
`git push -u origin nome-da-feature`

#### 5. Criar um Pull Request

Pela interface do GitHub, abra um Pull Request (PR) no repositório para que outros membros possam revisar o código antes de integrar na branch principal.

#### 6. Manter o padrão de código e revisão

Siga os padronizadores de código definidos pela equipe e participe das revisões de PRs de outros colegas para manter a consistência.
