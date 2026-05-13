import React, { useEffect } from "react";
import { useGame } from "../hook/useGame,js";
import GameBoard from "./GameBoard";

const GamePage = () => {
    const {
        game,
        loading,
        error,
        difficulty,
        setDifficulty,
        createGame,
        playMove
    } = useGame();

    useEffect(() => {
        createGame();
    }, []);

    return (
        <div className="flex flex-col items-center mt-10 gap-5">

            <h1 className="text-3xl font-bold text-red-600">
                TicTacToang 🤖
            </h1>

            {/* 🎯 AI LEVEL SELECTOR */}
            <div className="flex gap-2 items-center">
                <span className="font-semibold">Difficulty:</span>

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300"
                >
                    <option value="EASY">Easy 🤓</option>
                    <option value="MEDIUM">Medium 😎</option>
                    <option value="HARD">Hard 💀</option>
                </select>

                <button
                    onClick={createGame}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Start New Game
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {game && (
                <>
                    <GameBoard board={game.board} onClick={playMove} />

                    <div className="text-lg font-semibold">
                        {game.status === 'FINISHED'
                            ? `Winner: ${game.winner}`
                            : `Your move (X)`
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default GamePage;