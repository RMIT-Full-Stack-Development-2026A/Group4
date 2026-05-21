import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../service/AdminService";
import { useAuth } from "../../../context/UserContext";
const useAdmin = () => {
    const navigate = useNavigate()

    const { user } = useAuth()
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (user && user.role !== 'ADMIN') {
            navigate('/lobby');
            return;
        }

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
        }

        if (user?.role === 'ADMIN') {
            loadPlayers();
        }
    }, []);

    

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