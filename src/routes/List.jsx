import './List.css'
import { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'

import { fetchAPI } from '../api'
import RowPedido from '../components/RowPedido'

const List = () => {
  const [pedidos, setPedidos] = useState([])

  const getPedidos = async() => {
    try {
      const res = await fetchAPI('/Pedidos')
      setPedidos(res)

    } catch (err){
      console.error('error getPedidos:' , err);
    }
  }

  useEffect(() => {
    getPedidos()
  }, [])

  return (
    <div className='list-container'>
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
            {pedidos?.map((pedido) => {
              return (
                <RowPedido 
                  key={pedido.id} 
                  id={pedido.id}
                  data={pedido.data}
                  id_cliente={pedido.cliente}
                />
              )
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default List