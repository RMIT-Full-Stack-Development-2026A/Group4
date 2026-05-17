import React, {useState} from 'react'
import { INITIAL_PLAYER_INFO } from '../services/lobbyservices';

const PlayerInfo = ({ setPlayerInfo }) => {
  // States:
  const [ players, setPlayers ] = useState(INITIAL_PLAYER_INFO);
  const [click, setClick] = useState(false)
  // handle input change:
  const handleInputChange = (e) => {
    // Destructure
    const { name, value } = e.target;
    setPlayers((prev) => ({ 
        ...prev,
        [name]: value
    }));
  }
  // Initializing player information;
  const initializePlayerInfo = () => {
    setPlayerInfo(players);
    setClick(true);
  }
  if (click) {
    return (
      <div>
        <h1 className='text-center text-3xl font-bold text-gray-900'> Enter Players' Information: </ h1>
        <div className='text-center mt-4 flex flex-col gap-5 align-middle items-center '>
          <h3 className='text-xl font-bold'>Player One: <span className='font-medium'>{players.playerOneName}</span></h3>
          <h3 className='text-xl font-bold'>Player Two: <span className='font-medium'>{players.playerTwoName}</span></h3>
          <button className='p-4 bg-gray-800 text-white font-bold rounded-lg cursor-pointer' onClick={()=>setClick(false)}>Edit Info</button>
        </div>
      </div>
    )
  }
  return (
    <div className='flex shadow-lg p-5 flex-col gap-3 fade-in slide-in-from-bottom-2 duration-500 delay-100'>
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