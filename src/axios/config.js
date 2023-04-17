import axios from 'axios'

const api = axios.create({
    baseURL: "https://sistemalift1.com/lift_ps/api"
})

export default api