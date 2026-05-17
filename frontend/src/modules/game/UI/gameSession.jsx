import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getGameData } from '../service/gameServices';

const GameSession = () => {
    // Getting gameId from parameter
    const {gameId} = useParams();
    // State:
    const [gameState, setGameState] = useState(null)
    // Retrieve game info:
    useEffect(()=>{
        const fetchGame = async () => {
            const data = await getGameData(gameId);
            setGameState(data.data);
        }
        fetchGame();
    } , [gameId])
    // Loading state:
    if (!gameState) return (<div>Loading...</div>)
    // Player one select who goes first:
    
    // Return JSX: 
    return (
        <div>
            <h1>{gameState._id}</h1>
        </div>
    )
}

export default GameSession