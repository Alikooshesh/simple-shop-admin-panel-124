import { useMutation, useQuery } from "react-query";
import { queryClient } from "../main";
import http from "../libs/axios";

export const useGetAllProducts = () => useQuery({
    queryKey: ["products"],
    queryFn: async () => {
        const response = await http.get('/api/records/products')
        return response.data
    }
})

export const useDeleteProduct = ()=>useMutation({
    mutationFn : async (id : string)=>{
        await http.delete(`/api/records/products/${id}`)
        return id
    },
    onSuccess : ()=>{
        queryClient.invalidateQueries({queryKey : ["products"]})
    }
})