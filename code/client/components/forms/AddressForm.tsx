import React, { useState, useEffect } from 'react'
import OxfordPrimary from '../buttons/OxfordPrimary';
import { BsChevronLeft } from "react-icons/bs"
import Link from 'next/link';
import { useStateValue } from '@/redux/StateProvider';
import { CREATE_NEW_ORDER, EMPTY_USER_CART, GET_USER_CART, SAVE_USER_ADDRESS } from '@/utils/server/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { fetchCart } from '@/hooks/fetchLocalStorageData';

interface Region {
    value: string;
    label: string;
}

const regions: Region[] = [
    { value: 'Greater Accra', label: 'Greater Accra' },
    { value: 'Ashanti', label: 'Ashanti' },
    { value: 'Eastern', label: 'Eastern' },
    { value: 'Central', label: 'Central' },
    { value: 'Western', label: 'Western' },
    { value: 'Volta', label: 'Volta' },
    { value: 'Northern', label: 'Northern' },
    { value: 'Upper East', label: 'Upper East' },
    { value: 'Upper West', label: 'Upper West' },
    { value: 'Bono', label: 'Bono' },
    { value: 'Bono East', label: 'Bono East' },
    { value: 'Ahafo', label: 'Ahafo' },
    { value: 'Oti', label: 'Oti' },
    { value: 'Savannah', label: 'Savannah' },
    { value: 'North East', label: 'North East' },
    { value: 'Western North', label: 'Western North' },
    { value: 'Greater Accra', label: 'Greater Accra' },
    { value: 'Ahafo', label: 'Ahafo' },
];

const AddressForm = () => {
    const [{user}, dispatch] = useStateValue()
    const [selectedRegion, setSelectedRegion] = useState('');
    const [city, setCity] = useState('')
    const [landmark, setLandmark] = useState("")
    const [mapLocation, setMapLocation] = useState("")

    const [loading, setLoading] = useState(false)

    const [userCart, setUserCart] = useState(null)

    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(event.target.value);
    };

    const fullAddress = `Close to ${landmark} in ${city}, ${selectedRegion} region. 
        ${mapLocation !== "" ? `Prompt to find on map: ${mapLocation}` : ""}`

    const router = useRouter()

    const backToCart = () => {
        EMPTY_USER_CART(user.token, (data) => {
            router.push("/cart")
        })
    }

    const handleCreateOrder = () => {
        setLoading(true)
        // validate address
        if (landmark === "" || city === "" || selectedRegion === "") { 
            toast.error("Please enter all required fields")
            setLoading(false)
            return
        }
        const orderData = {
            COD: true,
            couponApplied: true
        }
        SAVE_USER_ADDRESS(fullAddress, user.token, (data) => {
            CREATE_NEW_ORDER(orderData, user.token, (data: any) => {
                EMPTY_USER_CART(user.token, (data) => {
                    localStorage.removeItem("cart")
                    router.push("/")

                    const getCart = fetchCart()
                    dispatch({
                        type: "SET_CART",
                        payload: getCart
                    })
                })
            })
            
        })
        setLoading(false)

    }

    

    useEffect(() => {
        if (user && user.token) {
            GET_USER_CART(user.token, (data) => {
                setUserCart(data.data)
            })
        }
    }, [user]);

    return (
        <div className='flex flex-col gap-2 w-full'>

            <p className='text-gray-500 text-xs px-2'>
                NB: Fill the form to generate your address
            </p>
            <div className='bg-gray-100 text-gray-700 p-4 rounded-lg'>
                {fullAddress}
            </div>
            <input
                type="text"
                className='input-box'
                placeholder='Landmark *'
                required
                value={landmark}
                onChange={(e) => {
                    setLandmark(e.target.value)
                }}
            />
            <input
                type="text"
                className='input-box'
                placeholder='City/ Town *'
                required
                value={city}
                onChange={(e) => {
                    setCity(e.target.value)
                }}
            />
            <input
                type="text"
                className='input-box'
                placeholder='Map Location e.g Fiesta Royale'
                value={mapLocation}
                onChange={(e) => {
                    setMapLocation(e.target.value)
                }}
            />
            <select className='input-box' value={selectedRegion} onChange={handleRegionChange}>
                <option value="">Select a region</option>
                {regions.map((region, index) => (
                    <option key={index} >
                        {region.label}
                    </option>
                ))}
            </select>
            <p className='text-sm text-yellow-600 px-2'>
                NB: If you want to cancel your order after creation, you will have to contact us.
            </p>
            <div className='flex items-center justify-between'>
                <button onClick={backToCart}  className='flex items-center text-neon-blue gap-2 hover:underline'>
                    <BsChevronLeft /> Back to cart
                </button>
                <OxfordPrimary onClick={handleCreateOrder} disabled={loading}  label='Create Order' />
            </div>
            
        </div>
    )
}

export default AddressForm