import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

    const {ProductId} = useParams()
    const {products}= React.useContext(ShopContext)
    const [productData, setProductData] = React.useState(false)

    return (
        <div>

        </div>
    )
}

export default Product
