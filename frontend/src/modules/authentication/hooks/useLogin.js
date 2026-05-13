import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserContext';
import { loginService } from '../service/authService';

const useLogin = () => {
    // Auth Context
    const { updateUserInfo } = useAuth();
    
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

    // Countdown timer
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

    // Log in attempts
    const handleLoginAttempts = () => {
      setLoginAttempt((prev)=>{
        const nextAttempt = prev + 1;
        if (nextAttempt > 5) {
          setIsLocked(true);
        }
        return nextAttempt;
      })
    };

    // Functions
    const submitLoginForm = async (e) => {
      e.preventDefault(); // Prevent form reload
      if (isLocked) return; // Ensure log in attempts are still valid
      
      try {
        const data = await loginService(loginInput);
        
        // putting token into cookie and redirecting user
        updateUserInfo(data.user);
        navigate('/lobby');
      }
      catch (err) {
        console.error(err);
        // Using the error message from the backend or a fallback
        setErrorMessage(err.message || 'Connection error! Unable to log in.');
        handleLoginAttempts();
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