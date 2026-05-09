import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <div>
        <p>Thankyou!</p>
        <Link to='/lobby'>Return Home</Link>
    </div>
  )
}

export default PaymentSuccess