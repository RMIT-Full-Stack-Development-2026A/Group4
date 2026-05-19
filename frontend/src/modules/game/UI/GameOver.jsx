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
            <h1>Game Over!</h1>
            <div>
                <p>Winner: {gameState.winner}</p>
                <p>Status: {gameState.status}</p>
                <div>
                    <h1>Players:</h1>
                    <p>Player One: {gameState.host_name}</p>
                    <p>Player Two: {gameState.guest_name}</p>
                </div>
                <div>
                    <h1>Board:</h1>
                    <div>
                        <Board board={gameState.board} styling={currentStyle} winningCells={gameState.winningCells} />
                    </div>
                </div>
            </div>
            <button onClick={()=>navigate('/lobby')}>Return to lobby</button>
        </div>
  )
}

export default GameOver