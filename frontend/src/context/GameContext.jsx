import { useState, useEffect } from "react";
import { useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import { fetchGamePlayData } from "../modules/game/service/game_services";

// Creating context
const GameContext = createContext(null);

// Provider function: 
export const GameProvider = ({children}) => {
    const { id } = useParams(); // Obtaining the game Id:
    const [gameState, setGameState] = useState(null);
    const [currentStyle, setCurrentStyle] = useState(null);

    useEffect(()=>{
        const fetch = async () => {
            // Resetting state and style
            setGameState(null);
            setCurrentStyle(null)
            // Fetching information:
            const data = await fetchGamePlayData(id); // fetching game
            // Setting state
            setGameState(data.data); 
            setCurrentStyle(data.style); 
        }
        fetch();
    }, [id]) // Changes when ID changes

    return (
        <GameContext.Provider value={{ gameState, currentStyle, setGameState}}>
            {children}
        </GameContext.Provider>
    )
};  

// Defining game hook:
export const useGame = () => useContext(GameContext);