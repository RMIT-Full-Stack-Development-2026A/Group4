import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { makeMove, abortGame } from '../service/game_services';
import { useGame } from '../../../context/GameContext';

export const useActiveGame = () => {
    // params, states, navigate:
    const { id } = useParams();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const { gameState, setGameState, currentStyle } = useGame();

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
                    navigate(`/game/finish/${id}`);
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

    return { gameState, currentStyle, isProcessing, handleMove, handleAbort, id };
};