import { useState } from 'react';

const CollapsibleBox = ({ title, children }) => {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-4">

                <span className="font-bold text-black"> {title} </span>

                <span className={`text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}> 
                    ▼ 
                </span>
            </button>

            <div className={`transition-all duration-300 overflow-hidden ease-in-out flex flex-col gap-2 pl-4 pt-2
                            ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'}`}>
                {children}
            </div>
        </div>
    );
};

export default CollapsibleBox 

