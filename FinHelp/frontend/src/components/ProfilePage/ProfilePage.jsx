import React from 'react';
import LeftDrawer from './LeftDrawer.jsx';
import Middle from './Middle.jsx';
import Right from './RightBarProf.jsx';
const ProfilePage = () => {
  return (
    <div className='min-h-screen bg-[#13161F] flex'>
      
      <div className='w-[20%]'>
        <LeftDrawer />
      </div>
      
      <div className='w-[50%] mx-20 '>
        <Middle />
      </div>
      <div>
        <Right></Right>
      </div>
    </div>
  );
}

export default ProfilePage;
