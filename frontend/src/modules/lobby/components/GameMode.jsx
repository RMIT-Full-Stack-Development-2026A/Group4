import {Bot,Swords} from 'lucide-react'
import { useLobby } from '../../../context/GameLobbyContext';
import { SelectionButton } from '../../../reusable/CustomButtons';

const GameMode = () => {
  const { gameMode, setGameMode } = useLobby();

  // Choosing a game mode:
  return (
    <div className='flex gap-5 flex-col'>
      <h1 className='text-center text-3xl font-bold text-gray-800'>Select Game Mode</h1>
      <div className='flex sm:flex-row md:flex-col text-center gap-3'>
        <SelectionButton 
            label="Play Against Your Friend!"
            Icon={Swords}
            isActive={gameMode === 'MULTIPLAYER'}
            onClick={() => setGameMode('MULTIPLAYER')}
        />

        <SelectionButton 
            label="Test Your Strength Against Our AI Bots!"
            Icon={Bot}
            isActive={gameMode === 'AI'}
            onClick={() => setGameMode('AI')}
        />
      </div>
    </div>
  )
}

export default GameMode