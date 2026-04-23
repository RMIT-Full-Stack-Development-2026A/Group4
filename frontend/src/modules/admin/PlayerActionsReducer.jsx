import AdminService from "./AdminService"

const PlayerActionsReducer = (players, action) => {
    switch (action.type) {
        case "UPDATE_STATUS":
            return players.map(player => {
                if (player.id === action.payload.targetID) {
                    return { ...player, isActive: action.payload.newStatus };
                } else {
                    return player;
                }
            });
        case "LOAD_PLAYERS":
            return action.payload
    }
}

export default PlayerActionsReducer