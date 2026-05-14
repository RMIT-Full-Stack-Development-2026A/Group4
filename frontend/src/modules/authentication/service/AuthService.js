import { httpHelper } from "../../../utils/httpHelper";
import { AUTH_ENDPOINTS } from "../../../config/apiConfig";

export const loginService = async (credentials) => {
    const res = await httpHelper.post(AUTH_ENDPOINTS.LOGIN, credentials);
    if (res.status !== 200) throw new Error(res.data.message || "Login failed");
    return res.data;
};

export const signupService = async (userData) => {
    const res = await httpHelper.post(AUTH_ENDPOINTS.SIGNUP, userData);
    if (res.status !== 201) throw new Error(res.data.message || "Signup failed");
    return res.data;
};

export const logoutService = async () => {
    const res = await httpHelper.post(AUTH_ENDPOINTS.LOGOUT);
    return res.status === 200;
};