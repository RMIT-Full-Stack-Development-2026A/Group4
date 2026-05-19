// This file stores the backend urls for each module

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
    PLAYERS: '/admin/players',
    UPDATE_STATUS: (userId) => `/admin/players/${userId}`,
};

export const GAME_ENDPOINTS = {
    INITIALIZE_GAME: '/game/start',
    GET_GAME: (id) => `/game/${id}`,
    MAKE_MOVE: (id) => `/game/${id}/move`, // Post
    ABORT_GAME: (id) => `/game/finish/abort/${id}`,
}

export const SUBSCRIPTION_ENDPOINTS = {
    GET_PLAN: '/subscription/plan',
    DEPOSIT: '/subscription/deposit',
    BUY_WALLET: '/subscription/buy-wallet',
    CHECKOUT: '/subscription/stripe-checkout',
    VERIFY: '/subscription/stripe-verify',
    HISTORY: '/subscription/history'
};
