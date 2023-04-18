import React from 'react'
import './Pedido.css'
import { useParams } from 'react-router-dom'

const Pedido = () => {
  const { id } = useParams()

  return (
    <div>Pedido</div>
  )
}

export default Pedido