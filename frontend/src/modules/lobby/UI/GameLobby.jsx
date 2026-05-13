// Representing home page where you can select game mode, board style, board layout
import React, { useState } from 'react'
// Importing components:
import StartGameButton from '../components/StartGameButton';
import SelectBoardLayout from '../components/SelectBoardLayout';
import GameMode from '../components/GameMode';
import PlayerInfo from '../components/PlayerInfo';
import SelectAi from '../components/SelectAi';
import {X} from 'lucide-react'

const GameLobby = () => {
  // Defining all states: 
  // PlayerInfo 
  const [playerInfo, setPlayerInfo] = useState({
    playerOneName: '',
    playerOneMarker: 'X',
    playerTwoName: '',
    playerTwoMarker: 'O',
  })
  const [gameMode, setGameMode] = useState(null);
  const [boardLayout, setBoardLayout] = useState(null);
  const [boardStyle, setBoardStyle] = useState(null);
  const [gameInitialization, setGameInitialization] = useState(false);
  // Functioning for initiaing game:
  const startGame = () => {
    console.log(gameMode);
    console.log(boardLayout);
    console.log(boardStyle);
    if (gameMode && boardLayout) {
      setGameInitialization(true);
    }
  }
  // Returning JSX:
  return ( 
    <div>
      <div className='flex flex-col align-middle justify-center gap-10'>
        <SelectBoardLayout setBoardLayout={setBoardLayout} setBoardStyle={setBoardStyle} />
        <GameMode setGameMode={setGameMode} />
      {
        gameInitialization
        ? <div className='flex flex-col align-middle justify-center gap-10'>
            <X onClick={()=>setGameInitialization(false)}/>
            {gameMode === 'MULTIPLAYER' ? <PlayerInfo setPlayerInfo={setPlayerInfo}  /> : <SelectAi />}
          </div>
        : <></>
      }
      <button className='bg-gray-900 text-white p-4 font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-600' onClick={startGame}>{!gameInitialization ? "Initialize Game" : "Start Game"}</button>
      
      </div>
    </div>
  )
}

export default GameLobby