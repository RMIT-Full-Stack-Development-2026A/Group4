import { httpHelper } from "../../../utils/httpHelper";

export const getProfileService = async () => {
    const res = await httpHelper.get('/profile');
    
    if (res.status !== 200) {
        throw new Error(res.data.message || "Failed to load profile");
    }
    return res.data;
};

export const updateProfileService = async (payload) => {
    const res = await httpHelper.put('/profile', payload);

    if (res.status !== 200) {
        throw new Error(res.data.message || "Update failed");
    }
    return res.data;
};

export const uploadAvatarService = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await httpHelper.put('/profile/avatar', formData);

    if(res.status !== 200){
        throw new Error(res.data.message);
    }

    return res.data;
}