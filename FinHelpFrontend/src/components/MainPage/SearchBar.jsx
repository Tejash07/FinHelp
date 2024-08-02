import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const MotionInputGroup = motion(InputGroup); 

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        
        localStorage.setItem('searchedStockName', searchTerm); 
        
        navigate('/home/main');
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    }
  };
  const customStyles = {
    paddingRight: '10rem', 
    width: 'calc(100% + 7rem)', 
    marginLeft: '-5%', 
    marginTop: '-12%' 
  };

  return (
    <div className='ml-40 px-20 my-4' style={{ backgroundColor: '#13161F', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10vh' }}>
      <Stack spacing={3} width="100%" maxWidth="600px">
        <MotionInputGroup
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          animate={{ scale: isExpanded ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={handleSearchClick}
          style={customStyles} 
        >
          <InputLeftElement pointerEvents="none">
            <FaSearch color="white" className='ml-2 mt-2' />
          </InputLeftElement>
          <Input
            placeholder="Search"
            size="lg"
            color="white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress} 
          />
        </MotionInputGroup>
      </Stack>
    </div>
  );
}

export default SearchBar;
