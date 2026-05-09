import React from 'react'
import SubscriptionInfo from './SubscriptionInfo'
import { useAuth } from '../../../context/UserContext'
import { useState, useEffect } from 'react'

const SubscriptionContainer = () => {
    // Getting the user from authentication context: 
    const { user } = useAuth();
    // Defining component states: 
    const [subscriptions, setSubscriptions] = useState([]);
    // Populating state with subscription plans:
    useEffect(()=>{
        const getSubscriptionPlans = async () => {
            // Sending request to backend: 
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/subscription/plans`, {
                method: 'GET',
                headers: {'Content-type': 'application/json'},
            })
            const data = await res.json();
            setSubscriptions(data.subscriptions);
        }
        // Getting plans from backend:
        getSubscriptionPlans();
    }, [])
    return (
        <div>
            <div className='underline underline-offset-4 font-bold text-3xl text-center'>AVAILABLE PLANS:</div>
            <div className='flex md:flex-row sm:flex-col justify-center align-middle'>
                {subscriptions.map((subscription)=>(
                    <SubscriptionInfo key={subscription.id} subscriptionInfo={subscription} />
                ))}
            </div>
        </div>
    )
}

export default SubscriptionContainer;