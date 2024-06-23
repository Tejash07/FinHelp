import express from "express";
import { Register } from "../controllers/RegisterController.js";
import { Login, logout } from "../controllers/LoginController.js";
import { faq } from "../controllers/FaqController.js";
import yfinance from 'yfinance';
import isAuthenticated from "../utils/auth.js";
import { exec } from "child_process";


const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
//think later for /calculator
router.route("/faq").post(isAuthenticated, faq);
router.route("/logout").get(isAuthenticated, logout);

router.get("/stock/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    // Execute the Python script to fetch stock data
    exec(`python -c "import yfinance as yf; ticker = yf.Ticker('${symbol}'); data = ticker.history(period='1d'); print(data.to_json())"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);

        // Handle specific error messages from yfinance
        if (stderr.includes("No data found")) {
          return res.status(404).json({ message: "Stock data not found" });
        } else if (stderr.includes("symbol may be delisted")) {
          return res.status(404).json({ message: "Stock symbol may be delisted or invalid" });
        } else {
          return res.status(500).json({ message: "Internal server error" });
        }
      }

      // Parse the output from Python script and extract necessary data
      const data = JSON.parse(stdout);
      

      const closePrices = data['Close'];
      const timestamps = Object.keys(closePrices);
      const latestTimestamp = timestamps[timestamps.length - 1];
      const livePrice = parseFloat(closePrices[latestTimestamp]).toFixed(2);

      const stockData = {
        stockName: symbol,
        livePrice: livePrice,
        dayHigh: data['High'] ? parseFloat(Math.max(...Object.values(data['High']))).toFixed(2) : 'N/A',
        dayLow: data['Low'] ? parseFloat(Math.min(...Object.values(data['Low']))).toFixed(2) : 'N/A'
      };

      
      res.json(stockData);
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/stock/:symbol/:timeframe", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const timeframe = req.params.timeframe;

    // Execute the Python script to fetch stock data for the specified timeframe
    exec(`python -c "import yfinance as yf; ticker = yf.Ticker('${symbol}'); data = ticker.history(period='${timeframe}'); print(data.to_json())"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);

        // Handle specific error messages from yfinance
        if (stderr.includes("No data found")) {
          return res.status(404).json({ message: "Stock data not found" });
        } else if (stderr.includes("symbol may be delisted")) {
          return res.status(404).json({ message: "Stock symbol may be delisted or invalid" });
        } else {
          return res.status(500).json({ message: "Internal server error" });
        }
      }

      // Parse the output from Python script and extract necessary data
      const data = JSON.parse(stdout);
      const closePrices = data['Close'];
      const timestamps = Object.keys(closePrices);
      const latestTimestamp = timestamps[timestamps.length - 1];
      const earliestTimestamp = timestamps[0];
      const livePrice = parseFloat(closePrices[latestTimestamp]).toFixed(2);
      const startPrice = parseFloat(closePrices[earliestTimestamp]).toFixed(2);

      const stockData = {
        stockName: symbol,
        livePrice: livePrice,
        startPrice: startPrice,
        dayHigh: data['High'] ? parseFloat(Math.max(...Object.values(data['High']))).toFixed(2) : 'N/A',
        dayLow: data['Low'] ? parseFloat(Math.min(...Object.values(data['Low']))).toFixed(2) : 'N/A'
      };

      res.json(stockData);
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
