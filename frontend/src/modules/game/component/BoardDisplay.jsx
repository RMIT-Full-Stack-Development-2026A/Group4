import React from 'react'

const BoardDisplay = ({ board , winningCells = [] }) => {
  // Map through the board, if the row,col is within winning cells, we render differently if not we render normally
  // Check if it's a winning cell
  const isWinningCell = (r, c) => 
    winningCells.some((cell)=> cell.row === r && cell.col === c);
  /// Retrieve all the rows,cols of the winning Cells
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
              className={
                ` w-10 h-10
                border
                ${ isWinningCell(c, r) ? 'border-green-400' : 'border-gray-500'}
                flex items-center justify-center
                text-sm font-bold
                transition-colors duration-150 
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

export default BoardDisplay