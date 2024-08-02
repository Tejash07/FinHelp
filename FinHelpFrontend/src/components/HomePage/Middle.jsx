import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement, Stack, Button } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionInputGroup = motion(InputGroup); 

const Middle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate('/home/main', { state: { searchTerm } }); 
    }
  };

  const customStyles = {
    paddingRight: '10rem', 
    width: 'calc(100% + 7rem)', 
    marginLeft: '-5%', 
    marginTop: '-80%' 
  };

  const buttonContainerStyles = {
    position: 'absolute',
    bottom: '500px', 
    left: '45%', 
    transform: 'translateX(-50%)', 
    zIndex: 10, 
    width: '100%', 
    textAlign: 'center' 
  };

  const imageContainerStyles = {
    position: 'absolute',
    bottom: '120px', 
    left: '43%', 
    transform: 'translateX(-50%)', 
    zIndex: 5, 
    width: '100%', 
    textAlign: 'center' 
  };

  
  const buttonStyles = {
    width: '170px', 
    fontSize: '20px', 
    padding: '0px 24px', 
    paddingLeft: '40px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative'
  };

  return (
    <div className='ml-80 px-60' style={{ backgroundColor: '#13161F', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '10vh', position: 'relative' }}>
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

     
      <div style={buttonContainerStyles}>
        <Stack direction="row" spacing={145} justifyContent="center">
          <Button  colorScheme="blue" variant="solid" rounded="full" style={{ ...buttonStyles, backgroundColor: '#3182CE' }}>
            <img className='-ml-3' src="fifty.png" alt="Fifty" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
            Nifty 50
          </Button>
          <Button colorScheme="green" variant="solid" rounded="full" style={{ ...buttonStyles, backgroundColor: '#38A169' }}>
            <img className='-ml-4' src="https://s3-symbol-logo.tradingview.com/indices/bse-sensex--600.png" alt="Sensex" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
            Sensex
          </Button>
          <Button colorScheme="purple" variant="solid" rounded="full" style={{ ...buttonStyles, backgroundColor: '#805AD5' }}>
            <img className='-ml-5' src="https://s3-symbol-logo.tradingview.com/sector/financial--600.png" alt="Bank Nifty" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
            Bank Nifty
          </Button>
        </Stack>
      </div>

      
      <div style={imageContainerStyles}>
        <img className=' size-88' src="Screenshot 2024-06-13 232456.png" alt="Screenshot" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

export default Middle;
