import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.1.34:5000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('tkn')}`
    }
})


// instance.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('tkn')}`
// })

export default instance