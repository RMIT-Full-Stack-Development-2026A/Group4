import { useState } from "react";
import { getProfileService, updateProfileService, uploadAvatarService } from "../service/profileService";

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
        uploadAvatar
    };
};