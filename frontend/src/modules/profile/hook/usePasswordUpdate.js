import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePasswordService } from "../service/profileService";

export const usePasswordUpdate = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();

        // validate
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await changePasswordService({
                oldPassword: form.oldPassword,
                newPassword: form.password,
                confirmPassword: form.confirmPassword
            });

            setSuccess(true);

            setTimeout(() => {
                navigate("/profile");
            }, 1500);

        } catch (err) {
            setError(err.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setError("");
    };

    return { form, error, success, loading, changePassword, updateField };
};