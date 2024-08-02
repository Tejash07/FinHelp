import React from 'react'
import LeftDrawer from '../ProfilePage/LeftDrawer'
import SearchBar from '../MainPage/SearchBar'
import Right from '../FinancialsPage/RightBarFin'
const Financials = () => {
  return (
    <div className='min-h-screen bg-[#13161F] flex '>
        <div className='w-[15%] h-full'>
            <LeftDrawer></LeftDrawer>
        </div>

        <div className='flex flex-col w-[70%]  '>
            <div className='w-full h-[7%]'>
                <SearchBar></SearchBar>
            </div>
            
            <div className='flex items-center  my-5 w-full h-[5%]'>
                <span className='text-white text-2xl ml-[40%]'>PROFIT AND LOSS</span>
            </div>

            <div className='border border-gray-300 w-full h-[40%]'>

            </div>

            <div className='flex items-center  my-5 w-full h-[5%]'>
                <span className='text-white text-2xl ml-[40%]'>BALANCE SHEET</span>
            </div>

            <div className='border border-gray-300 w-full h-[40%]'>

            </div>

        </div>

        <div className='absolute top-0 right-0 mt-10'>
            <Right></Right>
        </div>
    </div>
  )
}

export default Financials