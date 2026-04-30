import React from 'react';
import { useAuth } from '../../../context/UserContext';


const SubscriptionInfo = ({ subscriptionInfo }) => {
  const { user } = useAuth();
  const handleSubscriptionPurchase = async (e) => {
    e.preventDefault();
    // Extracting the price id
    const {stripePriceId} = subscriptionInfo;
    // obtain stripe id:
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: user.id, priceId: stripePriceId} )
      })
      const data = await res.json();
      window.location.href = data.url
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className='transition-transform duration-300 shadow-[0px_4px_9px_0px_rgba(0,_0,_0,_0.1)] hover:scale-102 m-5 p-5 rounded-lg flex flex-col gap-5 align-baseline'>
        <h2 className='font-semibold text-xl'>{subscriptionInfo.name} | <span className='font-normal'>${subscriptionInfo.price}/Month</span></h2>
        <p className='font-light text-sm'>
            Description: {subscriptionInfo.features}
        </p>
        <button onClick={handleSubscriptionPurchase} className='bg-gray-900 hover:bg-gray-500 hover:border cursor-pointer rounded-lg text-white p-5 font-semibold'>PURCHASE</button>
    </div>
  )
}

export default SubscriptionInfo