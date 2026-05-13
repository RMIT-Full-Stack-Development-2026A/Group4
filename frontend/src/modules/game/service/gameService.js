const BASE_URL = import.meta.env.VITE_SERVER_URL;

// CREATE GAME
export const createGameService = async (payload) => {
    const res = await fetch(`${BASE_URL}/game/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.data;
};

// PLAY MOVE
export const playMoveService = async (gameId, row, col) => {
    const res = await fetch(`${BASE_URL}/game/${gameId}/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ row, col }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.data;
};