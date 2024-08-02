import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
const Middle = () => {
  const [cashFlowData, setCashFlowData] = useState([]);
  const [balanceSheetData, setBalanceSheetData] = useState([]);

  useEffect(() => {
    const fetchCashFlowData = async () => {
      try {
        const symbol = localStorage.getItem("searchedStockName");

        
        const cashFlowResponse = await axios.get(
          `https://finhelpbackend.onrender.com/api/v1/user/stockdata/${symbol}/cashflow`
        );
        if (cashFlowResponse.data) {
          setCashFlowData(cashFlowResponse.data);
        } else {
          console.error("Invalid cash flow data:", cashFlowResponse.data);
          setCashFlowData([]);
        }
      } catch (error) {
        console.error("Error fetching cash flow data:", error);
        setCashFlowData([]);
      }
    };

    const fetchBalanceSheetData = async () => {
      try {
        const symbol = localStorage.getItem("searchedStockName");

       
        const balanceSheetResponse = await axios.get(
          `https://finhelpbackend.onrender.com/api/v1/user/stockdata/${symbol}/balancesheet`
        );
        if (balanceSheetResponse.data) {
          setBalanceSheetData(balanceSheetResponse.data);
        } else {
          console.error(
            "Invalid balance sheet data:",
            balanceSheetResponse.data
          );
          setBalanceSheetData([]);
        }
      } catch (error) {
        console.error("Error fetching balance sheet data:", error);
        setBalanceSheetData([]);
      }
    };

    fetchCashFlowData();
    fetchBalanceSheetData();
  }, []);

  return (
    <div className=" h-full mt-5 flex flex-col">
      <Box
        style={{
          boxShadow:
            "1px -2px 2px #161D34, 3px 3px 15px #161D34, 3px 1px 1px #161D34, -3px 2px 3px #161D34",
        }}
        className=" border-2 border-[#2e354b] mt-5 w-full bg-[#1B2030]  rounded-tl-2xl rounded-br-2xl h-[10%] flex items-center"
      >
        <span className="text-white  ml-[42%] font-semibold text-3xl">
          FINANCIALS
        </span>
      </Box>
      <Box
        style={{
          boxShadow:
            "1px -2px 2px #16105A, 3px 3px 15px #16105A, 3px 1px 1px #16105A, -3px 2px 3px #16105A",
        }}
        className="border-2 border-[#2e354b] rounded-tr-2xl rounded-bl-2xl w-full mt-4 h-[10%] flex items-center"
      >
        <span className="text-white text-3xl font-extrabold underline -mt-1 ml-[45%]">
          {localStorage.getItem("searchedStockName")}
        </span>
      </Box>
      <Box
        style={{
          boxShadow:
            "2px -3px 7px #0f131f, 4px 4px 19px #0f131f, 4px 2px 4px #0f131f, -4px 3px 5px #0f131f",
        }}
        className="mt-16 border-2 border-[#121b37] rounded-3xl p-7 flex flex-col"
      >
        <div className="text-white ml-[40%] text-3xl font-semibold ">
          Cashflow Table
        </div>

        <div className="  mt-7 h-full w-full text-white overflow-auto">
          
          {cashFlowData && cashFlowData.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-[#13161F]">
                  <th>Date</th>
                  <th>Free Cash Flow</th>
                  <th>Repurchase Of Capital Stock</th>
                  <th>Repayment Of Debt</th>
                  <th>Issuance Of Debt</th>
                  <th>Capital Expenditure</th>
                </tr>
              </thead>
              <tbody>
                {cashFlowData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.date}</td>
                    <td>{data.freeCashFlow}</td>
                    <td>{data.repurchaseOfCapitalStock}</td>
                    <td>{data.repaymentOfDebt}</td>
                    <td>{data.issuanceOfDebt}</td>
                    <td>{data.capitalExpenditure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-4">No cash flow data available</div>
          )}
        </div>
      </Box>
      <Box
        style={{
          boxShadow:
            "2px -3px 7px #0f131f, 4px 4px 19px #0f131f, 4px 2px 4px #0f131f, -4px 3px 5px #0f131f",
        }}
        className="mt-16 border-2 border-[#121b37] rounded-3xl p-7 flex flex-col"
      >
        <div className="text-white ml-[44%] text-3xl font-semibold ">
          Balance Sheet
        </div>

      <div className="mt-7 h-full w-full text-white overflow-auto">
        
        {balanceSheetData && balanceSheetData.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Treasury Shares Number</th>
                <th>Ordinary Shares Number</th>
                <th>Net Debt</th>
                <th>Total Capitalization</th>
              </tr>
            </thead>
            <tbody>
              {balanceSheetData.map((data, index) => (
                <tr key={index}>
                  <td>{data.date}</td>
                  <td>{data.treasurySharesNumber}</td>
                  <td>{data.ordinarySharesNumber}</td>
                  <td>{data.netDebt}</td>
                  <td>{data.totalCapitalization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-4">
            No balance sheet data available
          </div>
        )}
      </div>
      </Box>
    </div>
  );
};

export default Middle;
