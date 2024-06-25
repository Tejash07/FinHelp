import React from "react";
import { Outlet } from "react-router-dom";
import LeftDrawer from "../ProfilePage/LeftDrawer";
import Middle from "./Middle";
import Right from "./Right";
import Footer from "./Footer";
const Home = () => {
  return (
    <div className=" flex flex-col bg-[#13161F]">
      <div className="flex flex-row">
        <LeftDrawer />
        <Middle />
        <Right />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
