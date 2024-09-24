import { useStateValue } from '@/redux/StateProvider';
import { Color } from '@/types';
import React, { useState } from 'react'

interface Props {
    id: string
    classname?: string
}

const ProductColor: React.FC<Props> = ({ id, classname }) => {
    const [{ colors }, dispatch] = useStateValue();
    const [color, setColor] = useState('')
    // console.log(colors);

    React.useEffect(() => {
        if (colors.length > 0) {
            const color = colors.find((color: Color) => color._id === id);
            if (color) {
                setColor(color.title)
            } else {
                setColor("No Color")
            }
        }
    }, [colors])
    return (
        <p className={classname}>{color}</p>

    )
}

export default ProductColor