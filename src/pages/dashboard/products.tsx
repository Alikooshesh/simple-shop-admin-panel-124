import { useGetAllProducts } from "../../services/products"

const ProductsPage = ()=>{

    const {data , isLoading} = useGetAllProducts()

    if(isLoading){
        return <p>is loading ...</p>
    }

    return(
        <>
            {data.records.map((item:any) => <p>{item.title}</p>)}
        </>
    )
}

export default ProductsPage