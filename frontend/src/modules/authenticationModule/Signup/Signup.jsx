import React from 'react'
import { useState } from 'react';

const Signup = () => {
    // State: 
    const [ input, setInput ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
    })
    // Sign up:
    const signup = async () => {
        try {
            // Take input: 
            const res = await fetch('', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(input)
            });
            const data = await res.json();
        }
        catch (err) {
            console.error(err);
        }
    }
    // Handle input change:
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev)=>({
            ...prev,
            [name]: value,
        }))
    }
    // Return jsx:
    return (
        <div>
            <form onSubmit={signup}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input name='username' type='text' required onChange={handleInputChange} value={input.username} />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input name='email' type='email' required onChange={handleInputChange} value={input.email} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input name='password' type='password' required onChange={handleInputChange} value={input.password} />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input name='confirmPassword' type='password' required onChange={handleInputChange} value={input.confirmPassword} />
                </div>
                <div>
                    <label htmlFor='country'>Country:</label>
                    <select name='country' value={input.country}>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup