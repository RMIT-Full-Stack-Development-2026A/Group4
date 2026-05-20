import { httpHelper } from "../../../utils/httpHelper"
import { GAME_ENDPOINTS } from "../../../config/ApiConfig"

// Step in setting up
export const STEPS = { 
    SETUP: 'setup', 
    PLAYERS: 'players', 
    STARTER: 'starter',
    MARKERS: 'markers' 
}

// Player information
export const INITIAL_PLAYER_INFO = {
    playerOneName: '',
    playerOneMarker: 'X',
    playerTwoName: '',
    playerTwoMarker: 'O',
}

export const createGameUTO = ( playerOneName, playerTwoName, gameMode, boardLayout, boardStyle, markers, firstPlayer ) => {
    return {
        host_name: playerOneName,
        guest_name: playerTwoName,
        gameType: gameMode,
        boardSize: boardLayout,
        boardStyle: boardStyle,
        markers: markers,
        currentPlayer: firstPlayer.name,
        currentMarker: firstPlayer.marker,
    }
}

export const startGame = async (userId, userDTO) => {
    const response = await httpHelper.post(GAME_ENDPOINTS.INITIALIZE_GAME, {userId, userDTO}, {"Content-Type": "application/json"});
    if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to start game");
    }
    return response.data
}

export const handleStartGame = async ( userId, playerInfo, gameMode, boardConfig,firstPlayer ) => {
    const startUTO = createGameUTO(
        playerInfo.playerOneName, 
        playerInfo.playerTwoName, 
        gameMode, 
        boardConfig.layout,
        boardConfig.style, 
        [playerInfo.playerOneMarker, playerInfo.playerTwoMarker], 
        firstPlayer
    )
    const data = await startGame(userId, startUTO);
    if (!data) throw new Error("Error starting game!");
    return data;
}
