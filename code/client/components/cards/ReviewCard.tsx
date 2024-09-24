import React from 'react'
import Rating from '../Rating'
import ShortSentenceDate from '../dates/ShortSentenceDate'

type Review = {
    _id: string
    star: number
    comment: string
  postedby: {
    _id: string
    firstname: string
    lastname: string
    }
}

interface ReviewCardProps {
    review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const { star, comment, postedby } = review
  return (
      <article className='flex flex-col gap-2 py-2 px-2'>
          <Rating rating={star} />
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>{postedby.firstname} {postedby.lastname} </span>
          </div>
          <p className='text-base'>
              {comment}
          </p>
          <hr />
    </article>
  )
}

export default ReviewCard