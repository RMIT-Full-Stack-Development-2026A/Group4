import { useReducer, useState } from "react";
import { updatePlayerStatusService } from "../service/AdminService";
import PlayerActionsReducer from "./PlayerActionsReducer";

const useAdmin = (initialPlayers = []) => {
    const [players, dispatch] = useReducer(PlayerActionsReducer, initialPlayers);
    const [loading, setLoading] = useState(false);

    const toggleStatus = async (userId, newStatus) => {
        try {
            setLoading(true);
            await updatePlayerStatusService(userId, newStatus);
            dispatch({ type: "UPDATE_STATUS", payload: { targetID: userId, newStatus } });
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally { 
            setLoading(false); 
        }
    };

    return { players, loading, toggleStatus };
};

export default useAdmin