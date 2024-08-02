import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LeftDrawer from "../ProfilePage/LeftDrawer";
import Right from "../HomePage/Right";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Select,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionInputGroup = motion(InputGroup); 

const Calculator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  const [isExpanded, setIsExpanded] = useState(false);
  const [stockName, setStockName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [percChange, setPercChange] = useState(null);
  const [stockData, setStockData] = useState(null);

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

 

  useEffect(() => {
    if (stockName && investmentPeriod) {
      fetchData();
    }
  }, [stockName, investmentPeriod]);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      fetchData();
    }
  };

  const handleStockNameChange = (event) => {
    const value = event.target.value;
    setStockName(value);
    localStorage.setItem("savedStockName", value);
  };

  const handleInvestmentAmountChange = (event) => {
    const value = event.target.value;
    setInvestmentAmount(value);
    localStorage.setItem("investmentAmount", value);
  };

  const handleInvestmentPeriodChange = (event) => {
    const value = event.target.value;
    setInvestmentPeriod(value);
    localStorage.setItem("investmentPeriod", value);
  };

  const fetchData = async () => {
    try {
      const savedStockName = localStorage.getItem("savedStockName");
      const investmentPeriod = localStorage.getItem("investmentPeriod");
      const response = await axios.get(
        `https://finhelpbackend.onrender.com/api/v1/user/stock/${savedStockName}/${investmentPeriod}`
      );
      const { stockName, livePrice, startPrice, dayHigh, dayLow } =
        response.data;
      setStockData({ stockName, livePrice, dayHigh, dayLow });

      const initialPrice = parseFloat(startPrice);
      const finalPrice = parseFloat(livePrice);
      const change = finalPrice - initialPrice;
      const percChange = ((change / initialPrice) * 100).toFixed(2); 
      setPercChange(parseFloat(percChange)); 
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const customStyles = {
    backgroundColor: "#13161F", 
    borderRadius: "9999px", 
  };

  if (!isAuthenticated) {
    return null;
     
  }



  return (
    <div className="flex bg-[#13161F] min-h-screen relative">
      <LeftDrawer />
      <div className="flex-1">
        <div className="bg-[#1b2030] text-white flex items-center justify-center ml-40 mr-[20%] mt-5 h-16 shadow-lg rounded-lg text-2xl font-bold ">
          <h1>YOUR FINCALCI</h1>
        </div>
        <div className="mt-10 flex justify-end pr-96 mr-20">
          <Stack spacing={3} width="100%" maxWidth="600px">
            <MotionInputGroup
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              animate={{ scale: isExpanded ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={handleSearchClick}
              style={customStyles}
            >
              <InputLeftElement pointerEvents="none">
                <FaSearch color="white" className="ml-2 mt-2" />
              </InputLeftElement>
              <Input
                placeholder="Enter the stock name"
                size="lg"
                color="white"
                c
                style={customStyles}
                value={stockName}
                onChange={handleStockNameChange}
                onKeyPress={handleKeyPress}
              />
            </MotionInputGroup>
          </Stack>
        </div>
        <div className="mt-7 flex justify-end pr-96 mr-20">
          <Stack spacing={3} width="100%" maxWidth="600px">
            <Input
              placeholder="Enter the amount to invest"
              size="lg"
              color="white"
              backgroundColor="#13161F" 
              borderRadius="full" 
              style={customStyles}
              value={investmentAmount}
              onChange={handleInvestmentAmountChange}
            />
          </Stack>
        </div>
        <div className="mt-7 flex justify-end  pr-96 mr-20 ">
          <Stack spacing={3} width="100%" maxWidth="600px">
            <Select
              placeholder="Enter the period of investment"
              size="lg"
              color="white"
              borderRadius="full"
              style={customStyles}
              value={investmentPeriod}
              onChange={handleInvestmentPeriodChange}
            >
              <option
                value="1mo"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                1 month
              </option>
              <option
                value="3mo"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                3 month
              </option>
              <option
                value="6mo"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                6 month
              </option>
              <option
                value="1y"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                1 year
              </option>
              <option
                value="5y"
                style={{ backgroundColor: "#13161F", color: "white" }}
              >
                5 years
              </option>
            </Select>
          </Stack>
        </div>

        <div className="bg-[#1B2030] w-[71%] size-[45%] mt-[3%] ml-[11%]  rounded-xl flex ">
        <div className="flex flex-col text-white w-52 border border-collapse border-[#2D5A8C]   border-2 rounded-2xl ml-[7%] mt-[4%] h-[77%] p-4">
            <h2 className="text-center font-semibold mb-4">
              {percChange ? `${(percChange - 3).toFixed(2)}%` : "NA"}
            </h2>
            <div  style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="border border-[#e2f10c]    border-collapse rounded-2xl p-2 mb-2 mt-4 flex flex-row items-center">
              <h1  >PnL: </h1>
              <p >
                {percChange
                  ? (
                      ((percChange - 3) / 100) *
                      parseFloat(localStorage.getItem("investmentAmount"))
                    ).toFixed(2)
                  : "NA"}
              </p>
            </div>
            <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="border border-[#e2f10c] border-collapse rounded-2xl p-2 mt-4 flex flex-row items-center">
              <h1>Capital: </h1>
              <p>
                {percChange
                  ? (
                      parseFloat(localStorage.getItem("investmentAmount")) +
                      ((percChange - 3) / 100) *
                        parseFloat(localStorage.getItem("investmentAmount"))
                    ).toFixed(2)
                  : "NA"}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-white w-52 ml-28 border-2 border-[#2D5A8C] border border-collapse rounded-2xl ml-[12%] mt-[4%] h-[77%] p-4">
            <h2 className="text-center font-semibold mb-4">
              {percChange ? `${percChange.toFixed(2)}%` : "NA"}
            </h2>
            <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="border border-[#e2f10c] border-collapse rounded-2xl p-2 mt-4 flex flex-row items-center">
              <h1>PnL: </h1>
              <p>
                {percChange
                  ? (
                      (percChange / 100) *
                      parseFloat(localStorage.getItem("investmentAmount"))
                    ).toFixed(2)
                  : "NA"}
              </p>
            </div>
            <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="border border-[#e2f10c] border-collapse rounded-2xl p-2 mt-4 flex flex-row items-center">
              <h1>Capital: </h1>
              <p>
                {percChange
                  ? (
                      parseFloat(localStorage.getItem("investmentAmount")) +
                      (percChange / 100) *
                        parseFloat(localStorage.getItem("investmentAmount"))
                    ).toFixed(2)
                  : "NA"}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-white w-52 ml-28 border border-2 border-[#2D5A8C] border-collapse rounded-2xl ml-[12%]  mt-[4%] h-[77%] p-4 ">
            <h2 className="text-center font-semibold mb-4">
              {percChange ? `${(percChange + 3).toFixed(2)}%` : "NA"}
            </h2>
            <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="border border-[#e2f10c] border-collapse rounded-2xl p-2 mt-4 flex flex-row items-center">
              <h1>PnL: </h1>
              <p>
                {percChange
                  ? (
                      ((percChange + 3) / 100) *
                      parseFloat(localStorage.getItem("investmentAmount"))
                    ).toFixed(2)
                  : "NA"}
              </p>
            </div>
            <div style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} className="border border-[#e2f10c] border-collapse rounded-2xl p-2 mt-4 flex flex-row items-center">
              <h1>Capital: </h1>
              <p>
                {percChange
                  ? (
                      parseFloat(localStorage.getItem("investmentAmount")) +
                      ((percChange + 3) / 100) *
                        parseFloat(localStorage.getItem("investmentAmount"))
                    ).toFixed(2)
                  : "NA"}
              </p>
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

export default Calculator;
