import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_KEY, BASE_URL } from "../configs/envReader";
import { queryClient } from "../main";

export const useGetAllProducts = () => useQuery({
    queryKey: ["products"],
    queryFn: async () => {
        let access = localStorage.getItem('access')
        if (access) {
            const response = await axios.get(BASE_URL + '/api/records/products', {
                headers: {
                    "api_key": API_KEY,
                    "Authorization": `Bearer ${access}`
                }
            })
            return response.data
        }
        throw new Error("access token not found")
    }
})

export const useDeleteProduct = ()=>useMutation({
    mutationFn : async (id : string)=>{
        let access = localStorage.getItem('access')
        await axios.delete(BASE_URL+`/api/records/products/${id}`,{
            headers : {
                "api_key": API_KEY,
                "Authorization": `Bearer ${access}`
            }
        })
        return id
    },
    onSuccess : ()=>{
        queryClient.invalidateQueries({queryKey : ["products"]})
    }
})