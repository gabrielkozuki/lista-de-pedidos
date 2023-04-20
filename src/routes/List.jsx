import './List.css'
import { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import { getList, getRowPedido } from '../api'

const List = () => {
  const [pedidos, setPedidos] = useState([])
  const navigateTo = useNavigate()


  const listarPedidos = async () => {
    let res_pedidos = await getList()
    let dados = []

    await Promise.all(res_pedidos.map( async(item) => {
      const res = await getRowPedido(item.id, item.cliente)
      dados.push({...res, data: item.data})
    }))
    setPedidos(dados)
  }

  const handleRowClick = (id) => {
    navigateTo(`/pedido/${id}`)
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    listarPedidos()
  }, [])

  return (
    <div className='list'>
      <Container>
        <h1>Lista de Pedidos</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {!pedidos.length ? (
              <tr>
                <td colSpan="4">Carregando...</td>
              </tr>
            ) : (
              pedidos.map((pedido) => (
                <tr onClick={()=> handleRowClick(pedido.pedido)} key={pedido.pedido}>
                  <td>{pedido.pedido}</td>
                  <td>{pedido.nome}</td>
                  <td>{pedido.data.replaceAll('-', '/')}</td>
                  <td>{formatter.format(pedido.valorTotal)}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default List