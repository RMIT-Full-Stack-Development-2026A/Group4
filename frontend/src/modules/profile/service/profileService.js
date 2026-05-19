import { httpHelper } from "../../../utils/httpHelper";
import { PROFILE_ENDPOINTS } from "../../../config/apiConfig";

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

export const searchGamesService = async (query) => {
    const keyword = query?.keyword ?? "";

    const res = await httpHelper.get(`/profile/games/search?keyword=${encodeURIComponent(keyword)}`);

    if(res.status !== 200){
        throw new Error(res.data.message);
    }

    return res.data.data;
}