import React from 'react'
import { Outlet } from 'react-router-dom'


const GameLayout = () => {
  return (
    <div>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default GameLayout