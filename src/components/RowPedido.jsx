import './RowPedido.css'
import { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import { getRowPedido } from '../api'

const Row = ({ id, data, id_cliente }) => {
  const [dados, setDados] = useState({})
  const navigateTo = useNavigate()

  const listarPedido = async() => {
    const res = await getRowPedido(id, id_cliente)
    setDados(res)
  }

  const handleRowClick = () => {
    navigateTo(`/pedido/${id}`)
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    listarPedido()
  }, [])

  return (
    <tr onClick={()=> handleRowClick()}>
      {!dados ? (
        <td colSpan="4">Loading...</td>
      ) : (
        <>
          <td>{id}</td>
          <td>{dados.nome}</td>
          <td>{data.replaceAll('-', '/')}</td>
          <td>{formatter.format(dados.valorTotal)}</td>
        </>
      )}
    </tr>
  )
}

export default Row