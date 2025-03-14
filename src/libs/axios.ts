import axios from "axios";
import { API_KEY, BASE_URL } from "../configs/envReader";

const http = axios.create({
    baseURL : BASE_URL,
    headers : {
        'Content-Type': 'application/json'
    }
})

http.interceptors.request.use(
    (config)=>{
        config.headers.api_key = API_KEY

        const access = localStorage.getItem('access')

        if(access){
            config.headers.Authorization = `Bearer ${access}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.status === 403 || error.status === 401){
            localStorage.removeItem('access')
            location.replace('/')
        }
        return Promise.reject(error)
    }
)

export default http