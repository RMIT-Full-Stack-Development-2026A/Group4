
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
    }
}

export default PlayerActionsReducer