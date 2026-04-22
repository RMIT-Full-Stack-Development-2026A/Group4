// Importing dependencies:
import React from 'react'
// React router dom:
import { RouterProvider } from 'react-router-dom'
import router from './route/AppRouter'
// Import user context:

// States: 
import { useState } from 'react'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App