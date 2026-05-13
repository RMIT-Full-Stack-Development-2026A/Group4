const GameBoard = ({ board, onClick }) => {
    return (
        <div
            className="grid gap-1 bg-red-600 p-2 rounded-xl"
            style={{
                gridTemplateColumns: `repeat(${board.length}, 1fr)`
            }}
        >
            {board.map((row, i) =>
                row.map((cell, j) => (
                    <div
                        key={`${i}-${j}`}
                        onClick={() => onClick(i, j)}
                        className="w-10 h-10 flex items-center justify-center 
                                   bg-white text-xl font-bold cursor-pointer 
                                   hover:bg-red-100 transition"
                    >
                        {cell}
                    </div>
                ))
            )}
        </div>
    );
};

export default GameBoard;