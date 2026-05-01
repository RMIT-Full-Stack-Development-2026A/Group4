// Importing dependencies:
import React from 'react'
import {Sword} from 'lucide-react'

// Start game button
const StartGameButton = () => {

    // Send data to back end
    // Redirect user to a game session based on the id of the new instance created. 
  return (
      <button className='p-5  cursor-pointer rounded-lg flex justify-center align-middle gap-2 border'><Sword/> Start Game</button>
  )
}

// Exporting: 
export default StartGameButton