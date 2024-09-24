import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ImageZoomProps {
    src: string
    width?: string
    alt?: string
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, width, alt }) => {
    return (
        <Zoom>
            <img
                alt={alt || 'img'}
                src={src}
                className='w-full h-full object-cover object-center border rounded-lg'
            />
        </Zoom>
    )
}

export default ImageZoom