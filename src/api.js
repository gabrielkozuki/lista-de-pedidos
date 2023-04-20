const API_URL = 'https://sistemalift1.com/lift_ps/api'

const fetchAPI = async (path) => {
  try {
    let url = API_URL + path
    const res = await fetch(url)
    return await res.json()

  } catch (error) {
    console.error('FetchAPI error:' , error);
  }
};

const getProdutos = async (id_pedido) => {
  try {
    const items = await fetchAPI('/ItensPedido/' + id_pedido)
    let dados = []

    await Promise.all(items.map( async(item) => {
      const res = await fetchAPI('/Produtos/' + item.produto)
      dados.push({...res, quantidade: item.quantidade})
    }))

    return dados

  } catch(err) {
    console.error('error in getProdutos:', err);
  }
}

const calcularValorTotal = (produtos) => {
  let vt = 0
  produtos.map((produto) => {
    vt += produto.valor * produto.quantidade
  })

  return vt
}

// variables to export
export const getList = async() => {
  try {
    const res = await fetchAPI('/Pedidos')
    return res

  } catch (err){
    console.error('error in getPedidos:' , err);
  }
}

export const getRowPedido = async(id_pedido, id_cliente) => {
  try {
    const cliente = await fetchAPI('/Clientes/' + id_cliente)
    const produtos = await getProdutos(id_pedido)
    const vt = calcularValorTotal(produtos)

    return { pedido: id_pedido, nome: cliente.nome, valorTotal: vt}

  } catch (err){
    console.error('error in getRowPedido:' , err);
  }
}

export const getPedido = async(id_pedido) => {
  try {
    const pedido = await fetchAPI('/Pedidos/' + id_pedido)
    const cliente = await fetchAPI('/Clientes/' + pedido.cliente)
    const produtos = await getProdutos(id_pedido)
    const vt = calcularValorTotal(produtos)
    
    let dados = { 
      data: pedido.data,
      cliente: cliente,
      produtos: produtos,
      valorTotal: vt
    }

    return dados

  } catch(err) {
    console.error('error in getPedido:' + err)
  }
}