import axios from "axios"
import { useMutation } from "react-query"
import { API_KEY, BASE_URL } from "../configs/envReader"

export const useLoginRequest = ()=> useMutation({
    mutationFn : async (data:{email : string , password : string})=>{
        const response = await axios.post(BASE_URL+'/api/users/login',data,{
            headers : {
                "api_key" : API_KEY
            }
        })

        return response.data
    },
    onSuccess : (data)=>{
        localStorage.setItem('access',data.accessToken)
    },
    onError : (err)=>{
        console.log(err)
    }
})