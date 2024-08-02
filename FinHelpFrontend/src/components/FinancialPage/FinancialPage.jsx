import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeftDrawer from '../ProfilePage/LeftDrawer.jsx';
import Middle from '../FinancialPage/Middle.jsx';
import Right from '../ProfilePage/RightBarProf.jsx';
const FinancialPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post('https://finhelpbackend.onrender.com/api/v1/user/authcheck' , {
          token: localStorage.getItem("token"),
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          navigate('/login');
        }
      } catch (error) {

        console.log("catch block" , error);
        
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null; 
  }
  return (
    <div className='min-h-screen bg-[#13161F] flex'>
      
      <div className='w-[20%]'>
        <LeftDrawer />
      </div>
      
      <div className='w-[50%] mx-20 '>
        <Middle />
      </div>
      <div className='absolute top-0 right-0 mt-10'>
        <Right></Right>
      </div>
    </div>
  );
}

export default FinancialPage;
