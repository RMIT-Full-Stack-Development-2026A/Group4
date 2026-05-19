// Contains the markers and the board layouts:

export const boardStyles = [
    {  
        id: 'classic',
        name: 'Classic',
        cell: 'bg-white border-gray-800 hover:bg-gray-100',
        board: 'border-gray-800 bg-white',
    },
    {  
        id: 'night',
        name: 'Night',
        cell: 'border-gray-600 bg-gray-900 hover:bg-gray-700 text-white',
        board: 'border-gray-500 bg-gray-900',
    },
    {  
        id: 'wood',
        name: 'Wood',
        cell: 'border-amber-900 bg-amber-100 hover:bg-amber-200',
        board: 'border-amber-900 bg-amber-100',
    }
];

export const markers = [
    { id: 'X',  label: 'X'  },
    { id: 'O',  label: 'O'  },
    { id: '★',  label: '★'  },
    { id: '▲',  label: '▲'  },
    { id: '♦',  label: '♦'  },  
    { id: '✿',  label: '✿'  },
]
