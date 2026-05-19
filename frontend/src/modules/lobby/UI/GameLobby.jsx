// Importing dependencies:
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Importing components
import SelectBoardLayout from '../components/SelectBoardLayout'
import GameMode from '../components/GameMode'
import PlayerInfo from '../components/PlayerInfo'
import SelectAi from '../components/SelectAi'
import SelectMarkers from '../components/SelectMarkers'
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
    if (gameMode && gameMode !== 'MULTIPLAYER') {
      setPlayerInfo(prev => ({ ...prev, playerOneName: user.username }))
    }
  }, [ gameMode ])

  // Initializing game:
  const initializeGame = async () => {
    // If missing information
    if (!playerInfo.playerOneName || !playerInfo.playerTwoName) {
      setError('Please enter player details')
      return
    }
    // If unchosen marker:
    if (!playerInfo.playerOneMarker || !playerInfo.playerTwoMarker) {
      setError('Please select markers for both players')
      setStep(STEPS.PLAYERS);
      return
    }

    const FirstPlayer = firstPlayer || {
      name: playerInfo.playerOneName,
      marker: playerInfo.playerOneMarker
    };

    setError(null)
    setLoading(true)
    try {
      const data = await handleStartGame(userId, playerInfo, gameMode, boardConfig, FirstPlayer)
      navigate(`/game/${data.data.id}`)
    } catch (err) {
      setError('Failed to start game, please try again');
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {step === STEPS.SETUP && (
        <>
          <GameMode setGameMode={setGameMode} />
          <SelectBoardLayout setBoardConfig={setBoardConfig} />
          <BlackButton
            disabled={!gameMode}
            label='Next'
            onClick={() => setStep(STEPS.PLAYERS)}
          />
        </>
      )}

            {step === STEPS.PLAYERS && (
                <>
                    { gameMode === 'MULTIPLAYER'
                        ? <PlayerInfo setFirstPlayer={setFirstPlayer} setPlayerInfo={setPlayerInfo} />
                        : <SelectAi playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} setGameMode={setGameMode} />
                    }
                    <div className='flex gap-4'>
                        <BlackButton label='Back' onClick={() => setStep(STEPS.SETUP)} />
                        <BlackButton label='Next' onClick={() => setStep(STEPS.MARKERS)} />
                    </div>
                </>
            )}

            {step === STEPS.MARKERS && (
                <>
                    {gameMode === 'MULTIPLAYER'
                        ? <SelectMarkers playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
                        : <SelectMarkers isAi={gameMode !== "MULTIPLAYER"} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
                    }
                    {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
                    <div className='flex gap-4'>
                        <BlackButton label='Back' onClick={() => setStep(STEPS.PLAYERS)} />
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