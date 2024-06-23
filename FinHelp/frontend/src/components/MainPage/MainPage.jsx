import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftDrawer from '../ProfilePage/LeftDrawer';
import SearchBar from '../MainPage/SearchBar';
import Right from '../MainPage/RightBar';
import { Stack, Select } from "@chakra-ui/react";

const customStyles = {
  backgroundColor: "#13161F", // Change background color to #13161F
  borderRadius: "9999px", // Full border radius
};

const MainPage = () => {
  const [stockData, setStockData] = useState({
    stockName: 'Loading...',
    livePrice: 'Loading...',
    dayHigh: 'Loading...',
    dayLow: 'Loading...',
    closingPrice: 'Loading...'
  });

  const [exchange, setExchange] = useState(''); // State variable for selected exchange

  const fetchData = async () => {
    try {
      const savedSymbol = localStorage.getItem('searchedStockName');
      const response = await axios.get(`http://localhost:3000/api/v1/user/stock/${savedSymbol}`);

      const { stockName, livePrice, dayHigh, dayLow } = response.data;

      setStockData({
        stockName,
        livePrice,
        dayHigh,
        dayLow,
        closingPrice: '500' // Update closing price based on actual data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        fetchData(); // Fetch data on Enter key press
        reloadChart(); // Reload chart on Enter key press
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  useEffect(() => {
    // Reload chart whenever the exchange changes
    console.log(`Exchange state in useEffect: ${exchange}`); // Debugging log
    if (exchange) {
      reloadChart();
    }
  }, [exchange]);

  const displayPrice = stockData.livePrice === 'NA' ? stockData.closingPrice : stockData.livePrice;

  const reloadChart = () => {
    console.log(`Reloading chart with exchange: ${exchange}`);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${exchange}:${localStorage.getItem('searchedStockName')}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    document.getElementById("tradingview-widget-container").innerHTML = '';
    document.getElementById("tradingview-widget-container").appendChild(script);
  };

  // Function to handle change in exchange selection
  const handleExchangeChange = (event) => {
    const selectedExchange = event.target.value;
    console.log(`Exchange selected: ${selectedExchange}`); // Debugging log
    setExchange(selectedExchange);
    // Immediately log the state value to check if it updates
    setTimeout(() => {
      console.log(`Exchange state after setExchange: ${exchange}`); // Debugging log
    }, 0);
  };

  return (
    <div className='min-h-screen bg-[#13161F] flex'>
      <div className='w-[15%]'>
        <LeftDrawer />
      </div>
      <div className='w-[70%] flex flex-col'>
        <div className="mt-7 flex justify-end size-30  mr-[20%]">
          <Stack spacing={3} width="100%" maxWidth="600px">
            <Select
              placeholder="Choose Stock Exchange"
              size="lg"
              color="white"
              borderRadius="full"
              style={customStyles}
              value={exchange} // Value from state
              onChange={handleExchangeChange} // Handle change event
            >
              <option value="NSE" style={{ backgroundColor: "#13161F", color: "white" }}>
                NSE
              </option>
              <option value="NYSE" style={{ backgroundColor: "#13161F", color: "white" }}>
                NYSE
              </option>
              <option value="NASDAQ" style={{ backgroundColor: "#13161F", color: "white" }}>
                NASDAQ
              </option>
              <option value="DJI" style={{ backgroundColor: "#13161F", color: "white" }}>
                DJI
              </option>
            </Select>
          </Stack>
        </div>

        <div className='h-[7%] w-full mt-4'>
          <SearchBar />
        </div>

        <div className='h-[35%] w-full flex items-center'>
          <div className='flex flex-col h-full w-1/3'>
            <div className='flex items-center w-full h-1/2'>
              <div className='w-[75%] h-[75%] border border-gray-300 rounded-lg ml-10 flex flex-col items-center'>
                <div className='my-6'>
                  <b className='text-white text-4xl'>Stock Name</b>
                </div>
                <div>
                  <span className='text-white text-4xl'>{stockData.stockName}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center w-full h-1/2'>
              <div className='w-[75%] h-[75%] border border-gray-300 rounded-lg ml-10 flex flex-col items-center'>
                <div className='my-6'>
                  <b className='text-white text-4xl'>CMP</b>
                </div>
                <div>
                  <span className='text-white text-4xl'>{displayPrice}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center h-full w-1/3'>
            <div className='flex flex-col mx-20 h-1/2 w-1/2 border border-gray-300 rounded-lg'>
              <div className='flex items-center h-1/2 w-full'>
                <div className='text-white ml-5 text-xl'>
                  Day High : {stockData.dayHigh}
                </div>
              </div>
              <div className='flex items-center h-1/2 w-full'>
                <div className='text-white ml-5 text-xl'>
                  Day Low : {stockData.dayLow}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center h-full w-1/3'>
            <div className='flex items-center border border-gray-300 rounded-lg my-10 w-1/2 h-1/4'>
              <button className='text-white text-2xl ml-2'>Add to watchlist</button>
            </div>
            <div className='flex items-center border border-gray-300 rounded-lg w-1/2 h-1/4 my-10'>
              <button className='text-white text-2xl ml-9'>Financials</button>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center border border-gray-300 rounded-lg' style={{ flexGrow: 1, minHeight: '200px' }}>
          <div id="tradingview-widget-container" className='flex items-center w-full h-[55%]' />
          <div className='flex w-full flex-grow '>
            <div className='flex flex-col w-[30%] h-full '>
              <div className='flex items-center w-full h-1/4 border border-gray-300 rounded-lg'>
                <button className='text-white text-2xl ml-[30%]'>DAILY</button>
              </div>
              <div className='flex items-center w-full h-1/4 border border-gray-300 rounded-lg'>
                <button className='text-white text-2xl ml-[30%]'>WEEKLY</button>
              </div>
              <div className='flex items-center w-full h-1/4 border border-gray-300 rounded-lg'>
                <button className='text-white text-2xl ml-[30%]'>MONTHLY</button>
              </div>
              <div className='flex items-center w-full h-1/4 border border-gray-300 rounded-lg'>
                <button className='text-white text-2xl ml-[30%]'>YEARLY</button>
              </div>
            </div>
            <div className='flex flex-col border border-gray-300 rounded-lg w-[70%]'>
              <div className='flex items-center  w-full h-1/4'>
                <span className='text-white text-2xl ml-[40%]'>AI PREDICTION</span>
              </div>
              <div className='flex items-center border border-gray-300 rounded-lg w-full h-3/4'>
                <p className='text-white text-3xl ml-[40%]'>Uptrend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[15%]'>
        <Right />
      </div>
    </div>
  );
};

export default MainPage;
