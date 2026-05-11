import React from 'react'
import { Link } from 'react-router-dom'

const SignUpButton = () => {
  return (
    <Link
      to="/signup"
      className="
        inline-block
        px-6 py-3
        bg-white text-red-600
        font-semibold
        rounded-xl
        shadow-lg
        text-center

        hover:bg-red-100
        hover:scale-105
        hover:shadow-xl

        active:scale-95

        transition duration-300
      "
    >
      Get Started 
    </Link>
  )
}

export default SignUpButton