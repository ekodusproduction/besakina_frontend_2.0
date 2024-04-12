import axios from 'axios'

export const baseURL = 'http://167.71.235.196/api/'
const instance = axios.create({
    baseURL:'http://167.71.235.196/'
})

export default instance;