// Representing home page where you can select game mode, board style, board layout
import React from 'react'
// Importing dependencies: 
import { useState } from 'react'
// Importing components:
import BoardLayout from './components/BoardLayout';
import GameMode from './components/GameMode';

const GameLobby = () => {
  // Defining states:
  const [selectedBoard, setSelectedBoard] = useState();
  const [gameMode, setGameMode] = useState();

  return (
    <div className='text-4xl'>
      <GameMode />
      <BoardLayout />
      <div></div>
    </div>
  )
}

export default GameLobby