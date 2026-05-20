import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { makeMove, abortGame } from '../service/game_services'
import Board from '../component/Board';
import { useGame } from '../../../context/GameContext';

// Component:
const ActiveGame = () => {
    // params, states, navigate:
    const { id } = useParams();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const { gameState, setGameState, currentStyle } = useGame()
  
    // Handling move:
    const handleMove = async (row, col) => {
        // don't move if we are waiting for the server 
        // or if the square is already taken
        if (isProcessing || gameState.board[row][col] !== null) return;

        setIsProcessing(true);
        try {
            const data = await makeMove(row, col, gameState.currentPlayer, id);
            if (data.success) {

                setGameState(prev => ({
                    ...prev,      // Keep permanent states (including markers, size, ...)
                    ...data.data  // Overwrite only what changed (board, winner, currentPlayer)
                }));

                if (data.data.status === "FINISHED") {
                    navigate(`/game/finish/${id}`);
                }
            }
        } finally {
            setIsProcessing(false);
        }
    };

    // Game abortion:
    const handleGameAbortion = async () => {
        const aborted = await abortGame(id);
        if (!aborted) throw new Error("Error aboring game!");
        navigate('/lobby');
    }

    // Loading state
    if (!gameState) return (<div>Loading...</div>)

    // Returning JSX: 
    return (
        <div>
            <h1>{gameState.host_name}</h1>
            <h1>{gameState.guest_name}</h1>
            <div>
                <h1>Current Player: {gameState.currentPlayer} | {gameState.currentMarker}</h1>
                <Board 
                    styling={currentStyle} 
                    board={gameState.board} 
                    id={id} 
                    makeMove={handleMove} 
                    playerId={gameState.currentPlayer} 
                    interactive={!isProcessing}
                    markers={gameState.markers}
                />
            </div>
            <button onClick={()=>handleGameAbortion()}>Abort Game</button>
        </div>
    )
}

export default ActiveGame