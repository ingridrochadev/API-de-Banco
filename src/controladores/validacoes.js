let { contas } = require('../bancodedados');

const verificarCamposPreenchidos = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(404).json({ "mensagem": "Todos os dados devem ser preenchidos." });
    };
};
const encontrarCpfEmail = (req, res) => {
    const { cpf, email } = req.body;
    const encontrarCpfEmail = contas.some(conta => email === conta.usuario.email || cpf === conta.usuario.cpf);
    if (encontrarCpfEmail) {
        return res.status(404).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" });
    };
};
const validarNumeroConta = (numeroConta) => {
    let conta = contas.find(conta => conta.numero === Number(numeroConta));
    if (!conta) {
        return true;
    }
};
const validarSenha = (numeroConta, senha) => {
    let conta = contas.find(conta => conta.numero === Number(numeroConta));
    if (!conta) {
        return true;
    }
    if (conta.usuario.senha !== senha) {
        return true;
    }
};
const verificarSaldo = (req, numeroConta) => {
    const { valor } = req.body;
    let conta = contas.find(conta => conta.numero === Number(numeroConta));
    if (conta.saldo < valor) {
        return true;
    }
};
const somarValor = (req, numeroConta) => {
    const { valor } = req.body;
    let conta = contas.find(conta => conta.numero === Number(numeroConta));
    let { saldo } = conta;
    saldo = Number(saldo);
    saldo += Number(valor);
    conta.saldo = saldo;
};
const subtrairValor = (req, numeroConta) => {
    const { valor } = req.body;
    let conta = contas.find(conta => conta.numero === Number(numeroConta));
    let { saldo } = conta;
    saldo = Number(saldo);
    saldo -= Number(valor);
    conta.saldo = saldo;
};

module.exports = {
    verificarCamposPreenchidos,
    encontrarCpfEmail,
    validarNumeroConta,
    validarSenha,
    verificarSaldo,
    somarValor,
    subtrairValor
}