import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVER_URL ,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('tkn')}`
    }
})


// instance.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('tkn')}`
// })

export default instance