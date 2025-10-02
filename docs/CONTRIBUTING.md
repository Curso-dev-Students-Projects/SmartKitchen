# Procedimento para Implementar uma Nova Feature

## 1. Criar uma nova branch para a feature

Sempre que for implementar uma nova funcionalidade, crie uma branch a partir da branch principal (`main` ou `master`):

```bash
git checkout -b nome-da-feature
```

## 2. Fazer commits incrementais

Ao desenvolver, faça commits pequenos e frequentes, descrevendo claramente o que foi alterado em cada commit.

## 3. Push da branch para o repositório remoto

Quando tiver um conjunto de commits pronto, envie a branch para o repositório:

```bash
git push -u origin nome-da-feature
```

## 4. Criar um Pull Request

Abra um Pull Request (PR) no repositório para que outros membros possam revisar o código antes de integrar na branch principal.

## 5. Manter o padrão de código e revisão

Siga os padronizadores de código definidos pela equipe e participe das revisões de PRs de outros colegas para manter a consistência.
