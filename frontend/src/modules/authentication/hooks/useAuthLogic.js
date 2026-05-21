import { useState, useEffect } from "react";
import { httpHelper } from "../../../utils/httpHelper";
import { AUTH_ENDPOINTS } from "../../../config/apiConfig";

export const useAuthLogic = () => {
    // Defining states: 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Checking cookie:
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await httpHelper.get(AUTH_ENDPOINTS.ME);

                if (response.status === 200) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.error("Auth Session Error:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    // Updating user info:
    const updateUserInfo = (userData) => {
        setUser(userData);
    };

    return { user, updateUserInfo, loading };
};