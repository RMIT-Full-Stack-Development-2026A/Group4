import { useEffect, useState } from "react";
import { useProfile } from "../hook/useProfile";


const GameHistory = () => {
  const { games, searchGames, gameLoading, gameError } = useProfile();

  const [filters, setFilters] = useState({
    keyword: "",
    result: "ALL",
    type: "ALL",
    startDate: "",
    endDate: "",
    sort: "newest"
  });


  useEffect(() => {
  const delay = setTimeout(() => {
    searchGames(filters);
  }, 400);

  return () => clearTimeout(delay);
}, [filters]);

  return (
  <div className="p-6 max-w-5xl mx-auto">

    {/* HEADER */}
    <div className="mb-6">
      <h2 className="text-3xl font-extrabold text-gray-800">
         Game History
      </h2>
      <p className="text-gray-500 text-sm">
        Track your matches and performance
      </p>
    </div>

    {/*  Search */}
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search opponent..."
        className="w-full p-3 pl-10 rounded-xl border shadow-sm 
        focus:ring-2 focus:ring-blue-400 outline-none"
        value={filters.keyword}
        onChange={(e) =>
          setFilters(prev => ({ ...prev, keyword: e.target.value }))
        }
      />
      <span className="absolute left-3 top-3 text-gray-400">🔍</span>
    </div>

    {/* Filter bar */}
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 
        grid grid-cols-2 md:grid-cols-5 gap-3">

      <select
        className="p-2 border rounded-lg hover:border-blue-400"
        onChange={(e) =>
          setFilters(prev => ({ ...prev, result: e.target.value }))
        }
      >
        <option value="ALL">All Results</option>
        <option value="WIN">Win</option>
        <option value="LOSE">Lose</option>
        <option value="DRAW">Draw</option>
        <option value="ABORTED">Aborted</option>
      </select>

      <select
        className="p-2 border rounded-lg hover:border-blue-400"
        onChange={(e) =>
          setFilters(prev => ({ ...prev, type: e.target.value }))
        }
      >
        <option value="ALL">All Types</option>
        <option value="AI">AI</option>
        <option value="MULTIPLAYER">Local</option>
      </select>

      <input
        type="date"
        className="p-2 border rounded-lg"
        onChange={(e) =>
          setFilters(prev => ({ ...prev, startDate: e.target.value }))
        }
      />

      <input
        type="date"
        className="p-2 border rounded-lg"
        onChange={(e) =>
          setFilters(prev => ({ ...prev, endDate: e.target.value }))
        }
      />

      <select
        className="p-2 border rounded-lg hover:border-blue-400"
        onChange={(e) =>
          setFilters(prev => ({ ...prev, sort: e.target.value }))
        }
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>

    {/* Loading */}
    {gameLoading && (
      <div className="text-gray-400 animate-pulse text-center">
        Loading games...
      </div>
    )}

    {/* Error */}
    {gameError && (
      <div className="text-red-500 text-center">{gameError}</div>
    )}

    {/* Game List */}
    <div className="flex flex-col gap-4">

      {games.map((g, index) => {
        const result =
          g.winner === "Draw"
            ? "Draw"
            : g.winner === g.host
            ? "Win"
            : "Lose";

        return (
          <div
            key={g.id}
            className="bg-white rounded-xl shadow-md p-5 
            flex justify-between items-center
            hover:shadow-xl hover:scale-[1.01] transition duration-300"
          >

            {/* Left */}
            <div className="flex items-center gap-4">
              
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-100 
                  flex items-center justify-center font-bold text-blue-600">
                {g.guest?.charAt(0)}
              </div>

              <div>
                <div className="font-bold text-lg text-gray-800">
                  {g.guest}
                </div>
                <div className="text-sm text-gray-500">
                  {g.type === "MULTIPLAYER" ? "Local Match" : "AI Match"}
                </div>
              </div>
            </div>

            {/* Result badge */}
            <div
              className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  result === "Win"
                    ? "bg-green-100 text-green-600"
                    : result === "Lose"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-200 text-gray-600"
                }`}
            >
              {result}
            </div>

            {/* Time */}
            <div className="text-right text-sm text-gray-500">
              <div>
                <span className="text-gray-700 font-medium">Start:</span>{" "}
                {new Date(g.start).toLocaleString()}
              </div>
              <div>
                <span className="text-gray-700 font-medium">End:</span>{" "}
                {g.end
                  ? new Date(g.end).toLocaleString()
                  : <span className="text-yellow-500">In Progress</span>}
              </div>
            </div>

          </div>
        );
      })}

      {/* Empty data */}
      {games.length === 0 && !gameLoading && (
        <div className="text-center text-gray-400 mt-10">
           No games found
        </div>
      )}

    </div>
  </div>
);
};

export default GameHistory;