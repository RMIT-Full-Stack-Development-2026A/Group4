import React from 'react';

const SubscriptionInfo = ({ subscriptionInfo }) => {
  return (
    <div>
        <h2>{subscriptionInfo.name}</h2>
        <h3> $ {subscriptionInfo.price}</h3>
        <div>
            {subscriptionInfo.description}
        </div>
    </div>
  )
}

export default SubscriptionInfo