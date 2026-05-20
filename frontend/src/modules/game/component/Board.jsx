import React from 'react'

const Board = ({ board, winningCells = [], styling, makeMove, playerId, id, interactive = false, markers = [] }) => {
  const style = Array.isArray(styling) ? styling[0] : styling;

  const isWinningCell = (r, c) =>
    winningCells.some(cell => cell.row === r && cell.col === c);

  const getCellStyle = (cell) => {
    if (!interactive) return ''
    return cell === null ? 'cursor-pointer' : 'cursor-default'
  }

  const getMarkerColor = (cell) => {
    if (!cell) return ''
    return cell === markers[0] ? 'text-blue-500' : 'text-red-500';
  }

  return (
    <div className={`inline-block border-2 rounded-lg overflow-hidden shadow-lg ${style?.board ?? 'border-gray-800 bg-white'}`}>
      {board.map((row, r) => (
        <div key={r} className='flex'>
          {row.map((cell, c) => (
            <div
              key={c}
              onClick={() => interactive && makeMove?.(r, c, playerId, id)}
              className={`
                w-20 h-20 border
                flex items-center justify-center
                text-sm font-bold
                transition-colors duration-150
                ${style?.cell ?? 'border-gray-300 bg-white hover:bg-gray-100'}
                ${isWinningCell(r, c) ? 'border-green-400' : ''}
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