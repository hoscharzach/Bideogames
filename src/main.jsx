import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route

} from 'react-router-dom'
import RandomStuff from './pages/RandomStuff'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RandomStuff />
  },
  // {
  //   path: '/randomstuff',
  //   element: <RandomStuff />
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AuthContextProvider>

)
