import { SelectionButton } from "../../../reusable/CustomButtons";
import { User, Bot, Swords } from 'lucide-react'

const SelectStarter = ({ playerOneName, playerTwoName, firstPlayer, setFirstPlayer, isAi }) => {
    
    return (
        <div className="flex flex-col gap-8 p-5 items-center">
            <h1 className='text-center text-3xl font-bold text-gray-800'>Click on which player you want to go first!</h1>

            <div className='flex flex-col md:flex-row gap-4 w-full max-w-lg'>
                {/* Player 1 Option */}
                <SelectionButton 
                    label={`P1: ${playerOneName}`}
                    Icon={User}
                    isActive={firstPlayer?.name === playerOneName}
                    onClick={() => setFirstPlayer({ name: playerOneName })}
                />

                {/* Player 2 / AI Option */}
                <SelectionButton 
                    label={isAi ? `BOT: ${playerTwoName}` : `P2: ${playerTwoName}`}
                    Icon={isAi ? Bot : User}
                    isActive={firstPlayer?.name === playerTwoName}
                    onClick={() => setFirstPlayer({ name: playerTwoName })}
                />
            </div>
        </div>
    );
};

export default SelectStarter;