import React from 'react'
import SubscriptionInfo from './SubscriptionInfo'
import { useState, useEffect } from 'react'

const SubscriptionContainer = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    // Fetching all plans from backend:
    const getSubscriptionPlans = async () => {
        const res = await fetch('http://localhost:3000/subscriptions/all_plans', {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
        const data = await res.json();
        setSubscriptions(data);
    }
    // Populating states with subscription plans
    useEffect(()=>{
        // Getting plans from backend:
        getSubscriptionPlans;
    }, [subscriptions])
    const handlePurchase = async () => {
        const response = await fetch('http://localhost:3000/payment/check-out-page', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( {priceId: 'price_1TM1Us84EVoDubNDMkyLreC6' }),
        }); 
        // Creating a payment session;
        const session = await response.json();
        // Redirecting user to url
        window.location.href = session.url;
    }
    return (
        <div>
            <div>Available Plans:</div>
            <div>
                {subscriptions.map((subscription)=>(
                    <SubscriptionInfo subscriptionInfo={subscription}></SubscriptionInfo>
                ))}
            </div>
            <button onClick={handlePurchase}>Purchase</button>
        </div>
    )
}

export default SubscriptionContainer;