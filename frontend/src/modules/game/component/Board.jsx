import React from 'react'

const Board = ({ board, makeMove, playerId, id}) => {
  const getCellStyle = (cell) => {
    if (cell === null) return 'hover:bg-gray-100 cursor-pointer'
    return 'cursor-default'
  }

  const getMarkerColor = (cell) => {
    if (!cell) return ''
    return cell === board[0][0] ? 'text-gray-900' : 'text-red-500'
  }

  return (
    <div className='inline-block border-2 border-gray-900 rounded-lg overflow-hidden shadow-lg'>
      {board.map((row, r) => (
        <div
          key={r}
          className='flex'
        >
          {row.map((cell, c) => (
            <div
              key={c}
              onClick={()=> makeMove(r, c, playerId, id)}
              className={`
                w-10 h-10
                border border-gray-300
                flex items-center justify-center
                text-sm font-bold
                transition-colors duration-150
                ${getCellStyle(cell)}
                ${getMarkerColor(cell)}
              `}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board