let { contas, saques, depositos, transferencias } = require('../bancodedados');
const { validarSenha, verificarSaldo, somarValor, subtrairValor, validarNumeroConta } = require('./validaçoes');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor) {
        return res.status(400).json({ "mensagem": "O número da conta e o valor são obrigatórios!" });
    }
    if (validarNumeroConta(numero_conta)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada." })
    }
    if (Number(valor) <= 0) {
        return res.status(404).json({ "mensagem": "Valor insuficiente." });
    }
    somarValor(req, numero_conta);
    depositos.push({
        numero_conta,
        valor
    });
    return res.status(201).send();
};

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ "mensagem": "Todos os dados são obrigatórios!" });
    };
    if (validarNumeroConta(numero_conta)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada." })
    };
    if (validarSenha(numero_conta, senha)) {
        return res.status(403).json({ "mensagem": "Senha incorreta." })
    };
    if (verificarSaldo(req, numero_conta)) {
        return res.status(404).json({ "mensagem": "Saldo insuficiente." })
    };
    subtrairValor(req, numero_conta);
    saques.push({
        numero_conta,
        valor
    });
    return res.status(201).send();
};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
        return res.status(400).json({ "mensagem": "Todos os dados são obrigatórios!" });
    };
    if (validarNumeroConta(numero_conta_origem)) {
        return res.status(404).json({ "mensagem": "Conta de origem não encontrada." })
    };
    if (validarNumeroConta(numero_conta_destino)) {
        return res.status(404).json({ "mensagem": "Conta de destino não encontrada." })
    };
    if (validarSenha(numero_conta_origem, senha)) {
        return res.status(403).json({ "mensagem": "Senha incorreta." })
    };
    if (verificarSaldo(req, numero_conta_origem)) {
        return res.status(400).json({ "mensagem": "Saldo insuficiente." })
    };
    subtrairValor(req, numero_conta_origem);
    somarValor(req, numero_conta_destino);
    transferencias.push({
        numero_conta_origem,
        numero_conta_destino,
        valor
    });
    return res.status(201).send();
};

const mostrarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
        return res.status(400).json({ "mensagem": "O número da conta e a senha são obrigatórios!" });
    };
    if (validarNumeroConta(numero_conta)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada." })
    };
    if (validarSenha(numero_conta, senha)) {
        return res.status(403).json({ "mensagem": "Senha incorreta." })
    };
    let conta = contas.find(conta => conta.numero === Number(numero_conta));
    const saldo = conta.saldo;
    return res.status(200).json({ saldo });
};

const mostrarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
        return res.status(400).json({ "mensagem": "O número da conta e a senha são obrigatórios!" });
    };
    if (validarNumeroConta(numero_conta)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada." })
    };
    if (validarSenha(numero_conta, senha)) {
        return res.status(403).json({ "mensagem": "Senha incorreta." })
    };
    const depositosExtrato = depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saquesExtrato = saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasEnviadasExtrato = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidasExtrato = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);
    const relatorioDeConta = {
        "depositos": depositosExtrato,
        "saques": saquesExtrato,
        "transferenciasEnviadas": transferenciasEnviadasExtrato,
        "transferenciasRecebidas": transferenciasRecebidasExtrato
    };
    return res.status(200).json({ relatorioDeConta });
};

module.exports = {
    depositar,
    sacar,
    transferir,
    mostrarSaldo,
    mostrarExtrato
}