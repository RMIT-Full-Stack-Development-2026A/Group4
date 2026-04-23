import PlayerRow from "./PlayerRow"
import AdminService from "./AdminService"
import PlayerActionsReducer from "./PlayerActionsReducer"
import { useReducer, useEffect } from "react"

export default function PlayerManagement() {
    const [players, dispatch] = useReducer(PlayerActionsReducer, [])
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        AdminService.fetchAllPlayers()
        .then(players => dispatch({ type: "LOAD_PLAYERS", payload: players}))
        .catch(err => console.error("Failed to load: ", err))
        .finally(() => setLoading(false));
    }, [])
    
    return (
        <div className="flex-1 flex-col bg-gray-200 p-8 overflow-y-auto">
            <h1 className="font-baloo font-bold text-black mb-8">
                Players Management
            </h1>

            {loading ? (
                <div className="p-8 text-center font-baloo">Loading...</div>
            ) : (
                <div className="rounded-xl overflow-hidden bg-white">
                    <table className="rounded-md overflow-hidden text-left border-collapse">
                        <thead className="border-b border-black">
                            <tr>
                                <th className="table-head-cell text-left">Username</th>
                                <th className="table-head-cell text-left">Email</th>
                                <th className="table-head-cell text-center">Premium Status</th>
                                <th className="table-head-cell text-center">Active Status</th>
                                <th className="table-head-cell text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => 
                            <PlayerRow 
                                key={player.id} 
                                player={player} 
                                playerDispatch={dispatch}
                            />)}
                        </tbody>
                    </table>    
                </div>
            )}   
        </div>
    )
}