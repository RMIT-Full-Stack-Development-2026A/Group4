import { useGame } from '../hook/useGame';
import Board from '../component/Board';
import { useAuth } from '../../../context/UserContext';
import UserBox from '../../../reusable/UserBox';

const ActiveGame = () => {
    const { user } = useAuth();
    const { gameState, currentStyle, isProcessing, handleMove, handleAbort, id } = useGame();

    // Loading state
    if (!gameState) return (<div>Loading...</div>)

    // Returning JSX: 
    return (
        <div className="flex flex-col items-center p-4 gap-8">
            
            <div className="flex items-center justify-between w-full max-w-4xl gap-4">
                
                {/* Host Card (You) */}
                <div className={`flex-1 transition-all duration-500 
                    ${gameState.currentPlayer === gameState.host? 'scale-105 opacity-100' : 'opacity-30'}
                `}>
                    <UserBox 
                        username={gameState.host}
                        avatarUrl={user?.avatarUrl} 
                        marker={gameState.markers[0]} 
                        isBlue={true}
                        className="bg-[#0a1b4d] rounded-2xl shadow-xl border-none"
                    />
                </div>

                <div className="text-gray-300 font-black text-2xl italic font-baloo px-2">VS</div>

                {/* Guest Card (Opponent/Bot) */}
                <div className={`flex-1 transition-all duration-500 
                    ${gameState.currentPlayer === gameState.guest? 'scale-105 opacity-100' : 'opacity-30'}
                `}>
                    <UserBox 
                        username={gameState.guest}
                        avatarUrl={null} 
                        marker={gameState.markers[1]} 
                        isBlue={false}
                        className="bg-[#0a1b4d] rounded-2xl shadow-xl border-none"
                    />
                </div>
            </div>

            {/* Turn Indicator */}
            <div className="bg-white border border-black px-6 py-2 rounded-full flex items-center gap-3">
                <span className="text-[14px] font-black text-gray-500 tracking-widest">Turn:</span>
                <span className="font-bold text-gray-800">{gameState.currentPlayer}</span>
            </div>

            {/* The Board */}
            <div className="flex justify-center items-center w-full">
                <Board 
                    styling={currentStyle} 
                    board={gameState.board} 
                    id={id} 
                    makeMove={handleMove} 
                    playerId={gameState.currentPlayer} 
                    interactive={!isProcessing}
                    markers={gameState.markers}
                    winningCells={gameState.winningLine}
                />
            </div>
            
            {/* Abort Button */}
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