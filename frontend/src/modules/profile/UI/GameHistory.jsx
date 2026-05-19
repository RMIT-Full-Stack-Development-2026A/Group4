import { useEffect } from "react";
import { useProfile } from "../hook/useProfile";
import { useState } from "react";

const GameHistory = () => {
  const { games, searchGames, gameLoading, gameError } = useProfile();

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
  const delay = setTimeout(() => {
    if (keyword.trim() === "") {
      searchGames({keyword: ""}); // load all games
    } else {
      searchGames({ keyword });
    }
  }, 400);

  return () => clearTimeout(delay);
}, [keyword]);

  return (
    <div className="p-6">


        <h2 className="text-xl font-bold mb-3">Game History</h2>

        {/* Search Bar */}  
        <div className="flex gap-2 mb-4">
            <input 
            type="text"
            placeholder="Search by player or session number"
            className="border p-2 rounded w-full"
            value={keyword}
            onChange={(e) => {
                setKeyword(e.target.value)
            }} 
            />
        </div>
        {/*  Loading */}
        {gameLoading && (
            <div className="animate-pulse text-gray-400">
                Loading game history...
            </div>
    )}

        {/* Error */}
        {gameError && (
            <p className="text-red-500 mb-2">{gameError}</p>
        )}

        {/* TABLE */}
        <table className="w-full border">
            <thead>
            <tr>
                <th>Opponent</th>
                <th>Type</th>
                <th>Result</th>
                <th>Start</th>
                <th>End</th>
            </tr>
            </thead>

            <tbody>
            {games.map(g => (
                <tr key={g.id}>
                <td>{g.guest}</td>
                <td>{g.type}</td>

                <td>
                    {g.winner === "Draw"
                    ? "Draw"
                    : g.winner === g.host
                    ? "Win"
                    : "Lose"}
                </td>

                <td>{new Date(g.start).toLocaleString()}</td>

                <td>
                    {g.end
                    ? new Date(g.end).toLocaleString()
                    : "In Progress"}
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        </div>
    );
};

export default GameHistory;