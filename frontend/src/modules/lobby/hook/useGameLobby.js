import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserContext';
import { STEPS, INITIAL_PLAYER_INFO, handleStartGame } from '../services/lobby_services';
import { boardStyles } from '../../../config/styling_layouts';
export const useGameLobby = () => {
    // Importing hooks and information
    const navigate = useNavigate();
    const { userId, user } = useAuth();

    // States: 
    const [step, setStep] = useState(STEPS.SETUP);
    const [gameMode, setGameMode] = useState(null);
    const [playerInfo, setPlayerInfo] = useState(INITIAL_PLAYER_INFO);
    const [firstPlayer, setFirstPlayer] = useState(null);
    const [boardConfig, setBoardConfig] = useState({ layout: 10, style: 'classic' });
    const [styleIndex, setStyleIndex] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Setting the first player once game mode is chosen
    useEffect(() => {
        if (gameMode) {
            setPlayerInfo(prev => ({ 
                ...prev, 
                playerOneName: user.username,
                playerTwoName: gameMode === 'AI' ? (prev.playerTwoName || 'Michael') : prev.playerTwoName 
            }));
        }
    }, [gameMode, user.username]);

    // handle selecting board style
    const navigateStyle = (dir) => {
        const nextIndex = (styleIndex + dir + boardStyles.length) % boardStyles.length;
        setStyleIndex(nextIndex);
        setBoardConfig(prev => ({ ...prev, style: boardStyles[nextIndex].id }));
    };

    // handle selecting board layout
    const selectLayout = (size) => {
        setBoardConfig(prev => ({ ...prev, layout: size }));
    };

    // handle Player Info input
    const handlePlayerInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerInfo((prev) => ({ ...prev, [name]: value }));
    };
    
    // handle selecting AI
    const handleAiClick = (ai) => {
        setPlayerInfo(prev => ({ ...prev, playerTwoName: ai.name }));
    };

    // handle selecting markers
    const handleMarkerSelect = (playerSlot, markerId, isAi) => {
        if (isAi) {
            const aiMarker = markers.find(m => m.id !== markerId);
            setPlayerInfo(prev => ({
                ...prev,
                playerOneMarker: markerId,
                playerTwoMarker: aiMarker.id
            }));
        } else {
            setPlayerInfo(prev => ({ ...prev, [playerSlot]: markerId }));
        }
    };

    // Initializing game:
    const initializeGame = async () => {
        // Validation for names
        const p1Name = playerInfo.playerOneName || user.username;
        const p2Name = playerInfo.playerTwoName; 

        if (!p1Name || !p2Name) {
            setError('Please enter player details');
            return;
        }
        
        // Validation for markers
        if (!playerInfo.playerOneMarker || !playerInfo.playerTwoMarker) {
            setError('Please select markers');
            return;
        }

        // Determine starter and grab their current marker
        // Default to Player 1 if for some reason firstPlayer wasn't set.
        const isP1Starting = !firstPlayer || firstPlayer.name === playerInfo.playerOneName;
        const finalStarter = {
            name: isP1Starting ? playerInfo.playerOneName : playerInfo.playerTwoName,
            marker: isP1Starting ? playerInfo.playerOneMarker : playerInfo.playerTwoMarker
        };

        setError(null);
        setLoading(true);
        try {
            const data = await handleStartGame(userId, playerInfo, gameMode, boardConfig, finalStarter);
            navigate(`/game/${data.data.id}`);
        } catch (err) {
            setError(err.message || 'Failed to start game');
        } finally {
            setLoading(false);
        }
    };

    return {
        step, setStep, gameMode, setGameMode, playerInfo, setPlayerInfo,
        firstPlayer, setFirstPlayer, boardConfig, setBoardConfig,
        styleIndex, error, loading,
        handlePlayerInputChange, handleAiClick, navigateStyle, 
        selectLayout, handleMarkerSelect, initializeGame
    };
};

