# API RESTful para um Banco Digital

Este projeto é uma API para um Banco Digital. Criado para o Desafio do Módulo 2 do Curso de Backend da Cubos Academy.

Essa RESTful API permite:

- Criar conta bancária
- Listar contas bancárias
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depósitar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

## Como Usar

Para usar a API, envie solicitações HTTP para os seguintes endpoints usando um API CLient, como o Insomnia:

- `GET /contas`: Retorna uma lista de todas as contas cadastrados.
- `POST /contas`:  Cria uma nova conta com base nos dados fornecidos no corpo da solicitação.
- `PUT /contas/:numeroConta/usuario`: Atualiza as informações do usuário com o numero da conta especificado com base nos dados fornecidos no corpo da solicitação.
- `DELETE /contas/:numeroConta`: Remove uma conta com o número da conta especificado na requisição.
- `POST /transacoes/depositar`: Essa rota é pra depositar um valor na conta informada com base nos dados fornecidos no corpo da solicitação.
- `POST /transacoes/sacar`:  Essa rota realiza um saque com base nos dados fornecidos no corpo da solicitação.
- `POST /transacoes/transferir`: Essa rota é pra transferir um valor da conta informada como origem para a conta informada como destino com base nos dados fornecidos no corpo da solicitação.
- `GET /contas/saldo`: Retorna o saldo da conta informada com base nos dados fornecidos no corpo da solicitação.
- `GET /contas/extrato`: Retorna uma lista de todas as transações cadastradas com base nos dados fornecidos no corpo da solicitação.

## Funcionamento da API:

<img width=70% align="center"  src="https://github.com/patriciafraga/BancoDigital/blob/master/Anima%C3%A7%C3%A3o.gif" />

## Contribuindo

Aceitamos contribuições para este projeto! Para contribuir, siga estas etapas:

1. Fork este repositório
2. Crie uma branch com a sua feature: `git checkout -b minha-feature`
3. Faça commit das suas alterações: `git commit -m 'Minha nova feature'`
4. Faça push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
