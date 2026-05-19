import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectBoardLayout from '../components/SelectBoardLayout'
import GameMode from '../components/GameMode'
import PlayerInfo from '../components/PlayerInfo'
import SelectAi from '../components/SelectAi'
import SelectMarkers from '../components/SelectMarkers'
import { BlackButton } from '../../../reusable/CustomButtons'
import { STEPS, INITIAL_PLAYER_INFO, createGameUTO, startGame } from '../services/lobby_services'
import { useAuth } from '../../../context/UserContext'

const GameLobby = () => {
    const navigate = useNavigate()
    const { userId, user } = useAuth()

    const [playerInfo, setPlayerInfo] = useState(INITIAL_PLAYER_INFO)
    const [firstPlayer, setFirstPlayer] = useState(null)
    const [step, setStep] = useState(STEPS.SETUP)
    const [gameMode, setGameMode] = useState(null)
    const [boardConfig, setBoardConfig] = useState({ layout: 10, style: '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (gameMode && gameMode !== 'MULTIPLAYER') {
            setPlayerInfo(prev => ({ ...prev, playerOneName: user.username }))
            setFirstPlayer({ name: user.username, marker: INITIAL_PLAYER_INFO.playerOneMarker })
        }
    }, [gameMode])

    const initializeGame = async () => {
        if (!playerInfo.playerOneName || !playerInfo.playerTwoName) {
            setError('Please enter player details')
            return
        }
        if (!playerInfo.playerOneMarker || !playerInfo.playerTwoMarker) {
            setError('Please select markers for both players')
            return
        }
        setError(null)
        setLoading(true)
        try {
            const gameUTO = createGameUTO(
                playerInfo.playerOneName,
                playerInfo.playerTwoName,
                gameMode,
                boardConfig.layout,
                boardConfig.style,
                [ playerInfo.playerOneMarker, playerInfo.playerTwoMarker ],
                firstPlayer
            )
            const data = await startGame(userId, gameUTO)
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
                    {gameMode === 'MULTIPLAYER'
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
                        : <SelectMarkers isAi={gameMode === "MULTIPLAYER"} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
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