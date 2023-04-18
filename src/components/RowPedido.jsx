import './RowPedido.css'
import { useState, useEffect} from 'react'

import { fetchAPI, getProdutos } from '../api'

const Row = ({ id, data, id_cliente }) => {
  const [cliente, setCliente] = useState({})
  const [valorTotal, setValorTotal] = useState([])

  const getCliente = async() => {
    try {
      const res = await fetchAPI('/Clientes/' + id_cliente)
      setCliente(res)

    } catch (err){
      console.error('error getCliente:' , err);
    }
  }

  const calcularValorTotal = async() => {
    // BRL currency formatter
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    try {
      const produtos = await getProdutos(id)
      let vt = 0

      produtos.map((p) => {
        vt += p.produto.valor * p.quantidade
      })

      setValorTotal(formatter.format(vt))

    } catch (err){
      console.error('error calcularValorTotal:' , err);
    }
  }

  useEffect(() => {
    getCliente()
    calcularValorTotal()
  }, [])

  return (
    <tr>
      <td>{id}</td>
      <td>{cliente.nome}</td>
      <td>{data.replaceAll('-', '/')}</td>
      <td>{valorTotal}</td>
    </tr>
  )
}

export default Row