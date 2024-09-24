import React from 'react'
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
    ssr: false,
});

interface RatingProps {
    rating?: number | string
    numberOfStars?: number
    color?: string
    dimension?: string
}

const Rating: React.FC<RatingProps> = ({ rating, numberOfStars, color, dimension }) => {
    const ratingValue = rating ? Number(rating) : 0
    const starColor = color ? color : "#EEC643"
    const starNumber = numberOfStars ? numberOfStars : 5
    const starDimension = dimension ? dimension : "18px"
    return (
        <StarRatings
            rating={ratingValue}
            starRatedColor={starColor}
            numberOfStars={starNumber}
            starDimension={starDimension}
            starSpacing="1px"
            name="rating"
        />
    )
}

export default Rating