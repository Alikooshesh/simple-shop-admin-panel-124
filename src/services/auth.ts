import { useMutation } from "react-query"
import http from "../libs/axios"

export const useLoginRequest = ()=> useMutation({
    mutationFn : async (data:{email : string , password : string})=>{
        const response = await http.post('/api/users/login',data)

        return response.data
    },
    onSuccess : (data)=>{
        localStorage.setItem('access',data.accessToken)
    },
    onError : (err)=>{
        console.log(err)
    }
})