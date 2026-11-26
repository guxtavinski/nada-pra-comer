# Nada pra comer nessa casa

Aplicativo mobile de planejamento de refeições feito com **React Native + Expo**. O usuário informa quantas pessoas vão comer, por quantos dias, quanto pretende gastar, o que já tem em casa e suas preferências alimentares. O app monta um cardápio com receitas compatíveis e gera a lista de compras.

Projeto acadêmico da atividade de Programação de App (Desenvolvimento de Aplicativo Mobile).

## O problema que resolve

Decidir o que cozinhar, comprar só o necessário e não estourar o orçamento toma tempo e gera desperdício. O app une as duas tarefas: sugere o cardápio e já entrega a lista de compras, descontando o que a pessoa tem em casa.

## Funcionalidades

- Configuração do planejamento: pessoas, dias, refeições e orçamento.
- Preferências: alimentos que já tem em casa (cards selecionáveis), padrão alimentar (onívoro, vegetariano, vegano), estilo de dieta, alergias e intolerâncias e eletrodomésticos disponíveis.
- Geração de cardápio considerando todos os filtros e o orçamento.
- Troca de uma receita específica por outra compatível, sem alterar o resto do cardápio.
- Detalhes da receita: ingredientes ajustados ao número de pessoas, modo de preparo, custo estimado e informações nutricionais.
- Lista de compras agrupada por categoria, sem os itens que já estão em casa, com marcação de itens comprados.

## Tecnologias

- React Native
- Expo e Expo Router
- TypeScript
- StyleSheet
- Dados locais (receitas em TypeScript, sem API nem banco remoto)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org) (versão LTS).

```bash
git clone https://github.com/guxtavinski/nada-pra-comer.git
cd nada-pra-comer
npm install
npx expo start -c
```

Depois, escolha uma opção:

- **Celular:** instale o app **Expo Go** e escaneie o QR code exibido no terminal. Se a rede bloquear a conexão, use `npx expo start --tunnel`.
- **Navegador:** pressione `w` no terminal.

## Estrutura do projeto

```
assets/images/receitas/   fotos das receitas
src/
  app/                    telas (Expo Router)
  components/             componentes reutilizáveis
  context/                estado global do planejamento
  data/                   receitas e imagens
  theme/                  cores e espaçamentos
  types/                  tipos TypeScript
  utils/                  geração do cardápio e da lista de compras
```

## Como o cardápio é gerado

1. As receitas são filtradas por refeição, padrão alimentar, alergias e eletrodomésticos. O estilo de dieta só é relaxado quando não restar nenhuma opção.
2. O app sorteia as receitas evitando repetições e tenta várias combinações até ficar dentro do orçamento.
3. A lista de compras soma os ingredientes, ajusta as quantidades ao número de pessoas e remove os itens que o usuário já tem em casa.
