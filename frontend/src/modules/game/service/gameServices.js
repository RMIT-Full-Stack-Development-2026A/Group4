import { httpHelper} from "../../../utils/httpHelper";
import { GAME_ENDPOINTS } from "../../../config/apiConfig";

export const getGameData = async (gameId) => {
    // fetching from backend
    const res = await httpHelper.get(GAME_ENDPOINTS.GET_GAME(gameId));
    return res.json();
}