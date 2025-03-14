import { withPrivateRoute } from "../../App"
import ProductsTable from "../../components/page/products/table"
import { useGetAllProducts } from "../../services/products"

const ProductsPage = ()=>{

    const {data , isLoading} = useGetAllProducts()

    if(isLoading){
        return <p>is loading ...</p>
    }

    return(
        <>
            <ProductsTable productList={data.records}/>
        </>
    )
}

export default withPrivateRoute(ProductsPage)