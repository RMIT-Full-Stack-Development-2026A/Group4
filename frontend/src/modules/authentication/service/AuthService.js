import { httpHelper } from "../../../utils/httpHelper";

export const loginService = async (credentials) => {
    const res = await httpHelper.post('/auth/login', credentials);
    if (res.status !== 200) throw new Error(res.data.message || "Login failed");
    return res.data;
};

export const signupService = async (userData) => {
    const res = await httpHelper.post('/auth/signup', userData);
    if (res.status !== 201) throw new Error(res.data.message || "Signup failed");
    return res.data;
};

export const logoutService = async () => {
    const res = await httpHelper.post('/auth/logout');
    return res.status === 200;
};