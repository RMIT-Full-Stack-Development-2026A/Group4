import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGamePlayData, makeMove, abortGame } from '../service/game_services';

export const useGame = () => {
    // params, states, navigate:
    const { id } = useParams();
    const navigate = useNavigate();
    const [gameState, setGameState] = useState(null);
    const [currentStyle, setCurrentStyle] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // fetch game data
    useEffect(() => {
        const loadGame = async () => {
            if (!id) return;
            try {
                // Reset states to prevent seeing the previous game's board
                setGameState(null);
                setCurrentStyle(null);

                const data = await fetchGamePlayData(id);
                setGameState(data.data);
                setCurrentStyle(data.style);
            } catch (err) {
                console.error("Load Error:", err);
            }
        };
        loadGame();
    }, [id]);

    // Handling move:
    const handleMove = async (row, col) => {
        // don't move if we are waiting for the server 
        // or if the square is already taken
        if (isProcessing || gameState?.status !== "ACTIVE" || gameState.board[row][col] !== null) return;

        setIsProcessing(true);
        try {
            const data = await makeMove(row, col, gameState.currentPlayer, id);
            if (data.success) {
                
                setGameState(prev => ({
                    ...prev,        // Keep permanent states (including markers, size, ...)
                    ...data.data    // Overwrite only what changed (board, winner, currentPlayer)
                }));

                if (data.data.status === "FINISHED") {
                    // Update the state first so the UI shows the final board
                    setGameState(prev => ({
                        ...prev,
                        ...data.data
                    }));

                    // Wait 2 seconds so the user can see the winning line
                    setTimeout(() => {
                        navigate(`/game/finish/${id}`);
                    }, 2000);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAbort = async () => {
        try {
            const confirmed = window.confirm("Abort this game?");
            if (!confirmed) return;
            
            const aborted = await abortGame(id);
            if (aborted) navigate('/lobby');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

     return { 
        gameState, 
        setGameState, 
        currentStyle, 
        isProcessing, 
        handleMove, 
        handleAbort, 
        id 
    };
};