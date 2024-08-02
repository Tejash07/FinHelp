import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeftDrawer from "../ProfilePage/LeftDrawer";
import Right from "./Right";
import Footer from "./Footer";
import Photo from "./Photo.png";

const Home = () => {
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
    <div className="flex flex-col bg-[#13161F]">
      <img src={Photo} alt="Photo" className="mr-[5%] " />

      <div className="flex flex-row">
        <div className="-mt-[53.3%] size-1">
          <LeftDrawer />
        </div>
        <div className="flex-grow flex items-center justify-center -ml-[15%] -mt-[70%]">
          <div className="text-#13161F p-4">
            <h1 className="text-[190%] font-extrabold">
              Worried about where to invest and how much capital you need?
            </h1>
            <h2 className="text-[150%] font-semibold mt-1">
              At FinHelp, we're here to ease your concerns and guide you through your financial journey.<br />
              Our platform offers a range of tools and resources to help you make informed decisions.
            </h2>
            <ul className="text-[120%]  mt-6 list-disc font-semibold list-inside">
              <h1  className="text-2xl text-#3E0762 ">Some of Our Features:</h1>
              <li>FinCalci: Calculate potential returns on your investments and assess various financial scenarios.</li> 
              <li>Live Stock Price Actions: Stay updated with real-time stock prices and market trends.</li>
              <li>Detailed Charts: Analyze stock performance with comprehensive charts and visualizations.</li>
              <li>Community Support: Join our vibrant community of investors and share experiences, tips, and advice.</li>
            </ul>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-10">
          <Right />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
