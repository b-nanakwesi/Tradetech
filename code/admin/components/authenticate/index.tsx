import React, { useState, useEffect } from 'react'
import { GET_SESSION_USER } from '@/utils/server/auth'
import { useStateValue } from '@/redux/StateProvider'
import BouncingBalls from '../loaders/bouncingballs/BouncingBalls'
import { User } from '@/types'
import LoginForm from '../forms/LoginForm'
import { fetchUser } from '@/hooks/fetchLocalStorageData'



interface Props {
    children: React.ReactNode
}

const Authenticate: React.FC<Props> = ({ children }) => {
    const [{ user }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);

    // const userInfo = fetchUser()
    // console.log(userInfo);
    
    
    // console.log(user);
    

    useEffect(() => {
        if (user) return setLoading(false)
        setLoading(true)
        GET_SESSION_USER(setLoading, (data: User) => {
            dispatch({
                type: "SET_USER",
                payload: data,
            })
        })
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {
                loading && (
                    <div className="w-full h-screen flex items-center justify-center">
                        <BouncingBalls />
                    </div>
                )
            }
            {!loading && user && children}
            {!loading && !user && <div className="w-full h-screen flex items-center justify-center">
                <LoginForm />
            </div>}
        </>
    )
}

export default Authenticate