import { useMutation } from "react-query";
import http from "../libs/axios";

export const useUploadImage = ()=> useMutation({
    mutationFn : async (image:File)=>{
        const fd = new FormData()
        fd.append('image',image)
        const response = await http.post('/api/files/upload',fd,{
            headers : {
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data.downloadLink
    }
})