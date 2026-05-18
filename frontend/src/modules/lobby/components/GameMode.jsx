import React, { useState } from 'react'
import {Bot,Swords} from 'lucide-react'
import PlayerInfo from './PlayerInfo';
import SelectAi from './SelectAi';
import { SelectionButton } from '../../../reusable/CustomButtons';
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
        <SelectionButton 
            label="Play Against Your Friend!"
            Icon={Swords}
            isActive={currentSelected === gameModes.multiplayer}
            onClick={() => {
                setGameMode(gameModes.multiplayer);
                setCurrentSelected(gameModes.multiplayer);
            }}
        />

        <SelectionButton 
            label="Test Your Strength Against Our AI Bots!"
            Icon={Bot}
            isActive={currentSelected === gameModes.ai}
            onClick={() => {
                setGameMode(gameModes.ai);
                setCurrentSelected(gameModes.ai);
            }}
        />
      </div>
    </div>
  )
}

export default GameMode