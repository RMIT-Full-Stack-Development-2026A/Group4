import PlayerRow from "../components/PlayerRow"
import useAdmin from "../hooks/useAdmin"

export default function PlayerManagement() {
    
    const { players, loading, toggleStatus } = useAdmin();
    
    return (
        <div className="flex-1 flex flex-col bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-black mb-8 uppercase">
                Players Management
            </h1>

            {loading ? (
                <div className="p-10 text-center font-bold text-gray-500">Loading players...</div>
            ) : (
                <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-bold">Username</th>
                                <th className="p-4 font-bold">Email</th>
                                <th className="p-4 font-bold text-center">Premium</th>
                                <th className="p-4 font-bold text-center">Status</th>
                                <th className="p-4 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map(player => (
                                <PlayerRow key={player.id} player={player} onToggle={toggleStatus} />
                            ))}
                        </tbody>
                    </table>    
                </div> 
            )}
        </div>
    );
}