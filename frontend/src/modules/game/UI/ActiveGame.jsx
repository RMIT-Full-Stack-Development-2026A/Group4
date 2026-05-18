import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getGameData, makeMove } from '../service/gameServices'
import Board from '../component/Board';

const ActiveGame = () => {
    const { id } = useParams();
    const [gameState, setGameState] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
            const data = await getGameData(id);
            if (data.success) setGameState(data.data);
        }
        fetchData();
    }, [id])
    const handleMove = async (row, col) => {
        const data = await makeMove(row, col, gameState.currentPlayer, id);
        if (data.success) setGameState(data.data);
    }

    if (!gameState) return (<div>Loading...</div>)
    return (
        <div>
            <h1>{gameState.host_name}</h1>
            <h1>{gameState.guest_name}</h1>
            <div>
                <h1>Current Player: {gameState.currentPlayer} | {gameState.currentMarker}</h1>
                <Board board={gameState.board} id ={id} makeMove={handleMove} playerId={gameState.currentPlayer} />
            </div>
            <button>Abort Game</button>
        </div>
    )
}

export default ActiveGame