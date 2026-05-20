import { httpHelper } from "../../../utils/httpHelper";
import { PROFILE_ENDPOINTS, AUTH_ENDPOINTS } from "../../../config/apiConfig";

export const getProfileService = async () => {
    const res = await httpHelper.get(PROFILE_ENDPOINTS.PROFILE);
    
    if (res.status !== 200) {
        throw new Error(res.data.message || "Failed to load profile");
    }
    return res.data;
};

export const updateProfileService = async (payload) => {
    const res = await httpHelper.put(PROFILE_ENDPOINTS.PROFILE, payload);

    if (res.status !== 200) {
        throw new Error(res.data.message || "Update failed");
    }
    return res.data;
};

export const uploadAvatarService = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await httpHelper.put(PROFILE_ENDPOINTS.UPLOAD_AVATAR, formData);

    if(res.status !== 200){
        throw new Error(res.data.message);
    }

    return res.data;
}

export const changePasswordService = async (payload) => {

    const res = await httpHelper.put(
        AUTH_ENDPOINTS.CHANGE_PASSWORD,
        payload
    );

    if (res.status !== 200) {
        throw new Error(res.data.message);
    }

    return res.data;
};

export const searchGamesService = async (query) => {

    console.log("RAW QUERY:", query);

    const res = await httpHelper.get(PROFILE_ENDPOINTS.GAME_HISTORY, {
        params: query
    });

    if(res.status !== 200){
        throw new Error(res.data.message);
    }

    return res.data.data;
};