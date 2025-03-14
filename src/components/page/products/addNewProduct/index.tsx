import { useEffect, useState } from "react"
import { useAddNewProduct } from "../../../../services/products"
import { Iproduct } from "../../../../interfaces/products"
import { useUploadImage } from "../../../../services/file"
import { BASE_URL } from "../../../../configs/envReader"

const AddNewProduct = () => {

    const [image, setImage] = useState<any>(null)

    const [values, setValues] = useState({
        title: "",
        company_title: "",
        price: "",
        discount_percent: "",
        in_stock: "",
        image: ""
    })

    const [details, setDetails] = useState([
        {
            id: 1,
            title: "",
            content: ""
        }
    ])

    const { mutate, isLoading } = useAddNewProduct()
    const { mutate: uploadImage, isLoading: uploadLoading, isSuccess: uploadSuccess, data: imageLink } = useUploadImage()


    function handleAdd() {
        let data: Omit<Iproduct, "id" | "createdAt"> = {
            title: values.title,
            company_title: values.company_title,
            price: Number(values.price),
            discount_percent: Number(values.discount_percent),
            in_stock: Number(values.in_stock),
            image: values.image,
            details: details.map(item => ({
                title: item.title,
                content: item.content
            })),
            image_gallery: []
        }

        mutate(data)
    }


    useEffect(() => {
        if (image) {
            uploadImage(image)
        }
    }, [image])

    useEffect(() => {
        if (uploadSuccess) {
            setValues({ ...values, image: BASE_URL + imageLink })
        }
    }, [uploadSuccess])

    if (isLoading) {
        return <p>wait to add ...</p>
    }

    return (
        <div className="flex flex-col gap-2">
            <label>
                Title :
                <input className="border border-black" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
            </label>
            <label>
                Company Title :
                <input className="border border-black" value={values.company_title} onChange={(e) => setValues({ ...values, company_title: e.target.value })} />
            </label>
            <label>
                Price :
                <input className="border border-black" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
            </label>
            <label>
                Discount Percent :
                <input className="border border-black" value={values.discount_percent} onChange={(e) => setValues({ ...values, discount_percent: e.target.value })} />
            </label>
            <label>
                In Stock :
                <input className="border border-black" value={values.in_stock} onChange={(e) => setValues({ ...values, in_stock: e.target.value })} />
            </label>
            {uploadSuccess ? <p>image uploaded</p> :
                uploadLoading ? <p> wait for upload ...</p> :
                    <label>
                        Image :
                        <input className="border border-black" type="file" onChange={(e) => setImage(e.target.files && e.target.files[0])} />
                    </label>
            }

            {details.map(item => (
                <div key={`details-item-${item.id}`} className="flex items-center gap-2">
                    <input className="border border-black" placeholder="title" value={item.title} onChange={(e) => {
                        setDetails(details.map(t => t.id === item.id ? { ...t, title: e.target.value } : t))
                    }} />
                    <input className="border border-black" placeholder="content" value={item.content} onChange={(e) => {
                        setDetails(details.map(t => t.id === item.id ? { ...t, content: e.target.value } : t))
                    }} />
                </div>
            ))}
            <button className="border border-black w-[156px]" onClick={() => setDetails([...details, { id: Date.now(), title: "", content: "" }])}>add new detail</button>

            <button className="border border-black w-[156px] bg-green-300" onClick={handleAdd}>add</button>
        </div>
    )
}

export default AddNewProduct