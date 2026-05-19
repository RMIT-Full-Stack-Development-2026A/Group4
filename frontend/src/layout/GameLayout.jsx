import React from 'react'
import { Outlet } from 'react-router-dom'
import { GameProvider } from '../context/GameContext'


const GameLayout = () => {
  return (
    <GameProvider>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </GameProvider>
  )
}

export default GameLayout