import React from 'react'
import { useState } from 'react'

const Signup = () => {
    const [] = useState({
        username: '',
        email : '',

    })
    
  return (
    <div>
        <form>
            <div>
                <label>Username:</label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
            <div>
                <label></label>
                <input />
            </div>
        </form>
    </div>
  )
}

export default Signup