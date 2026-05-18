import { httpHelper} from "../../../utils/httpHelper";
import { GAME_ENDPOINTS } from "../../../config/apiConfig";

export const getGameData = async (id) => {
    // fetching from backend
    const res = await httpHelper.get(GAME_ENDPOINTS.GET_GAME(id));
    if (res.status !== 200) {
        throw new Error("Error fetching game information");
    }
    return res.data
}

export const makeMove = async ( row, col, playerId, id ) => {
    const res = await httpHelper.post(GAME_ENDPOINTS.MAKE_MOVE(id), { row, col, playerId } );
    if (res.status !== 200) {
        throw new Error("Error making move!");
    }
    return res.data
}

export const abortGame = async (id) => {
    alert("You're aborting this game. Proceed?");
    const res = await httpHelper.post(GAME_ENDPOINTS.ABORT_GAME(id));
    if (res.status !== 200) {
        throw new Error("Error aborting game!");
    }
    return res.data;
}

