import React from 'react'

const Features = () => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='p-5 w-[1/3] bg-gray-300 rounded-4xl'>
            <img></img>
            <p className='text-center font-semibold text-gray-800 text-sm'>SELECT DIFFERENT AESTHETIC BOARD LAYOUTS</p>
        </div>
        <div className='p-5 w-[1/3] bg-gray-300 rounded-4xl'>
            <img></img>
            <p className='text-center font-semibold text-gray-800 text-sm'>PLAY AGAINST YOUR FRIENDS</p>
        </div>
        <div className='p-5 w-[1/3] bg-gray-300 rounded-4xl'>
            <img></img>
            <p className='text-center font-semibold text-gray-800 text-sm'>GO AGAINST OUR AI MODELS</p>
        </div>
    </div>
  )
}

export default Features