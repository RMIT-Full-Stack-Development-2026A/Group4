// Used for weak actions
export const WhiteButton = ({ label, onClick, disabled, className = "" }) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`
                py-3 text-gray-400 font-bold text-xs uppercase tracking-widest 
                hover:text-black transition-colors cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}`}
        >
            {label}
        </button>
    );
};

// Used for strong actions
export function BlackButton({ label, Icon, onClick, disabled, className = "" }) {
    return (
        <button 
            disabled={disabled}
            onClick={onClick}
            className={`
                flex items-center justify-center gap-2
                bg-gray-900 text-white p-4 font-bold rounded-lg 
                cursor-pointer transition-all duration-300 
                hover:bg-gray-600 disabled:opacity-50
                ${className}`}
        >
            {Icon && <Icon size={20} />}
            <span>{label}</span>
        </button>
    );
};

// Use for switching between options
export function SelectionButton({ label, Icon, isActive, onClick, className = "" }) {
    return (
        <button 
            onClick={onClick}
            className={`
                flex-1 flex items-center justify-center gap-2 p-4 rounded-lg 
                font-bold cursor-pointer transition-all ease-linear duration-200 
                hover:scale-102
                ${isActive 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-800 border'
                } 
                ${className}`}
        >
            {Icon && <Icon size={20} />}
            <span>{label}</span>
        </button>
    );
};