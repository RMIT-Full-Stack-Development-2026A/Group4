import React from 'react'
import { useNavigate} from 'react-router-dom'
import Board from '../component/Board';
import { useGame } from '../../../context/GameContext';

const GameOver = () => {
    // Extracting from game context:
    const { gameState,  currentStyle } = useGame();
    // Navigating:
    const navigate = useNavigate();

    if (!gameState) return <div>Loading game data</div>
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Game Over!
        </h1>

        {/* Main card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl flex flex-col gap-6">

            {/* Result */}
            <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
                Winner: <span className="text-green-600">{gameState.winner || "Draw"}</span>
            </p>
            <p className="text-sm text-gray-500">
                Status: {gameState.status}
            </p>
            </div>

            {/* Players */}
            <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-center font-semibold text-gray-700 mb-3">
                Players
            </h2>

            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Player One</span>
                <span className="font-medium">{gameState.host}</span>
            </div>

            <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Player Two</span>
                <span className="font-medium">{gameState.guest}</span>
            </div>
            </div>

            {/* Board */}
            <div className="flex flex-col items-center">
            <h2 className="font-semibold text-gray-700 mb-3">
                Final Board
            </h2>

            <div className="bg-white p-3 rounded-xl shadow-md">
                <Board 
                board={gameState.board} 
                styling={currentStyle} 
                winningCells={gameState.winningCells} 
                markers={gameState.markers}
                />
            </div>
            </div>

        </div>
        </div>
            <button onClick={()=>navigate('/lobby')}
                    className=" mt-4
                                bg-blue-500 text-white
                                px-5 py-2
                                rounded-lg
                                font-semibold
                                shadow-md
                                hover:bg-blue-600 hover:shadow-lg hover:scale-105
                                transition-all duration-200"
                    >
                    Return to lobby
            </button>
        </div>
  )
}

export default GameOver