import React from 'react'
import ProfilePage from './components/ProfilePage/ProfilePage.jsx'
import MainPage from './components/MainPage/MainPage.jsx'
import FaqPage from './components/FaqPage/FaqPage.jsx'

import Home from './components/HomePage/Home.jsx'
import Calculator from './components/CalculatorPage/Calculator.jsx'
import Landing from './components/LandingPage/Landing.jsx'
import Login from './components/LandingPage/Login.jsx'
import FinancialPage from './components/FinancialPage/FinancialPage.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Landing/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/home",
            element:<Home/>,
        },
        {
            path:"/home/profile",
            element:<ProfilePage/>
        },
        {
            path:"/home/main",
            element:<MainPage/>
        },
        {
            path:"/home/faq",
            element:<FaqPage/>
        },
        
        {
            path:"/home/calculator",
            element:<Calculator/>
        },
        {
            path:"/home/financial",
            element:<FinancialPage/>
        }

        
    ])
  return (
    
    <RouterProvider router={appRouter}>
        <div></div>
    </RouterProvider>
  )
}

export default Body