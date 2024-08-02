import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
import { MdMenu } from 'react-icons/md'; 

function LeftDrawerFunc() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = async () => {
        try {
            await axios.get("https://finhelpbackend.onrender.com/api/v1/user/logout");
            localStorage.clear("token")
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div>
            <div className='bg-[#13161F]'>
                <Button className='mx-7 my-5 font-bold' colorScheme='blue' onClick={onOpen} leftIcon={<MdMenu />}>
                </Button>
                <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent style={{ backgroundColor: '#13161F' }}>
                        <Box display='flex' alignItems='center' borderBottomWidth='1px'>
                            <DrawerHeader className='text-[#4ea7c7] font-bold' mx='auto'>MENU</DrawerHeader>
                        </Box>
                        <DrawerBody>
                            <div className='my-16 mx-7'>
                                <Link
                                    to='/home/profile'
                                    className='text-white py-4 px-20 rounded-full border border-white mb-4 block shadow-md'
                                    style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to='/home'
                                    className='text-white py-4 mt-12 px-20 rounded-full border border-white mb-4 block shadow-md'
                                    style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }}
                                >
                                    Home
                                </Link>
                                <Link
                                    to='/login'
                                    onClick={handleLogout}
                                    className='text-white py-4 mt-12 px-20 rounded-full border border-white block shadow-md'
                                    style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }}
                                >
                                    Logout
                                </Link>
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
