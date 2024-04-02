import axios from 'axios'


const instance = axios.create({
    baseURL:' http://139.59.92.146/'
})

export default instance;