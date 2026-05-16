export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
};

export const PROFILE_ENDPOINTS = {
    PROFILE: '/profile',
    UPLOAD_AVATAR: '/profile/avatar'
};

export const ADMIN_ENDPOINTS = {
    // URL to get the list of players
    PLAYERS: '/admin/players',

    // URL to update a player's status
    UPDATE_STATUS: (userId) => `/admin/players/${userId}`,
};

export const SUBSCRIPTION_ENDPOINTS = {
    HISTORY: '/subscription/history',
    DEPOSIT: '/subscription/deposit',
    BUY_WALLET: '/subscription/buy-wallet',
    CHECKOUT: '/subscription/stripe-checkout',
    VERIFY: '/subscription/stripe-verify'
};
