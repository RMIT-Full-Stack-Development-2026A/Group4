import { AIModels } from '../../../config/ai_models';
import { useLobby } from '../../../context/GameLobbyContext';

const SelectAi = () => {
    const { playerInfo, handleAiClick } = useLobby();
    const selectedAiName = playerInfo.playerTwoName;

    return (
        <div className='p-4 flex flex-col gap-8'>
            <h1 className='text-center text-3xl font-bold text-gray-800'>Choose Opponent</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {AIModels.map((ai) => (
                    <button
                        key={ai.id}
                        onClick={() => handleAiClick(ai)}
                        className={`flex p-6 rounded-2xl cursor-pointer transition-all duration-300 flex-col gap-2 text-left border-2
                            ${selectedAiName === ai.name 
                                ? 'bg-gray-900 text-white border-gray-900 shadow-xl scale-105' 
                                : 'bg-white text-black border-gray-100 hover:border-gray-300 shadow-sm'}`}
                    >
                        <span className="text-4xl">{ai.avatar}</span>
                        <h3 className='font-black text-xl uppercase'>{ai.name}</h3>
                        <p className='text-xs font-bold'>{ai.difficulty}</p>
                        <p className='text-sm mt-2 text-gray-400'>{ai.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectAi;