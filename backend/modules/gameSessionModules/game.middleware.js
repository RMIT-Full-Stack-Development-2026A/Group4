
import { missingGameData } from "./game.error";

export const validCredentials = (req, res, next) => {
    const { userDTO } = req.body.gameData;
    const {host_name, guest_name, gameType, boardSize, markers } = userDTO;
    if (!host_name || !guest_name || !gameType || !boardSize || !markers) {
        throw new missingGameData();
    }
    next();
}