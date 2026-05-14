import { useEffect, useState } from "react";
import AdminService from "../service/AdminService";

const useAdmin = () => {
    const [players, dispatch] = useReducer(PlayerActionsReducer, []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        try {
            setLoading(true);
            const data = await AdminService.fetchAllPlayers();
            dispatch({ type: "SET_PLAYERS", payload: data });
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

     const toggleStatus = async (userId, newStatus) => {
        try {
            await AdminService.fetchAllPlayers(userId, newStatus);
            
            const prevPlayers = players
            setPlayers(prevPlayers.map(player => {
                if (player.id === action.payload.targetID) {
                    return { ...player, isActive: action.payload.newStatus };
                } else {
                    return player;
                }}
            ));
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return { players, loading, toggleStatus };
};

export default useAdmin