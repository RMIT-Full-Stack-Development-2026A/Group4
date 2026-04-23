export const ADMIN_ENDPOINTS = {
    // URL to get the list of players
    PLAYERS: '/admin/players',

    // URL to update a player's status
    UPDATE_STATUS: (userId) => `/admin/players/${userId}`,
};
