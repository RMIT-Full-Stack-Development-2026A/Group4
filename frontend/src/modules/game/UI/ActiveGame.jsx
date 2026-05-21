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
                <div className="mb-4 flex items-center justify-center gap-4">

                <span className="text-gray-500 font-medium">
                    Current Player
                </span>

                <div className="bg-white shadow-md px-4 py-2 rounded-xl flex items-center gap-3">

                    <span className="font-bold text-lg text-gray-800">
                    {gameState.currentPlayer}
                    </span>

                    <span className="text-2xl">
                    {gameState.currentMarker}
                    </span>

                </div>
                </div>
                <div className="flex justify-center items-center w-full mt-6">
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
            </div>
            
            <div className="flex justify-center mt-4">
            <button onClick={()=>handleAbort()}
                className="bg-red-500 text-white
                            px-5 py-2
                            rounded-lg
                            font-semibold
                            shadow-md
                            hover:bg-red-600 hover:shadow-lg hover:scale-105
                            transition-all duration-200"
                            >
                                Abort Game
            </button>
            </div>
        </div>
    )
}

export default ActiveGame