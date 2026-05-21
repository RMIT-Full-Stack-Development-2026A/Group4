import { useEffect, useState } from "react";
import { useGameHistory } from "../hook/useGameHistory";
import StatusBadge from "../../../reusable/StatusBadge";

const GameHistory = () => {
  const { games, keyword, setKeyword, loading, error } = useGameHistory();

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
      {loading && (
        <div className="text-gray-400 animate-pulse">Loading...</div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-red-500">{error}</div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-3">

        {games.map((g) => {
          let result = "draw";
          if (g.status === "ABORTED") result = "aborted";
          else if (g.winner === g.host_name) result = "win";
          else if (g.winner !== "Draw") result = "lose";

          return (
            <div
              key={g.id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition"
            >

              {/* LEFT */}
              <div className="flex flex-col w-1/3">
                <span className="font-bold text-lg">{g.guest}</span>
                <span className="text-sm text-gray-500">
                  {g.type === "MULTIPLAYER" ? "Local" : g.type}
                </span>
              </div>

              {/* RESULT */}
              <div className="flex-1 flex justify-center">
                <StatusBadge type={result} />
              </div>

              {/* TIME */}
              <div className="w-1/3 text-right text-sm text-gray-500">
                <p>
                  <span className="font-medium text-gray-700">Start At:</span>{" "}
                  {new Date(g.start).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium text-gray-700">End At:</span>{" "}
                  {g.end
                    ? new Date(g.end).toLocaleString()
                    : "In Progress"}
                </p>
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