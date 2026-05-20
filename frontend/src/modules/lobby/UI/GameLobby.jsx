// Importing dependencies:
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Importing components
import SelectBoardLayout from '../components/SelectBoardLayout'
import GameMode from '../components/GameMode'
import PlayerInfo from '../components/PlayerInfo'
import SelectAi from '../components/SelectAi'
import SelectMarkers from '../components/SelectMarkers'
import SelectStarter from '../components/SelectStarter'
import { BlackButton } from '../../../reusable/CustomButtons'
// Importing logic-dependent information:
import { STEPS, INITIAL_PLAYER_INFO, handleStartGame } from '../services/lobby_services'
import { useAuth } from '../../../context/UserContext'

const GameLobby = () => {
  // Importing hooks and information
  const navigate = useNavigate()
  const { userId, user } = useAuth()
  // States: 
  const [playerInfo, setPlayerInfo] = useState(INITIAL_PLAYER_INFO)
  const [firstPlayer, setFirstPlayer] = useState(null)
  const [step, setStep] = useState(STEPS.SETUP)
  const [gameMode, setGameMode] = useState(null)
  const [boardConfig, setBoardConfig] = useState({ layout: 10, style: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Setting the first player once game mode is chosen
  useEffect(() => {
    if (gameMode) {
      setPlayerInfo(prev => ({ 
          ...prev, 
          playerOneName: user.username,
          playerTwoName: gameMode === 'AI' ? (prev.playerTwoName || 'Michael') : prev.playerTwoName 
      }));
    }
  }, [ gameMode, user.username ]);

  // Initializing game:
  const initializeGame = async () => {
    // Validation for names
    const p1Name = playerInfo.playerOneName || user.username;
    const p2Name = playerInfo.playerTwoName; 

    if (!p1Name || !p2Name) {
      setError('Please enter player details');
      return;
    }

    // Validation for markers
    if (!playerInfo.playerOneMarker || !playerInfo.playerTwoMarker) {
      setError('Please select markers for both players');
      return;
    }

    // Determine starter and grab their current marker
    // Default to Player 1 if for some reason firstPlayer wasn't set.
    const isP1Starting = !firstPlayer || firstPlayer.name === p1Name;
    
    const finalStarter = {
      name: isP1Starting ? p1Name : p2Name,
      marker: isP1Starting ? playerInfo.playerOneMarker : playerInfo.playerTwoMarker
    };

    setError(null);
    setLoading(true);
    try {
      const gameUTO = {
          ...playerInfo,
          playerOneName: p1Name,
          playerTwoName: p2Name
      };

      const data = await handleStartGame(userId, gameUTO, gameMode, boardConfig, finalStarter);
      navigate(`/game/${data.data.id}`);
    } catch (err) {
      setError('Failed to start game, please try again');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl py-10 px-4 flex flex-col gap-10">
      {step === STEPS.SETUP && (
        <>
          <GameMode setGameMode={setGameMode} />
          <SelectBoardLayout setBoardConfig={setBoardConfig} />
          <div className='flex justify-center'>
            <BlackButton
              disabled={!gameMode}
              label='Next'
              onClick={() => setStep(STEPS.PLAYERS)}
              className="w-64" 
            />
          </div>
        </>
      )}

      {step === STEPS.PLAYERS && (
          <>
              { gameMode === 'MULTIPLAYER'
                  ? <PlayerInfo playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
                  : <SelectAi playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
              }
              <div className='flex gap-4 mt-8 justify-center'>
                  <BlackButton label='Back' onClick={() => setStep(STEPS.SETUP)} />
                  <BlackButton 
                    disabled={!playerInfo.playerOneName || !playerInfo.playerTwoName}
                    label='Next' 
                    onClick={() => setStep(STEPS.STARTER)} 
                  />
              </div>
          </>
      )}

      {step === STEPS.STARTER && (
          <div className="animate-in fade-in duration-500">
              <SelectStarter 
                  playerOneName={playerInfo.playerOneName}
                  playerTwoName={playerInfo.playerTwoName}
                  firstPlayer={firstPlayer}
                  setFirstPlayer={setFirstPlayer}
                  isAi={gameMode === 'AI'} 
              />
              <div className='flex gap-4 mt-12 justify-center'>
                  <BlackButton 
                      label='Back' 
                      onClick={() => setStep(STEPS.PLAYERS)} 
                  />
                  <BlackButton 
                      disabled={!firstPlayer}
                      label='Next' 
                      onClick={() => setStep(STEPS.MARKERS)} 
                  />
              </div>
          </div>
      )}

      {step === STEPS.MARKERS && (
          <>
              <SelectMarkers isAi={gameMode === 'AI'} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
              {error && <p className='text-red-500 text-sm text-center mb-4'>{error}</p>}
              <div className='flex gap-4 justify-center'>
                  <BlackButton label='Back' onClick={() => setStep(STEPS.STARTER)} />
                  <BlackButton
                      label={loading ? 'Starting...' : 'Start Game'}
                      disabled={loading}
                      onClick={initializeGame}
                  />
              </div>
          </>
      )}
    </div>
  )
}

export default GameLobby