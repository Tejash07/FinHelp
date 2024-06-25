import React from "react";
import { Outlet } from "react-router-dom";
import LeftDrawer from "../ProfilePage/LeftDrawer";
import Middle from "./Middle";
import Right from "./Right";
import Footer from "./Footer";
import Photo from "./Photo.png"; // Ensure the path is correct

const Home = () => {
  return (
    <div className=" flex flex-col bg-[#13161F]">
      <img src={Photo} alt="Photo" className="mr-[5%]  opacity-65" />
      <div className="flex flex-row">
        <div className="-mt-[53.3%]  size-1 ">
        <LeftDrawer />

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
