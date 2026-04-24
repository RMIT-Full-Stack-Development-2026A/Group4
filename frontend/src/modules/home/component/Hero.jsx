import React from 'react'
import SignupButton from '../../../components/reusable/SignupButton'

const Hero = () => {
  return (
    <div className='flex border h-[50%] p-50 bg-gray-600 rounded-xl justify-between'>
        <div className='flex flex-col align-start'>
            <h1 className='font-bold text-white text-bold text-3xl'>JOIN US NOW</h1>
            <SignupButton />
        </div>
        <div className='w-48 h-48 bg-gray-800'>
            IMAGE
        </div>
    </div>
  )
}

export default Hero