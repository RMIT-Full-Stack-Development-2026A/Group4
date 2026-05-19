import React from 'react'

const PlayerCard = ({playerInfo}) => {
  return (
    <div>
        <div>
            <img src={playerInfo.avatar}></img>
        </div>
        <p>{playerInfo.name}</p>
    </div>
  )
}

export default PlayerCard