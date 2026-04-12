import React from 'react'

const Login = () => {
    // States: 
    const [loginAttempt, setLoginAttempt] = useState(0);
  return (
    <div>
        <form>
            <div></div>
            <div></div>
            <button>Log In</button>
        </form>
        <p>Don't have an account? Sign up here</p>
    </div>
  )
}

export default Login