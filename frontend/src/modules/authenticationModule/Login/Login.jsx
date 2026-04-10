import React from 'react';
import { useState } from 'react';

const Login = () => {
    // Defining state variables
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })
    // Manually handing input state change
    const inputOnChange = (e) => {
        const {value, name} = e.target;
        setUserInput((prev)=>({
            ...prev,
            [name]: value,
        }))
    }
    const submitLogInForm = async () => {
        try {
            const res = await fetch('https://localhost:3000', {
                method: 'GET', 
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(userInput),
            })
            const data = await res.json();
            // redirect user 
        }
        catch (err) {

        }
    }
    return (
        <div>
            <form onSubmit={submitLogInForm}>
                <div>
                    <label for='email'>Email:</label>
                    <input type='email' name='email' required onChange={inputOnChange} value={userInput.email} />
                </div>
                 <div>
                    <label for='password'>Password:</label>
                    <input type='password' name='password' required onChange={inputOnChange} value={userInput.password} />
                </div>
                <button>Login</button>
            </form>
            <p>Don't have an account? Sign up here!</p>
        </div>
    )
}

export default Login