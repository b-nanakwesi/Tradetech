import React, { useState } from 'react'
import OxfordPrimary from '../buttons/OxfordPrimary'
import { useStateValue } from '@/redux/StateProvider'
import { toast } from 'react-hot-toast'
import { Rating } from '@/types'
import { GET_ALL_PRODUCTS, GIVE_A_RATING } from '@/utils/server/products'

interface RateProps {
    number: number
    onClick: () => void
    active: boolean
}

interface RatingFormProps {
    productId: string
}

const Rate: React.FC<RateProps> = ({ number, active, onClick }) => {
    return (
        <button className={` border w-[40px] py-2 rounded-lg ${active ? 'bg-saffron text-oxford-blue border-transparent' : 'bg-transparent border-saffron'} `} onClick={onClick}>
            {number}
        </button>
    )
}

const RatingForm: React.FC<RatingFormProps> = ({ productId }) => {
    const [{ user }, dispatch] = useStateValue()

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')

    const handleGiveRating = () => {
        if (!user || !user.token) {
            toast.error("Please login to give a rating")
            return
        }
        if (!productId) {
            toast.error("Please select a product")
            return
        }

        const ratingData: Rating = {
            productId: productId,
            star: rating,
            comment: comment
        }

        GIVE_A_RATING(ratingData, user.token, (data) => {
            setRating(1)
            setComment('')
            GET_ALL_PRODUCTS("", (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data,
                })

            })
        })


    }




    return (
        <div className='flex flex-col gap-4'>
            <h3 className='font-medium text-xl text-night'>Give A Review</h3>

            <div className='flex flex-col gap-4'>
                <h3>Select A Rating</h3>
                <div className='flex items-center gap-4'>
                    <Rate number={1} active={rating === 1} onClick={() => setRating(1)} />
                    <Rate number={2} active={rating === 2} onClick={() => setRating(2)} />
                    <Rate number={3} active={rating === 3} onClick={() => setRating(3)} />
                    <Rate number={4} active={rating === 4} onClick={() => setRating(4)} />
                    <Rate number={5} active={rating === 5} onClick={() => setRating(5)} />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3>Enter your review</h3>
                <div className='flex items-center gap-4'>
                    <textarea rows={5} className='w-full border resize-none max-w-lg  border-gray-300 rounded-lg p-2' value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
            </div>
            <OxfordPrimary onClick={handleGiveRating} label='Submit' />
        </div>
    )
}

export default RatingForm