import axios from 'axios'

export const baseURL = import.meta.env.baseURLApi
const instance = axios.create({
    baseURL: import.meta.env.BASE_URL
})

export default instance;