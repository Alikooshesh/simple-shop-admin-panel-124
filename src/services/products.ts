import axios from "axios";
import { useQuery } from "react-query";
import { API_KEY, BASE_URL } from "../configs/envReader";

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