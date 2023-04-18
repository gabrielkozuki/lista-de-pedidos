const API_URL = 'https://sistemalift1.com/lift_ps/api'

export const fetchAPI = async (path) => {
  try {
    let url = API_URL + path
    const res = await fetch(url)
    return await res.json()

  } catch (error) {
    console.error(`error ${path}:` , error);
  }
};

export const getProdutos = async (id_pedido) => {
  try {
    const items = await fetchAPI('/ItensPedido/' + id_pedido)
    let data = []

    await Promise.all(items.map( async(item) => {
      try {
        const res = await fetchAPI('/Produtos/' + item.produto)
        data.push({produto: res, quantidade: item.quantidade})

      } catch(err) {
        console.log(err);
      }
    }))

    return data

  } catch (err){
    console.error('error getProdutos:' , err);
  }
}