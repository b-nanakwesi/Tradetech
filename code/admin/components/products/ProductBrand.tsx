import { useStateValue } from '@/redux/StateProvider';
import { Brand } from '@/types';
import React, { useState } from 'react'

interface Props {
    id: string
    classname?: string
}

const ProductBrand: React.FC<Props> = ({ id, classname }) => {
    const [{ brands }, dispatch] = useStateValue();
    const [brand, setBrand] = useState('')
    // console.log(brands);

    React.useEffect(() => {
        if (brands.length > 0) {
            const brand = brands.find((brand: Brand) => brand._id === id);
            if (brand) {
                setBrand(brand.title)
            } else {
                setBrand("No Brand")
            }
        }
    }, [brands])
    return (
        <p className={classname}>{brand}</p>

    )
}

export default ProductBrand