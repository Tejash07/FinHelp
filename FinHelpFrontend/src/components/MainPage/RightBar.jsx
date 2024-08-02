import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { SlCalculator } from "react-icons/sl"; 
import { FcFaq } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import FinHelp_transparent from '../LandingPage/FinHelp_transparent.png';

function Right() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    height: '100%',
    padding: '5px 30px', 
    position: 'relative',
    width: '100px', 
    marginRight: '20px', 
  };

  const iconContainerStyles = {
    fontSize: '24px', 
    marginTop: '60px', 
    borderRadius: '4px', 
    padding: '10px', 
    backgroundColor: '#13161F', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white', 
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.6)', 
  };

  return (
    <div className='bg-[#13161F] cursor-pointer ml-36 mt-16 size-10 border rounded-md' style={containerStyles}>
      <div className=' -mt-12 py-5'>
        <div className='-my-1 py-4'>
          <div className='size-[115%] '  style={iconContainerStyles}>
            <img src={FinHelp_transparent} alt='Logo' />
          </div>
          <Link to='/home/main'style={iconContainerStyles}>
            <RxHamburgerMenu />
          </Link>
          <Link to='/home/calculator' style={iconContainerStyles}>
            <SlCalculator />
          </Link>
          <Link to='/home/faq' style={iconContainerStyles}>
            <FcFaq />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Right;
