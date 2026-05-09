import React from 'react'
import {Bot,Swords} from 'lucide-react'

const GameMode = () => {
  return (
    <div className='flex gap-3 flex-col'>
      <h1 className='text-center text-2xl font-bold text-gray-800'>Select from the following game Modes: </h1>
      <div className='flex text-center gap-3'>
        <button className='text-gray-600 font-semibold cursor-pointer flex-1/2 border p-4 rounded-lg flex gap-1 justify-center align-middle transition-transform hover:scale-102 duration-300'>
          <Swords/>Play Against Your Friend!
        </button>
        <button className='text-gray-600 font-semibold cursor-pointer flex-1/2 p-4 rounded-lg flex border justify-center align-middle gap-1 transition-transform hover:scale-102 duration-300'><Bot/>Test Your Strength Against Our AI Bots!</button>
      </div>
    </div>
  )
}

export default GameMode