import React from 'react'
import {Link} from 'react-router-dom';

const PaymentFailure = () => {
  return (
    <div className='transition-transform duration-300 hover:scale-105 m-50 p-5 text-center flex flex-col shadow-[0px_4px_9px_0px_rgba(0,_0,_0,_0.1)] gap-5 rounded-lg'>
        <h2 className='font-bold text-2xl text-red-600' >Something went wrong with your purchase...</h2>
        <h3 className='font-semibold text-xl'>Please try again later!</h3>
        <Link className='rounded-lg bg-black text-white font-bold p-5' to='/lobby'>Return home</Link>
    </div>
  )
}

export default PaymentFailure