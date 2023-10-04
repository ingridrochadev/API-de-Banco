let { contas } = require('../bancodedados');
const { verificarCamposPreenchidos, encontrarCpfEmail, validarNumeroConta } = require('./validaçoes');
let numeroConta = 1;

const listarContas = (req, res) => {
    return res.json(contas);
};
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const novaConta = {
        "numero": numeroConta,
        "saldo": "0",
        "usuario": {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };
    if (verificarCamposPreenchidos(req, res)) {
        return verificarCamposPreenchidos(req, res);
    };
    if (encontrarCpfEmail(req, res)) {
        return encontrarCpfEmail(req, res);
    };
    numeroConta++;
    contas.push(novaConta);
    return res.status(203).send();
};
const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;
    if (verificarCamposPreenchidos(req, res)) {
        return verificarCamposPreenchidos(req, res);
    }
    if (encontrarCpfEmail(req, res)) {
        return encontrarCpfEmail(req, res);
    };
    if (validarNumeroConta(numeroConta)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada." })
    }
    const conta = contas.find(conta => conta.numero === Number(numeroConta));
    conta.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };
    return res.status(203).send();
};

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const conta = contas.find(conta => conta.numero === Number(numeroConta));
    if (conta) {
        if (conta.saldo == 0) {
            contas = contas.filter(conta => conta.numero !== Number(numeroConta));
            return res.status(203).send();
        } else {
            return res.status(404).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" });
        }
    };
    return res.status(404).json({ "mensagem": "Conta não encontrada." })
};

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta
}
