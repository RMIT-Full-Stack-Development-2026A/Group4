import { useState } from "react";
import { getProfileService, updateProfileService, uploadAvatarService, searchGamesService } from "../service/profileService";

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [games, setGames] = useState([]);
    const [gameLoading, setGameLoading] = useState(false);
    const [gameError, setGameError] = useState(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfileService();
            setProfile(data.data);
        } catch (err){
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const updateProfile = async (payload) => {
        try {
            setLoading(true);
            const data = await updateProfileService(payload);
            setProfile(data.data);
        } catch(err){
            setError(err.message)
        } finally{
            setLoading(false);
        }
    };

    const uploadAvatar = async (file) => {
        try {
            setLoading(true);

            const res = await uploadAvatarService(file);

            setProfile(res.data);
        } catch (err){
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const searchGames = async (query) => {
        try {
            setGameLoading(true);

            const res = await searchGamesService(query);

            setGames(res);
            setGameError(null);
        } catch (err) {
            setGameError(err.message);
        } finally {
            setGameLoading(false);
        }
};



    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
        uploadAvatar,
        games,
        gameLoading,
        gameError,
        searchGames
    };
};