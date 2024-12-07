// Importação das bibliotecas
const express = require('express');
const rotas = express.Router();

// Dados simulados da garagem
const veiculos = [
  { id: 1, nome: 'Gol', fabricante: 'Volkswagen', ano: 2020, combustivel: 'Gasolina', cor: 'Prata', preco: 45000 },
  { id: 2, nome: 'Onix', fabricante: 'Chevrolet', ano: 2021, combustivel: 'Flex', cor: 'Branco', preco: 55000 },
  { id: 3, nome: 'Civic', fabricante: 'Honda', ano: 2019, combustivel: 'Gasolina', cor: 'Preto', preco: 90000 },
  { id: 4, nome: 'Corolla', fabricante: 'Toyota', ano: 2022, combustivel: 'Híbrido', cor: 'Cinza', preco: 120000 },
  { id: 5, nome: 'Uno', fabricante: 'Fiat', ano: 2018, combustivel: 'Álcool', cor: 'Vermelho', preco: 30000 },
];

// Rota: Adicionar veículo (POST)
rotas.post('/', (req, res) => {
  const { nome, fabricante, ano, combustivel, cor, preco } = req.body;
  const novoVeiculo = { id: veiculos.length + 1, nome, fabricante, ano, combustivel, cor, preco };
  veiculos.push(novoVeiculo);
  res.status(201).json({
    mensagem: 'Veículo cadastrado com sucesso.',
    veiculo: novoVeiculo,
  });
});

// Rota: Atualizar preço do veículo (PUT)
rotas.put('/', (req, res) => {
  const { id, preco } = req.body;
  const veiculo = veiculos.find((v) => v.id === id);

  if (veiculo) {
    veiculo.preco = preco;
    res.status(200).send('O preço do veículo foi atualizado com sucesso.');
  } else {
    res.status(404).send('Veículo não encontrado.');
  }
});

// Rota: Excluir veículo (DELETE)
rotas.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = veiculos.findIndex((v) => v.id === id);

  if (index !== -1) {
    veiculos.splice(index, 1);
    res.status(202).send(`O veículo de ID ${id} foi excluído com sucesso.`);
  } else {
    res.status(404).send('Veículo não encontrado.');
  }
});

// Exporta as rotas
module.exports = rotas;
