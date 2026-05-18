// Representing home page where you can select game mode, board style, board layout
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// Importing components:
import StartGameButton from '../components/StartGameButton';
import SelectBoardLayout from '../components/SelectBoardLayout';
import GameMode from '../components/GameMode';
import PlayerInfo from '../components/PlayerInfo';
import SelectAi from '../components/SelectAi';
// import from servie
import { STEPS, INITIAL_PLAYER_INFO, createGameUTO, startGame } from '../services/lobbyservices';
// Auth:
import { useAuth } from '../../../context/UserContext'

const GameLobby = () => {
  // Navigation: 
  const navigate = useNavigate();
  // UserId:
  const { userId, user } = useAuth();
  // Defining all states: 
  const [ playerInfo, setPlayerInfo ] = useState(INITIAL_PLAYER_INFO);
  const [ firstPlayer, setFirstPlayer] = useState(null);
  const [ step, setStep ] = useState(STEPS.SETUP);
  const [ gameMode, setGameMode ] = useState(null);
  const [boardConfig, setBoardConfig] = useState({
    layout: 10,
    style: ''
  })
  // UseEffect:
  useEffect(()=>{
    if (gameMode !== "MULTIPLAYER") {
      setPlayerInfo(prev => ({ ...prev, playerOneName: user.username }))
      setFirstPlayer({ name: user.username, marker: INITIAL_PLAYER_INFO.playerOneMarker })
    }
  }, [gameMode])
  
  // Functioning for initializing game:
  const initializeGame =  async () => {
    if (playerInfo.playerOneName === '' || playerInfo.playerTwoName === '') {
      throw new Error("Error enter player detail!");
    }
    console.log(playerInfo);
    const gameUTO = createGameUTO( playerInfo.playerOneName, playerInfo.playerTwoName, gameMode, boardConfig.layout, [ playerInfo.playerOneMarker, playerInfo.playerTwoMarker ], firstPlayer );
    console.log(gameUTO)
    const data = await startGame( userId, gameUTO );
    navigate(`/game/${data.data.id}`);
  }
 
  // Returning JSX:
  return ( 
    <div>
      {step === STEPS.SETUP && (
        <>
          <GameMode setGameMode={ setGameMode } />
          <SelectBoardLayout setBoardConfig={setBoardConfig}/>
          <button 
            disabled={!gameMode}
            className='bg-gray-900 text-white p-4 font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-600 disabled:opacity-50'
            onClick={()=>setStep(STEPS.PLAYERS)}
            > Next </button>
        </>
      )}

      {step === STEPS.PLAYERS && (
        <>
          { gameMode === 'MULTIPLAYER' ? <PlayerInfo setFirstPlayer={setFirstPlayer} setPlayerInfo={setPlayerInfo} /> : <SelectAi playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} /> }
          <div className='flex gap-4'>
            <button
              className=''
              onClick={()=>setStep(STEPS.SETUP)}
            >Back</button>
            <button
              className=''
              onClick={initializeGame}
            >Start Game</button>
            </div> 
        </>
      )}
    </div>
    )
}

export default GameLobby;