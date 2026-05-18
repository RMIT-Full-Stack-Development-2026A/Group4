import React from 'react'

const BoardDisplay = ({board}) => {
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
              className={`
                w-20 h-20
                border border-gray-300
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