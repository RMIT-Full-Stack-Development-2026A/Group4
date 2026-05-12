// Representing home page where you can select game mode, board style, board layout
import React, { useState } from 'react'

// Importing components:
import StartGameButton from './components/StartGameButton';
import SelectBoardLayout from './components/SelectBoardLayout';
import GameMode from './components/GameMode';
import PlayerInfo from './components/PlayerInfo';
import SelectAi from './components/SelectAi';

const GameLobby = () => {
  // Defining all states: 
  const [playerTwo, setPlayerTwo] = useState(null);
  const [gameInitialization, setGameInitialization] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [boardLayout, setBoardLayout] = useState(null);
  const [boardStyle, setBoardStyle] = useState(null);
  // Functioning for initiaing game:
  const startGame = () => {
      console.log(gameMode),
      console.log(boardLayout),
      console.log(boardStyle)
      setGameInitialization(true);
  }
  // Returning JSX:
  return (
    !gameInitialization 
    ? <div className='flex flex-col align-middle justify-center gap-10'>
      <GameMode setGameMode={setGameMode} />
      <SelectBoardLayout setBoardLayout={setBoardLayout} setBoardStyle={setBoardStyle} />
      <button className='bg-gray-900 text-white p-4 font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-600' onClick={startGame}>Initialize Game</button>
    </div>
    : <div className='flex flex-col align-middle justify-center gap-10'>
      {gameMode === 'MULTIPLAYER' ? <PlayerInfo /> : <SelectAi />}
      <button className='bg-gray-900 text-white font-bold p-4 rounded-lg cursor-pointer' onClick={()=>setGameInitialization(false)}>Cancel</button>
    </div>
  )
}

export default GameLobby