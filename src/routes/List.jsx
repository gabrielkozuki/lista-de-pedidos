import './List.css'
import { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'

import { getList } from '../api'
import RowPedido from '../components/RowPedido'

const List = () => {
  const [pedidos, setPedidos] = useState([])

  const listarPedidos = async () => {
    let res = await getList()
    setPedidos(res)
  }

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
            {!pedidos ? (
              <tr>
                <td colSpan="4">Carregando...</td>
              </tr>
            ) : (
              pedidos.map((pedido) => (
                <RowPedido
                  key={pedido.id}
                  id={pedido.id}
                  data={pedido.data}
                  id_cliente={pedido.cliente}
                />
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default List