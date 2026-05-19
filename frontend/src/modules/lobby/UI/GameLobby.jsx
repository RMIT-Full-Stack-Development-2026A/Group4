// Representing home page where you can select game mode, board style, board layout
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// Importing components:
import StartGameButton from '../components/StartGameButton';
import SelectBoardLayout from '../components/SelectBoardLayout';
import GameMode from '../components/GameMode';
import PlayerInfo from '../components/PlayerInfo';
import SelectAi from '../components/SelectAi';
import { BlackButton } from '../../../reusable/CustomButtons';
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
          <BlackButton 
              disabled={!gameMode}
              label="Next" 
              onClick={() => setStep(STEPS.PLAYERS)} 
          />
        </>
      )}

      {step === STEPS.PLAYERS && (
        <>
          { gameMode === 'MULTIPLAYER' ? <PlayerInfo setFirstPlayer={setFirstPlayer} setPlayerInfo={setPlayerInfo} /> : <SelectAi playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} /> }
          <div className='flex gap-4'>
            <BlackButton 
              label="Back" 
              onClick={()=>setStep(STEPS.SETUP)} 
            />
            <BlackButton 
              label="Back" 
              onClick={()=>setStep(STEPS.SETUP)} 
            />
            <BlackButton 
              label="Start Game" 
              onClick={initializeGame} 
            />
            </div> 
        </>
      )}
    </div>
    )
}

export default GameLobby;