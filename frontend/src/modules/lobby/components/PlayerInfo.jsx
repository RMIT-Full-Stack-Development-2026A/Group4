import React, {useState} from 'react'
import { INITIAL_PLAYER_INFO } from '../services/lobby_services';

const PlayerInfo = ({ setPlayerInfo, setFirstPlayer }) => {
    const [players, setPlayers] = useState(INITIAL_PLAYER_INFO)
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPlayers((prev) => ({ ...prev, [name]: value }))
    }

    const handleConfirm = () => {
        if (!players.playerOneName || !players.playerTwoName) {
            setError('Please enter both player names')
            return
        }
        setError(null)
        setPlayerInfo(players)
        setIsConfirmed(true)
    }
    // Styling class:
    const playerBtnClass = (playerName) =>
        selectedPlayer?.name === playerName
            ? 'bg-gray-900 text-white rounded-lg p-4 cursor-pointer text-xl font-bold'
            : 'cursor-pointer border p-4 rounded-lg text-xl font-bold'

    // Selecting player:
    const handleSelectPlayer = (name, marker) => {
        const selected = { name, marker }
        setSelectedPlayer(selected)
        setFirstPlayer(selected)
    }

    if (isConfirmed) {
      return (
          <div>
            <h1 className='text-center text-3xl font-bold text-gray-900'>Player Information</h1>
            <p>Click on which player you want to go first!</p>
            <div className='text-center mt-4 flex flex-col gap-5 items-center'>
              <button
                onClick={() => handleSelectPlayer(players.playerOneName, players.playerOneMarker)}
                className={playerBtnClass(players.playerOneName)}
              >
                        Player One: <span className='font-medium'>{players.playerOneName}</span>
                    </button>
                    <button
                        onClick={() => handleSelectPlayer(players.playerTwoName, players.playerTwoMarker)}
                        className={playerBtnClass(players.playerTwoName)}
                    >
                        Player Two: <span className='font-medium'>{players.playerTwoName}</span>
                    </button>
                    <button
                        className='p-4 bg-gray-800 text-white font-bold rounded-lg cursor-pointer'
                        onClick={() => setIsConfirmed(false)}
                    >
                        Edit Info
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='flex shadow-lg p-5 flex-col gap-3'>
            <h1 className='text-center text-3xl font-bold text-gray-900'>Enter Player's Information</h1>
            {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
            <div className='p-2 flex justify-center flex-col gap-10 items-center'>
                <div className='rounded-lg p-4 flex-col flex gap-1'>
                    <label>Player 1's Name</label>
                    <input
                        className='p-2 border-gray-700 border rounded-lg'
                        onChange={handleInputChange}
                        name='playerOneName'
                        value={players.playerOneName}
                    />
                </div>
                <div className='rounded-lg p-4 flex-col flex gap-1'>
                    <label>Player 2's Name</label>
                    <input
                        className='p-2 border-gray-700 border rounded-lg'
                        onChange={handleInputChange}
                        name='playerTwoName'
                        value={players.playerTwoName}
                    />
                </div>
            </div>
            <button
                className='p-4 bg-gray-900 text-white font-bold rounded-lg cursor-pointer'
                onClick={handleConfirm}
            >
                Done
            </button>
        </div>
    )
}

export default PlayerInfo