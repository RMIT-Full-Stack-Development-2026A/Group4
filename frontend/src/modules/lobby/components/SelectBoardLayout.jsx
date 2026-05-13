import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Grid3x3 } from 'lucide-react';

const SelectBoardLayout = () => {
  const [currentLayout, setCurrentLayout] = useState(10);
  const [selectedLayout, setSelectedLayout] = useState(Array(currentLayout * currentLayout).fill(null))
  // Loads at first when mounted and when current layout changes: 
  useEffect(()=>{
    // Defining function for current layout
    const displayCurrentLayout = () => {
      // Creating a new array based on the layout size variable
      const newArray = Array( currentLayout * currentLayout ).fill(null);
      // Setting the state of the board to be based on the array
      setSelectedLayout(newArray);
    };
    displayCurrentLayout();
  }, [currentLayout]);
  // Submit Chosen Board Layout:
  // Carousel layout With board in middle and arrow pointing forward and backward to toggle
  return (
    <div className=' min-h-screen shadow-[0px_0px_6px_1px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-evenly '>
        
        <div className='flex items-center justify-center gap-2 align-middle'>
          <h1 className='text-3xl font-semibold'>Select Board Layout</h1>
          <Grid3x3 className='sm:hidden md:block' size={60} />
        </div>

        <div className='flex items-center justify-center w-full gap-4'>
          {/* left arrow */}
          <button>
            <ArrowLeft className='cursor-pointer transition-transform duration-300 hover:scale-105' size={60} />
          </button>
          
          {/* CONTAINER */}
          <div style={{
            gridTemplateColumns: `repeat(${currentLayout}, 1fr)`, 
            width: '55%', 
            height: 'auto' 
            }} className={`grid max-h-[50vh] md:max-h-[70vh] aspect-square gap-0.5`}>
              {/* GRID */}
              {selectedLayout.map((grid, index)=>(
                <div className='border-gray-800 cursor-pointer border aspect-square transition-color duration-150 hover:bg-gray-300' key={index}></div>
              ))}

          </div>
          {/* right arrow */}
          <button>
            <ArrowRight className='cursor-pointer transition-transform duration-300 hover:scale-105' size={60} />
          </button>
        </div>
        
        <div className='flex gap-5 flex-col justify-center align-middle items-center md:flex-row '>
          <button className='flex-1/3 border text-xl font-bold p-3 rounded-lg transition-transform cursor-pointer hover:scale-101 duration-200' onClick={()=>{ setCurrentLayout(10);}}>10x10</button>
          <button className='flex-1/3 border text-xl font-bold p-3 rounded-lg transition-transform cursor-pointer hover:scale-101 duration-200' onClick={()=>{ setCurrentLayout(15);}}>15x15</button>
        </div>
    
    </div>
  )
}

export default SelectBoardLayout