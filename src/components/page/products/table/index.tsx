import { Iproduct } from "../../../../interfaces/products"
import { useDeleteProduct } from "../../../../services/products"

interface Iprops {
    productList: Iproduct[]
}

const ProductsTable = ({ productList }: Iprops) => {

    const {mutate : deleteProduct , isLoading} = useDeleteProduct()


    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map(item=>(
                        <tr key={`product-table-${item.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.title}
                        </th>
                        <td className="px-6 py-4">
                            <img className="w-[64px]" src={item.image}/>
                        </td>
                        <td className="px-6 py-4">
                            {item.price} T
                        </td>
                        {isLoading ? 'Loading ...' : 
                            <td className="px-6 py-4 text-right flex items-center justify-end gap-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=> deleteProduct(item.id)}>Delete</button>
                        </td>
                        }
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>

    )
}

export default ProductsTable