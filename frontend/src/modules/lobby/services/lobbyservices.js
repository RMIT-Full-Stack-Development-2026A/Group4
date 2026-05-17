import { httpHelper } from "../../../utils/httpHelper"
import { GAME_ENDPOINTS } from "../../../config/apiConfig"
// Step in setting up
export const STEPS = { SETUP: 'setup', PLAYERS: 'players' }

// Player information
export const INITIAL_PLAYER_INFO = {
    playerOneName: '',
    playerOneMarker: 'X',
    playerTwoName: '',
    playerTwoMarker: 'O',
}

export const createGameUTO = ( playerOneName, playerTwoName, gameMode, boardLayout, markers ) => {
    return {
        host_name: playerOneName,
        guest_name: playerTwoName,
        gameType: gameMode,
        boardSize: boardLayout,
        markers: markers,
    }
}

export const startGame = async (userId, userDTO) => {
    const res = await httpHelper.post(GAME_ENDPOINTS.INITIALIZE_GAME, {userId, userDTO});
        if (res.status !== 200) {
            throw new Error(res.data.message || "Failed to start game");
        }
        return res
}