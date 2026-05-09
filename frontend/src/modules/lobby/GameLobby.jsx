// Representing home page where you can select game mode, board style, board layout
import React from 'react'

// Importing components:
import StartGameButton from './components/StartGameButton';
import SelectBoardLayout from './components/SelectBoardLayout';
import GameMode from './components/GameMode';

const GameLobby = () => {
  // Returning JSX:
  return (
    <div className='flex flex-col align-middle justify-center gap-10'>
      <GameMode />
      <SelectBoardLayout />
      <StartGameButton />
    </div>
  )
}

export default GameLobby