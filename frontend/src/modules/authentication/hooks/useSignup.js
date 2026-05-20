import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserContext';
import { signupService } from '../service/authService';
import { validateSignup } from '../../../utils/validation';

const useSignup = () => {
    // Auth Context
    const { user, updateUserInfo } = useAuth();
    
    // States and hooks
    const navigate = useNavigate();
    const [signUpInput, setSignUpInput] = useState({
        username: '',
        email : '',
        password: '',
        confirmPassword: '',
        country: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    // redirect if the user is logged in
    useEffect(() => {
        if (user) {
            navigate('/lobby');
        }
    }, [user, navigate]);

    // Functions
    // Handling changing input
    const handleChangingInput = (e) => {
        const {name, value} = e.target;
        setSignUpInput((prev)=>({
            ...prev,
            [name]: value
        }))
    };

    // handling signup submission
    const handleSignupSubmission = async (e) => {
        e.preventDefault();

        // Frontend Validation
        const clientError = validateSignup(signUpInput);
        if (clientError) {
            setErrorMessage(clientError);
            return; // Stop here, don't call the server
        }

        // Backend Validation
        try {
            const data = await signupService(signUpInput);
            updateUserInfo(data.user);
            navigate('/lobby');
        }
        catch (err) {
            setErrorMessage(err.message || 'Error signing up! Please try again later...');
        }
    };

    return {
        signUpInput,
        errorMessage,
        handleChangingInput,
        handleSignupSubmission
    };
};

export default useSignup