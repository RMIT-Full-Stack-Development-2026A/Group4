// Importing dependencies:
import React from 'react'

// React router dom:
import { RouterProvider } from 'react-router-dom'
import router from './route/AppRouter'

// App:
const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

// Exporting:
export default App