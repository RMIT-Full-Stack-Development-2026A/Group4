import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./useProfile";

export const usePasswordUpdate = () => {
    const { updateProfile } = useProfile();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const successResult = await updateProfile({
                oldPassword: form.oldPassword,
                password: form.password
            });

            if (successResult) {
                setSuccess(true);
                setError("");
                setTimeout(() => navigate("/profile"), 1500);
            }
        } catch (err) {
            setError(err.message || "Failed to update password");
        }
    };

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setError(""); // Clear error when typing
    };

    return { form, error, success, handleSubmit, updateField };
};