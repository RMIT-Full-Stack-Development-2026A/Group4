import { useState, useEffect } from "react";
import { searchGamesService } from "../service/profileService";

export const useGameHistory = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            if (keyword.trim() === "") {
                searchGames(""); 
            } else {
                searchGames(keyword);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [keyword]);

    const searchGames = async (searchQuery) => {
        try {
            setLoading(true);
            // Pass the keyword to the service
            const data = await searchGamesService({ keyword: searchQuery });
            setGames(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { games, loading, error, keyword, setKeyword };
};