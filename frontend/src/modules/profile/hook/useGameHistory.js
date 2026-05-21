import { useState, useEffect } from "react";
import { searchGamesService } from "../service/profileService";

export const useGameHistory = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Teammate's filters moved here for clean architecture
    const [filters, setFilters] = useState({
        keyword: "",
        result: "ALL",
        type: "ALL",
        startDate: "",
        endDate: "",
        sort: "newest"
    });

    // Debounced effect for ALL filters
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchHistory();
        }, 400);
        return () => clearTimeout(delay);
    }, [filters]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await searchGamesService(filters);
            setGames(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Helper to update specific filter fields
    const updateFilter = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    return { games, loading, error, filters, updateFilter };
};