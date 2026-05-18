
import { missingGameData } from "./game.error.js";

export const validCredentials = ( req, res, next ) => {
    const gameData = req.body;
    const {host_name, guest_name, gameType, boardSize, markers } = gameData.userDTO;
    if (!host_name || !guest_name || !gameType || !boardSize || !markers) {
        throw new missingGameData();
    }
    next();
}