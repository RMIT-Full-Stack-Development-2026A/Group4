import PlayerRow from "./PlayerRow"
export default function PlayerManagement() {
    return (
        <div className="flex-1 flex-col bg-gray-200 p-8 overflow-y-auto">
            <h1 className="font-baloo font-bold text-black mb-8">
                Players Management
            </h1>
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

                    </tbody>
                </table>    
            </div>
            
        </div>
    )
}