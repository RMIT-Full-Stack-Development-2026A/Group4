import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserContext';
import { signupService } from '../service/authService';

const useSignup = () => {
    // Auth Context
    const { updateUserInfo } = useAuth();
    
    // States
    const navigate = useNavigate();
    const [signUpInput, setSignUpInput] = useState({
        username: '',
        email : '',
        password: '',
        confirmPassword: '',
        country: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

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
        try {
            // calling backend via centralized service
            const data = await signupService(signUpInput);
            
            updateUserInfo(data.user);
            navigate('/lobby');
        }
        catch (err) {
            // Setting error message from backend (e.g., the specific weak password errors)
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