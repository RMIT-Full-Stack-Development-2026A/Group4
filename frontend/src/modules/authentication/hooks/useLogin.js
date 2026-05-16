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
    const [loggedOutTime, setLoggedOutTime] = useState(60);
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
        if (isLocked && loggedOutTime > 0) {
            timer = setInterval(() => {
                setLoggedOutTime((prev) => prev - 1);
            }, 1000);
        }
        if (loggedOutTime === 0) {
            setIsLocked(false);
            setLoginAttempt(0);
            setLoggedOutTime(60); 
            setErrorMessage('');
        }
        return () => {clearInterval(timer)};
    }, [isLocked, loggedOutTime]);

    // Handling changing input
    const handleChangingInput = (e) => {
      const {name, value} = e.target;
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
            navigate('/lobby');
        }
        catch (err) {
            // Check if the user is already locked
            if (err.message.includes("Locked:")) {
                const secondsMatch = err.message.match(/\d+/);
                if (secondsMatch) {
                    const seconds = parseInt(secondsMatch[0]);
                    setLoggedOutTime(seconds);
                    setIsLocked(true);
                    setErrorMessage(''); 
                }
            } 
            // If it's a normal error (Invalid credentials, etc.)
            else {
                setErrorMessage(err.message);
                setLoginAttempt(prev => prev + 1);
                setIsLocked(false);
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