import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Grid3x3 } from 'lucide-react'
import { SelectionButton } from '../../../reusable/CustomButtons'
import { boardStyles } from '../services/stylingLayouts'

// Layout options:
const LAYOUTS = [10, 15];

const SelectBoardLayout = ({ setBoardConfig }) => {
    const [styleIndex, setStyleIndex] = useState(0) // Representing the current index;
    const [currentLayout, setCurrentLayout] = useState(10) // The current board layout

    const currentStyle = boardStyles[styleIndex] // The current style chosen
    const cells = Array(currentLayout * currentLayout).fill(null) // Creating the array

    // Navigating between the styles
    const navigateStyle = (dir) => {
        const nextIndex = (styleIndex + dir + boardStyles.length) % boardStyles.length
        setStyleIndex(nextIndex)
        setBoardConfig(prev => ({ ...prev, style: boardStyles[nextIndex].id }))
    }

    const selectLayout = (size) => {
        setCurrentLayout(size)
        setBoardConfig(prev => ({ ...prev, layout: size }))
    }

    return (
        <div className='min-h-screen shadow-[0px_0px_6px_1px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-evenly'>
            <div className='flex items-center justify-center gap-2'>
                <h1 className='text-3xl font-semibold'>Select Board</h1>
                <Grid3x3 className='sm:hidden md:block' size={60} />
            </div>

            {/* style name indicator */}
            <p className='text-center text-gray-500 font-medium'>{currentStyle.name}</p>

            <div className='flex items-center justify-center w-full gap-4'>
                <button onClick={() => navigateStyle(-1)}>
                    <ArrowLeft className='cursor-pointer transition-transform duration-300 hover:scale-105' size={60} />
                </button>

                {/* board preview */}
                <div
                    style={{ gridTemplateColumns: `repeat(${currentLayout}, 1fr)`, width: '55%' }}
                    className={`grid max-h-[50vh] md:max-h-[70vh] aspect-square gap-0.5 ${currentStyle.board}`}
                >
                    {cells.map((_, index) => (
                        <div
                            key={index}
                            className={`border aspect-square transition-colors duration-150 ${currentStyle.cell}`}
                        />
                    ))}
                </div>

                <button onClick={() => navigateStyle(1)}>
                    <ArrowRight className='cursor-pointer transition-transform duration-300 hover:scale-105' size={60} />
                </button>
            </div>

            {/* layout toggle */}
            <div className='flex gap-5 flex-col justify-center items-center md:flex-row'>
                <SelectionButton
                    label='10x10'
                    isActive={currentLayout === 10}
                    onClick={() => selectLayout(10)}
                />
                <SelectionButton
                    label='15x15'
                    isActive={currentLayout === 15}
                    onClick={() => selectLayout(15)}
                />
            </div>
        </div>
    )
}

export default SelectBoardLayout