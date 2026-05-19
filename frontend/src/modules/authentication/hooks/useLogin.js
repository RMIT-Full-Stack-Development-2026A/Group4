import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserContext';
import { loginService } from '../service/authService';

const useLogin = () => {
    // Auth Context:
    const { user, updateUserInfo } = useAuth();
    
    // States and hooks 
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
      email: '',
      password: '',
    });
    const [loggedOutTime, setLoggedOutTime] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginAttempt, setLoginAttempt] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    // redirect if the user is logged in
    useEffect(() => {
        if (user) {
            navigate('/lobby');
        }
    }, [user, navigate]);

    // Countdown timer:
    useEffect(()=>{
      let timer;
        if (isLocked && loggedOutTime !== null && loggedOutTime > 0) {
            timer = setInterval(() => {
                setLoggedOutTime((prev) => prev - 1);
            }, 1000);
        }
        if (loggedOutTime === 0) {
            setIsLocked(false);
            setLoginAttempt(0);
            setLoggedOutTime(null); 
            setErrorMessage('');
        }
        return () => {clearInterval(timer)};
    }, [isLocked, loggedOutTime]);

    // Handling changing input
    const handleChangingInput = (e) => {
        const {name, value} = e.target;

        // To let the user input another email
        if (isLocked && errorMessage.includes("deactivated")) {
            setIsLocked(false);
        }

        setLoginInput((prev)=>({
            ...prev,
            [name]: value,
        }))
    };

    // Functions
    const submitLoginForm = async (e) => {
        e.preventDefault();
        if (isLocked) return;
        
        try {
            const data = await loginService(loginInput);
            updateUserInfo(data.user);
            if (data.user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/lobby');
            }
        }
        catch (err) {
            setErrorMessage(err.message);
            
            if (err.message.includes("Locked:")) {
                setIsLocked(true);

                const secondsMatch = err.message.match(/\d+/);
                if (secondsMatch) {
                    setLoggedOutTime(parseInt(secondsMatch[0]));
                }
            } else {
                setIsLocked(false);
                setLoggedOutTime(null);

                if (err.message.includes("not found")) {
                    setLoginAttempt(0);
                } else {
                    setLoginAttempt((prev) => prev + 1);
                }
            }
        }
    };

    return {
        loginInput,
        errorMessage,
        loginAttempt,
        isLocked,
        loggedOutTime,
        handleChangingInput,
        submitLoginForm
    };
};

export default useLogin;