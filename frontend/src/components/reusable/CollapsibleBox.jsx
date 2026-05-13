import { useState } from 'react';

const CollapsibleBox = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full border-b border-white/5">
            <button 
                onClick={toggleBox}
                className="flex w-full items-center justify-between p-4 hover:bg-white/5 transition-colors group"
            >
                <span className="font-bold text-white uppercase text-xs tracking-widest"> 
                    {title} 
                </span>

                <span className={`text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}> 
                    ▼ 
                </span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden
                            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                
                <div className="flex flex-col gap-1 px-4 pb-4">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default CollapsibleBox;