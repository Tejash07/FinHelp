import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LeftDrawer from "../ProfilePage/LeftDrawer";
import SearchBar from "../MainPage/SearchBar";
import Right from "../MainPage/RightBar";
import { Link as RouterLink } from "react-router-dom";
import {
  Stack,
  Select,
  Flex,
  Box,
  Heading,
  Link,
  Image,
  chakra,
} from "@chakra-ui/react";

const customStyles = {
  backgroundColor: "#13161F", 
  borderRadius: "9999px", 
};

const MainPage = () => {
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
  const [stockData, setStockData] = useState({
    stockName: "Loading...",
    livePrice: "Loading...",
    dayHigh: "Loading...",
    dayLow: "Loading...",
    closingPrice: "Loading...",
  });

  const [exchange, setExchange] = useState(""); 

  const fetchData = async () => {
    try {
      const savedSymbol = localStorage.getItem("searchedStockName");
      const response = await axios.get(
        `https://finhelpbackend.onrender.com/api/v1/user/stock/${savedSymbol}`
      );

      const { stockName, livePrice, dayHigh, dayLow } = response.data;

      setStockData({
        stockName,
        livePrice,
        dayHigh,
        dayLow,
        closingPrice: "500", 
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        fetchData(); 
        reloadChart();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []); 

  useEffect(() => {
   
    console.log(`Exchange state in useEffect: ${exchange}`); 
    if (exchange) {
      reloadChart();
    }
  }, [exchange]);

  const displayPrice =
    stockData.livePrice === "NA" ? stockData.closingPrice : stockData.livePrice;

  const reloadChart = () => {
    console.log(`Reloading chart with exchange: ${exchange}`);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${exchange}:${localStorage.getItem("searchedStockName")}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    document.getElementById("tradingview-widget-container").innerHTML = "";
    document.getElementById("tradingview-widget-container").appendChild(script);
  };

  
  const handleExchangeChange = (event) => {
    const selectedExchange = event.target.value;
    console.log(`Exchange selected: ${selectedExchange}`); 
    setExchange(selectedExchange);
    
    setTimeout(() => {
      console.log(`Exchange state after setExchange: ${exchange}`); 
    }, 0);
  };
  if (!isAuthenticated) {
    return null; 
  }
  return (
    <div className="min-h-screen bg-[#13161F] flex">
      <div className="w-[15%]">
        <LeftDrawer />
      </div>
      <div className="w-[70%] flex flex-col">
        <div className="mt-7 flex justify-end size-30  mr-[20%]">
          <Stack spacing={3} width="100%" maxWidth="600px">
            <Select
              placeholder="Choose Stock Exchange"
              size="lg"
              color="white"
              borderRadius="full"
              style={customStyles}
              value={exchange} 
              onChange={handleExchangeChange} 
            >
              <option
                value="NSE"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                NSE
              </option>
              <option
                value="NYSE"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                NYSE
              </option>
              <option
                value="NASDAQ"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                NASDAQ
              </option>
              <option
                value="DJI"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                DJI
              </option>
            </Select>
          </Stack>
        </div>
        <div className="h-[7%] w-full mt-4">
          <SearchBar />
        </div>
        <div className="bg-[#1B2030] size-96 w-11/12 ml-12 border-2 border-gray-500 rounded-md">
  <div className="bg-[#2d5a8c] size-72 w-11/12 mt-11 ml-11 border-2 rounded-md flex flex-row space-x-4 p-4">
    <div className="flex flex-grow flex-col">
      <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }} className="bg-[#98a3cd] flex-1 item-center border-2 rounded-md">
        <div className=" ml-[43%]  text-2xl font-semibold">Stock : {stockData.stockName}</div>
      </div>
      <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }} className="bg-[#98a3cd] flex-1  border-2 rounded-md mt-3">
        <div className=" ml-[43%]  text-2xl font-semibold">
        CMP : {displayPrice}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }} className="bg-[#98a3cd] flex-1  border-2 rounded-md mt-3">
        <div className="ml-[43%] text-2xl font-semibold">
        Day Low : {stockData.dayLow}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }} className="bg-[#98a3cd] flex-1  border-2 rounded-md mt-3">
        <div className="ml-[43%]  text-2xl font-semibold">
        Day High : {stockData.dayHigh}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }} className="bg-[#98a3cd] flex-1  border-2 rounded-md mt-3  ">
        < RouterLink to='/home/financial' className="ml-[45%]  text-2xl font-semibold">
        View Financials
        </ RouterLink>
      </div>
    </div>
  </div>
</div>

        <div
          className="flex flex-col items-center border border-gray-300 mt-7 rounded-lg"
          style={{ flexGrow: 1, minHeight: "200px" }}
        >
          <div
            id="tradingview-widget-container"
            className="flex items-center w-full h-[55%]"
          />
          <div className="flex w-full flex-grow ">
            <div className="flex flex-col w-[30%] h-full ">
              <div  className="flex items-center w-full h-1/4 border border-gray-300 rounded-xl">
                <button style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="text-white size-9/12 rounded-full border-[#6B7280] mr-[20%] text-2xl ml-[20%]">DAILY</button>
              </div>
              <div  className="flex items-center mt-1 w-full h-1/4 border border-gray-300 rounded-xl">
                <button style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)'}}  className="text-white  size-9/12 rounded-full mr-[20%] text-2xl ml-[20%]">WEEKLY</button>
              </div>
              <div  className="flex items-center mt-1 w-full h-1/4 border border-gray-300 rounded-xl">
                <button style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="text-white size-9/12 rounded-full mr-[20%] text-2xl ml-[20%]">
                  MONTHLY
                </button>
              </div>
              <div  className="flex items-center mt-1 w-full h-1/4 border border-gray-300  rounded-xl">
                <button style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="text-white size-9/12 rounded-full mr-[20%] text-2xl ml-[20%]">YEARLY</button>
              </div>
            </div>
            <div className="flex flex-col border border-gray-300 rounded-lg w-[70%]">
              <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d) ' }} className="flex items-center rounded-xl  w-full h-1/4">
                <span className="text-white text-2xl ml-[40%]">
                  AI PREDICTION
                </span>
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg w-full h-3/4">
                <p className="text-white text-3xl ml-[40%]">Uptrend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-6">
        <Right />
      </div>
    </div>
  );
};

export default MainPage;
