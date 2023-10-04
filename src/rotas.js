const express = require('express');

const { depositar, sacar, transferir, mostrarSaldo, mostrarExtrato } = require('./controladores/transacoes');
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require('./controladores/contas');
const validaSenhaBanco = require('./intermediarios');

const rotas = express();

rotas.get('/contas', validaSenhaBanco, listarContas); // Listar contas bancárias
rotas.post('/contas', criarConta); //Criar conta bancária
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario); // Atualizar  usuário da conta bancária
rotas.delete('/contas/:numeroConta', excluirConta); // Excluir conta
rotas.post('/transacoes/depositar', depositar); // Depositar
rotas.post('/transacoes/sacar', sacar); // Sacar
rotas.post('/transacoes/transferir', transferir); // Tranferir
rotas.get('/contas/saldo', mostrarSaldo); // Saldo
rotas.get('/contas/extrato', mostrarExtrato); // Extrato

module.exports = rotas;