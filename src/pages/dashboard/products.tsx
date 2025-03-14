import { withPrivateRoute } from "../../App"
import AddNewProduct from "../../components/page/products/addNewProduct"
import ProductsTable from "../../components/page/products/table"
import { useGetAllProducts } from "../../services/products"

const ProductsPage = ()=>{

    const {data , isLoading} = useGetAllProducts()

    if(isLoading){
        return <p>is loading ...</p>
    }

    return(
        <div className="p-2 flex flex-col gap-4">
            <ProductsTable productList={data.records}/>
            <AddNewProduct/>
        </div>
    )
}

export default withPrivateRoute(ProductsPage)