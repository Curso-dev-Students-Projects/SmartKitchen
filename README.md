# SmartKitchen

O SmartKitchen é uma aplicação de gerenciamento de estoque residencial. Com ele, você controla o que entra e sai da sua despensa, recebe alertas sobre produtos próximos do vencimento e até sugestões de receitas usando os ingredientes disponíveis. Tudo isso de forma simples, rápida e acessível de qualquer lugar.

#### Filosofia do projeto

Será implementado em forma de API RESTful na arquitetura MVC e terá domínio próprio.

#### Tecnologias e Ferramentas

-   _JavaScript_
-   _Node v18 (Hydrogen)_
-   _Docker_ (Opcional do desenvolvedor)
-   _Postgres v16_
-   _Prettier, ESLint e EditorConfig_ - para padronização de estilo de código.
-   _Jest_ - para testes automatizados

#### Deploy e Hospedagem

-   _Vercel_ - como plataforma de deploy serverless
-   _GitHub Actions_ - Para fluxo de CI/CD
-   _Branch protection rules_ para não enviar direto para branch main

#### Cultura devops

-   _Code Review_ - com sugestões de melhoria
-   _Reuniões diárias_ - para discutir demandas e dificuldades
-   _GitHub Issues_ - rastreamento de tarefas
-   _GitHub Milestones_ - Marcos do projeto

#### Funcionalidades Principais (MVP)

-   _Cadastro rápido de itens_ - Adicione produtos com nome, quantidade, data de validade e categoria.
-   _Alertas automáticos_ - Receba notificações quando um item estiver perto de acabar ou vencer.
-   _Categorias personalizáveis_ - Organize seus produtos por tipo, marca ou localização (ex: prateleira).

#### Ideias Futuras

-   _Sugestões de receitas_ - Recomendações baseadas nos ingredientes que você já tem em casa.
-   _Leitura de código de barras_ - Adicione itens ao estoque de forma instantânea usando a câmera.
-   _Integração com IA_ - Crie cardápios semanais automaticamente.
-   _Lista de compras inteligente_ - Geração automática de listas com base no que está faltando.
-   _Assistente via WhatsApp_ - Consulte seu estoque e peça sugestões de receitas através de mensagens.
-   _Compartilhamento familiar_ - Permita que todos os membros da família visualizem e atualizem o estoque.
    </br>

### Executar projeto localmente:

Para montar o ambiente completo de desenvolvimento recomendamos fortemente seguir os passos dessa aula aqui do `curso.dev`: https://curso.dev/web/ambiente-de-desenvolvimento-windows
Após terminar essa aula, já terá no seu ambiente configurado o:

    WSL2
    docker
    Node v18
    NVM e NPM
    Git e GitHub
    Visua Studio Code

Após finalizar essa aula, ir até o diretório raiz do projeto, iniciar PowerShell e iniciar o WSL2 digitando apenas `WSL`, em seguida, instale as dependencias no arquivo `package.json` com o comando `npm i`, e suba o ambiente de desenvolvimento com o comando `npm run dev`. Se preferir testar o ambiente, use a opção de dividir o terminal dentro do vscode e execute no segundo terminal o comando `WSL`, e em seguida `npm run test`, para executar os testes automatizados no ambiente.
</br>

### Contribuições

#### 1. Criar uma nova branch para a funcionalidades ou correções

Sempre que for implementar uma nova funcionalidade, crie uma branch a partir da branch principal `main`:
`git checkout -b nome-da-branch`
</br>

#### 2. Fazer commits incrementais

Ao desenvolver, faça commits pequenos e frequentes, descrevendo claramente o que foi alterado em cada commit.
</br>

#### 3. Validar alterações

Antes de fazer um push, faça a validação das suas alterações, para garantir que vai passar pelo fluxo de CI/CD ao abrir um `PR` no gitHub, faça isso rodando os comandos:

    npm run lint:prettier:fix   -Para ajustar o estilo de código.
    npm run lint:eslint:check   -Para checar se as convenções de código estão sendo seguidas.
    npm run test                -Para ver se os testes não apontam algo quebrado.

#### 4. Push da branch para o repositório remoto

Quando tiver um conjunto de commits pronto, envie a branch para o repositório:
`git push -u origin nome-da-feature`
</br>

#### 5. Criar um Pull Request

Pela interface do gitHub, abra um Pull Request (PR) no repositório para que outros membros possam revisar o código antes de integrar na branch principal.
</br>

#### 6. Manter o padrão de código e revisão

Siga os padronizadores de código definidos pela equipe e participe das revisões de PRs de outros colegas para manter a consistência.
