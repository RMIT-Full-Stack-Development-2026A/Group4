import { findById } from "../accountModules/account.repository";
import GameSession from "./game.model"

export const createGame = (data) => {
    return GameSession.create(data);
};

export const findById = (id) => {
    return GameSession.findById(id);
};

export const updateById = (id, update) => {
    return GameSession.findByIdAndUpdate(id, update, {new: true});
};

export const save = (game) => {
    return game.save();
}

export const getHistory = (userId) => {
    return GameSession.find({
        $or: [{host_id: userId}, {guest_id: userId}]
    }).sort({startTime: -1});
}