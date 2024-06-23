import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement, Stack, Button } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const MotionInputGroup = motion(InputGroup); // Wrap InputGroup with motion

const Middle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Access navigate function from React Router

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate('/home/main', { state: { searchTerm } }); // Route to "/main" page with search term
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
    bottom: '500px', // Adjust this value to move the buttons up or down
    left: '45%', // Center the buttons horizontally
    transform: 'translateX(-50%)', // Center the buttons horizontally
    zIndex: 10, // Ensure buttons are above other content if necessary
    width: '100%', // Ensure buttons span the full width of the container
    textAlign: 'center' // Center-align buttons within the container
  };

  const imageContainerStyles = {
    position: 'absolute',
    bottom: '120px', // Adjust this value to move the image up or down
    left: '43%', // Center the image horizontally
    transform: 'translateX(-50%)', // Center the image horizontally
    zIndex: 5, // Ensure image is below buttons
    width: '100%', // Ensure image spans the full width of the container
    textAlign: 'center' // Center-align image within the container
  };

  // Customizable button widths and sizes
  const buttonStyles = {
    width: '170px', // Width for the buttons
    fontSize: '20px', // Font size for the buttons
    padding: '0px 24px', // Padding for the buttons
    paddingLeft: '40px', // Adjust text padding to move it right
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
            onKeyPress={handleKeyPress} // Handle enter key press
          />
        </MotionInputGroup>
      </Stack>

      {/* Button container */}
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

      {/* Image container */}
      <div style={imageContainerStyles}>
        <img className=' size-88' src="Screenshot 2024-06-13 232456.png" alt="Screenshot" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

export default Middle;
