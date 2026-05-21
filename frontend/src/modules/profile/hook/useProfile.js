import { useState, useEffect } from "react";
import { getProfileService, updateProfileService, uploadAvatarService, changePasswordService, searchGamesService } from "../service/profileService";
import { useAuth } from "../../../context/UserContext";

export const useProfile = () => {
    const { user } = useAuth(); 
    const [profile, setProfile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

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
        if (!file) return;

        // Visual Preview
        setPreview(URL.createObjectURL(file));

        try {
            setLoading(true);
            const res = await uploadAvatarService(file);
            setProfile(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { 
        user, profile, preview, loading, error, 
        updateProfile, uploadAvatar
    };
};