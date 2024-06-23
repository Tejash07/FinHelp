import React from 'react';
import { Link } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
    Box,
    useDisclosure
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md'; // Importing the Menu icon from React Icons

function LeftDrawerFunc() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <div className='bg-[#13161F]'>
                {/* Using IconButton with the Menu icon */}
                <Button className='mx-5 my-5' colorScheme='blue' onClick={onOpen} leftIcon={<MdMenu />}>
                    {/* No text inside the button */}
                </Button>
                <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent style={{ backgroundColor: '#13161F' }}>
                        <Box display='flex' alignItems='center' borderBottomWidth='1px'>
                            <DrawerHeader className='text-green-800' mx='auto'>MENU</DrawerHeader>
                        </Box>
                        <DrawerBody>
                            <div className='mb-10 my-4 mx-7'>
                                <Link to='/home/profile' className='bg-blue-500 text-white py-4 px-20 rounded'>Profile</Link>
                            </div>
                            <div className='mb-10 mx-7'>
                                <Link to='/home' className='bg-blue-500 text-white py-4 px-20 rounded'>Home</Link>
                            </div>
                            <div className='mx-7'>
                                <Link to='/home' className='bg-blue-500 text-white py-4 px-20 rounded'>Logout</Link>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
}

const LeftDrawer = () => {
    return (
        <div>
            <LeftDrawerFunc />
        </div>
    );
}

export default LeftDrawer;
