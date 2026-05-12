import { gameDTO } from './game.dto.js';
import * as gameService from './game.service.js';

//START
export const startGame = async (req, res, next) => {
    try {
        const game = await gameService.startGame(
            req.user.id,
            req.body
        );
        return res.status(201).json({success: true, data: new gameDTO(game)});
    } catch(err){
        next(err);
    }
};

//MOVE
export const playMove = async (req, res, next) => {
    try{
        const game = await gameService.playMove(
            req.params.id,
            req.user.id,
            req.body.row,
            req.body.col,
        );

        return res.status(200).json({success: true, data: new gameDTO(game)});
    } catch(err){
        next(err);
    }
};

//HISTORY
export const getHistory = async (req, res, next) => {
    try{
        const history = await gameService.getHistory(req.user.id);

        return res.status(200).json({success: true, data: history.map(game => new gameDTO(game))});
    } catch(err){
        next(err);
    }
};