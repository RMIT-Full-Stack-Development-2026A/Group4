import React, {useState} from 'react'

const PlayerInfo = ({ setPlayerInfo }) => {
  // States:
  const [players, setPlayers] = useState({
    playerOneName: '',
    playerTwoName: '',
  })
  // handle input change
  const handleInputChange = (e) => {
    // Destructure
    const { name, value } = e.target;
    setPlayers((prev) => ({ 
        ...prev,
        [name]: value
    }));
  }
  const initializePlayerInfo = () => {
    setPlayerInfo(players);
  }
  return (
    <div className='flex shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)] p-5 flex-col gap-3 fade-in slide-in-from-bottom-2 duration-500 delay-100'>
        <h1 className='text-center text-3xl font-bold text-gray-900'> Enter Players' Information: </ h1>
        <form className='p-2 flex justify-center flex-col gap-10 items-center align-middle'>
            <div className='rounded-lg p-4 flex-col flex  gap-1 '>
                <label htmlFor='playerOne'>Player 1's Name</label>
                <input className='p-2 border-gray-700 border rounded-lg' onChange={handleInputChange} name='playerOneName' value={players.playerOneName} />
            </div>
            <div className='rounded-lg flex p-4 gap-1 justify-baseline'>
                <label htmlFor='playerTwo'>Player 2's Name</label>
                <input onChange={handleInputChange} name='playerTwoName' value={players.playerTwoName} />
            </div>
        </form>
        <button onClick={initializePlayerInfo}>Done</button>
    </div>
  )
}

export default PlayerInfo