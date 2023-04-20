import React from 'react'
import './Pedido.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

import { getPedido } from '../api'

const Pedido = () => {
  const { id } = useParams()
  const [dados, setDados] = useState({})

  const listarPedido = async () => {
    let res = await getPedido(id)
    setDados(res)
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    listarPedido()
  }, [])

  return (
    <div className='info-pedido'>
      <Container>
        <div className="row-info">
          <h1>Informações do Pedido</h1>
          <h1>ID: {id}</h1>
        </div>

        <Table size="md" className='dados-cliente'>
          <thead>
            <tr>
              <th>Dados do Cliente</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!dados.cliente ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              <>
                <tr>
                  <td>Nome: {dados.cliente.nome}</td>
                  <td>CPF: {dados.cliente.cpf}</td>
                  <td>Data: {dados.data.replaceAll('-', '/')}</td>
                </tr>
                <tr>
                  <td>Email: {dados.cliente.email}</td>
                </tr>
              </>
            )}
          </tbody>
        </Table>

        <h2>Itens do Pedido</h2>
        <Table bordered size="md">
          <thead>
            <tr>
              <th>Código</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {!dados.produtos ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              <>
                {dados.produtos.map((produto) => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.id}</td>
                      <td>{produto.nome}</td>
                      <td>{produto.quantidade}</td>
                      <td>{formatter.format(produto.valor)}</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </Table>

        <div className="row-total">
          {dados.valorTotal ? (
            <h1>Total: {formatter.format(dados.valorTotal)}</h1>
          ) : (
            <h1>Total: carregando...</h1>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Pedido