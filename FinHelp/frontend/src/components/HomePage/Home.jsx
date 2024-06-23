import React from 'react'
import { Outlet } from 'react-router-dom';
import LeftDrawer from '../ProfilePage/LeftDrawer'
import Middle from './Middle'
import Right from './Right'
const Home = () => {
  return (
    <div className=' flex bg-[#13161F]'>
      <LeftDrawer/>
      <Middle/>
      <Right/>
      
    </div>
  )
}

export default Home
