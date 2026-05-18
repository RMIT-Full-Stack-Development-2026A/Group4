// Representing home page where you can select game mode, board style, board layout
import React, { useState } from 'react'
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
  const navigate = useNavigate();
  // UserId:
  const { userId } = useAuth();
  // Defining all states: 
  const [ playerInfo, setPlayerInfo ] = useState(INITIAL_PLAYER_INFO);
  const [ step, setStep ] = useState(STEPS.SETUP);
  const [ gameMode, setGameMode ] = useState(null);
  const [ boardLayout, setBoardLayout ] = useState(10);
  const [ boardStyle, setBoardStyle ] = useState(null);
  // Functioning for initializing game:
  const initializeGame =  async () => {
    if (playerInfo.playerOneName === '' || playerInfo.playerTwoName === '') {
      throw new Error("Error enter player detail!")
    }
    const gameUTO = createGameUTO( playerInfo.playerOneName, playerInfo.playerTwoName, gameMode, boardLayout, [ playerInfo.playerOneMarker, playerInfo.playerTwoMarker ] );
    const data = await startGame(userId, gameUTO);
    console.log(data);
  }
 
  // Returning JSX:
  return ( 
    <div>
      {step === STEPS.SETUP && (
        <>
          <GameMode setGameMode={ setGameMode } />
          <SelectBoardLayout setBoardLayout={setBoardLayout} setBoardStyle={setBoardStyle} />
          <BlackButton 
              label="Next" 
              onClick={() => setStep(STEPS.PLAYERS)} 
          />
        </>
      )}

      {step === STEPS.PLAYERS && (
        <>
          { gameMode === 'MULTIPLAYER' ? <PlayerInfo setPlayerInfo={setPlayerInfo} /> : <SelectAi /> }
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