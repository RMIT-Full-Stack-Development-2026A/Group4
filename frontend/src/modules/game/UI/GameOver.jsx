import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getGameData } from '../service/gameServices';
import BoardDisplay from '../component/BoardDisplay';

const GameOver = () => {
    const {id} = useParams();
    const [gameData, setGameData] = useState(null);
    useEffect(()=>{
        const getData = async () => {
            const data = await getGameData(id);
            setGameData(data.data);
            console.log(gameData);
        }
        getData();
    }, [id])
    console.log(gameData);
    const navigate = useNavigate();
    if (!gameData) return <div>Loading game data</div>
    return (
        <div>
            <h1>Game Over!</h1>
            <div>
                <p>Winner: {gameData.winner}</p>
                <p>Status: {gameData.status}</p>
                <div>
                    <h1>Players:</h1>
                    <p>Player One: {gameData.host_name}</p>
                    <p>Player Two: {gameData.guest_name}</p>
                </div>
                <div>
                    <h1>Board:</h1>
                    <div>
                        <BoardDisplay board={gameData.board} />
                    </div>
                </div>
            </div>
            <button onClick={()=>navigate('/lobby')}>Return to lobby</button>
        </div>
  )
}

export default GameOver