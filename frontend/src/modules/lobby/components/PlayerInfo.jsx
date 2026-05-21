import { useLobby } from "../../../context/GameLobbyContext";

const PlayerInfo = () => {
    const { playerInfo, handlePlayerInputChange } = useLobby();

    return (
        <div className='flex shadow-lg p-8 flex-col gap-6 bg-white rounded-2xl'>
            <h1 className='text-center text-3xl font-bold text-gray-800'>Enter Players</h1>
            <div className='flex flex-col md:flex-row gap-6 justify-center items-center'>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xs font-bold text-gray-400 uppercase">Player 1 Name</label>
                    <input
                        className='p-3 border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-all'
                        onChange={handlePlayerInputChange}
                        name='playerOneName'
                        value={playerInfo.playerOneName}
                        placeholder="e.g. S412345"
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className="text-xs font-bold text-gray-400 uppercase">Player 2 Name</label>
                    <input
                        className='p-3 border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-all'
                        onChange={handlePlayerInputChange}
                        name='playerTwoName'
                        value={playerInfo.playerTwoName}
                        placeholder="e.g. FriendName"
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerInfo;