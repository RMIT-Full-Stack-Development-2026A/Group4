import { useActiveGame } from '../hook/useGame';
import Board from '../component/Board';

const ActiveGame = () => {
    
    const { gameState, currentStyle, isProcessing, handleMove, handleAbort, id } = useActiveGame();

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
            <button onClick={()=>handleAbort()}>Abort Game</button>
        </div>
    )
}

export default ActiveGame