import { useEffect, useState } from "react";
import { useProfile } from "../hook/useProfile";


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
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-4">Game History</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Find your opponent"
        className="w-full p-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-400 outline-none mb-6"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* LOADING */}
      {gameLoading && (
        <div className="text-gray-400 animate-pulse">Loading...</div>
      )}

      {/* ERROR */}
      {gameError && (
        <div className="text-red-500">{gameError}</div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-3">

        {games.map((g) => {
          const result =
            g.winner === "Draw"
              ? "Draw"
              : g.winner === g.host
              ? "Win"
              : "Lose";

          return (
            <div
              key={g.id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition"
            >

              {/* LEFT */}
              <div className="flex flex-col">
                <span className="font-bold text-lg">{g.guest}</span>
                <span className="text-sm text-gray-500">
                  {g.type === "MULTIPLAYER" ? "Local" : g.type}
                </span>
              </div>

              {/* RESULT */}
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold
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

              {/* TIME */}
              <div className="text-right text-sm text-gray-500">
                <div>
                  <span className="font-medium text-gray-700">Start At:</span>{" "}
                  {new Date(g.start).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium text-gray-700">End At:</span>{" "}
                  {g.end
                    ? new Date(g.end).toLocaleString()
                    : "In Progress"}
                </div>
              </div>

            </div>
          );
        })}

        {/* EMPTY STATE */}
        {games.length === 0 && (
          <div className="text-center text-gray-400 mt-6">
            No games found
          </div>
        )}

      </div>
    </div>
  );
};

export default GameHistory;