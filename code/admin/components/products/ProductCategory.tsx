import { useStateValue } from '@/redux/StateProvider';
import { Category } from '@/types';
import React, { useState } from 'react'

interface Props {
    id: string
    classname?: string
}

const ProductCategory: React.FC<Props> = ({ id, classname }) => {
    const [{ categories }, dispatch] = useStateValue();
    const [category, setCategory] = useState('')
    // console.log(categories);

    React.useEffect(() => {
        if (categories.length > 0) {
            const category = categories.find((category: Category) => category._id === id);
            if (category) {
                setCategory(category.title)
            } else {
                setCategory("No Category")
            }
        }
    }, [categories])

    return (
        <p className={classname}>{category}</p>

    )
}

export default ProductCategory