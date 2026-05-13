import React, { useState } from 'react'
import {Bot,Swords} from 'lucide-react'
import PlayerInfo from './PlayerInfo';
import SelectAi from './SelectAi';

const GameMode = ({ setGameMode }) => {
  const [gameModes] = useState({
    multiplayer: 'MULTIPLAYER',
    ai: 'AI',
  });
  const [currentSelected, setCurrentSelected] = useState(null);
  // Choosing a game mode:
  return (
    <div className='flex gap-5 flex-col'>
      <h1 className='text-center text-3xl font-bold text-gray-800'>Select Game Mode</h1>
      <div className='flex sm:flex-row md:flex-col text-center gap-3'>
        <button onClick={()=>{setGameMode(gameModes.multiplayer); setCurrentSelected(gameModes.multiplayer)}} className={`transition-all ease-linear duration-200 text-gray-600 font-semibold cursor-pointer flex-1/2  p-4 rounded-lg flex gap-1 justify-center align-middle hover:scale-102 ${currentSelected === gameModes.multiplayer ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 border' }`}>
          <Swords/>Play Against Your Friend!
        </button>
        <button onClick={()=>{setGameMode(gameModes.ai); setCurrentSelected(gameModes.ai)}} className={`text-gray-600 transition-all ease-linear duration-200 font-semibold cursor-pointer flex-1/2  p-4 rounded-lg flex gap-1 justify-center align-middle hover:scale-102  ${currentSelected === gameModes.ai ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 border'}`}>
          <Bot/>Test Your Strength Against Our AI Bots!
        </button>
      </div>
    </div>
  )
}

export default GameMode