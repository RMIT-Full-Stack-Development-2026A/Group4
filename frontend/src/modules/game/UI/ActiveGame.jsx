import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGameData, makeMove, abortGame } from '../service/gameServices'
import Board from '../component/Board';

const ActiveGame = () => {
    // params, states, navigate:
    const { id } = useParams();
    const navigate = useNavigate();
    const [gameState, setGameState] = useState(null);
    
    // Fetching game state
    useEffect(()=>{
        const fetchData = async () => {
            const data = await getGameData(id);
            if (data.success) setGameState(data.data);
        }
        fetchData();
    }, [id])

    // Handling move
    const handleMove = async (row, col) => {
        const data = await makeMove(row, col, gameState.currentPlayer, id);
        if (data.success) setGameState(data.data);
        // If winner detected
        if (data.data.winner) {
            navigate(`/game/finish/${id}`)
        }
    }

    // Game abortion:
    const handleGameAbortion = async () => {
        const aborted = await abortGame(id);
        if (!aborted) {
            throw new Error("Error aborting this game");
        }
        navigate('/lobby')
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
                <Board board={gameState.board} id ={id} makeMove={handleMove} playerId={gameState.currentPlayer} />
            </div>
            <button onClick={()=>handleGameAbortion()}>Abort Game</button>
        </div>
    )
}

export default ActiveGame