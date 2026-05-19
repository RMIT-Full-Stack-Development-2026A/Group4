import { useEffect, useState } from "react";
import AdminService from "../service/AdminService";

const useAdmin = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        try {
            setLoading(true);
            const data = await AdminService.fetchAllPlayers();
            setPlayers(data);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (userId, newStatus) => {
        try {
            await AdminService.updatePlayerStatus(userId, newStatus);
            
            setPlayers(prevPlayers => 
                prevPlayers.map(player => {
                    if (player.id === userId) {
                        return { ...player, isActive: newStatus };
                    } else {
                        return player;
                    }
                })
            );
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return { players, loading, toggleStatus };
};

export default useAdmin