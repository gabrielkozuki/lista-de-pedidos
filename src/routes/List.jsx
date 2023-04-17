import React from 'react'
import './List.css'
import { useState, useEffect } from 'react'

import api from '../axios/config'

const List = () => {
  const [pedidos, setPedidos] = useState()

  const getPedidos = async() => {
    try {
      const res = await api.get('/Pedidos')
      const data = res.data
      setPedidos(data)

    } catch (err){
      console.error(err)
    }
  }

  useEffect(() => {
    getPedidos()
  })

  return (
    <div>List</div>
  )
}

export default List