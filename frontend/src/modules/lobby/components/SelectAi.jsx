import React, {useState} from 'react'
import { AIModels } from '../services/ai_models'
import {useAuth} from '../../../context/UserContext'

const SelectAi = ({ setPlayerInfo }) => {
  const [selectedAi, setSelectedAI] = useState(AIModels[0]);
  const initializeAi = (ai) => {
    setSelectedAI(ai);
    setPlayerInfo((prev)=>({...prev, playerTwoName: ai.name}))
  }
  return (
    <div className={'p-4 m-4 flex flex-col gap-5'} >
      <h1 className='text-center font-bold'>Choose the AI model you want to go against!</h1>
      <div className='flex justify-between '>
        {AIModels.map(( ai )=>(
            <button key={ai.id} onClick={ ()=>{ initializeAi(ai) } } className={`flex p-4 rounded-lg cursor-pointer shadow-2xl flex-col justify-between align-middle ${selectedAi === ai ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
              <h3 className='font-bold text-xl'>{ai.avatar} {ai.name}</h3>
              <p className='font-semibold'>Difficulty: {ai.difficulty}</p>
              <p className='font-normal'>{ai.description}</p>
            </button>
        ))}
      </div>
    </div>
  )
}

export default SelectAi