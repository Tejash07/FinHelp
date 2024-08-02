import React, { useState } from 'react';
import { Button, Stack, Input, Text, Link, useToast,Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useTypewriter,Cursor} from 'react-simple-typewriter'
import FinHelp_transparent from './FinHelp_transparent.png'
const Landing = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

 
  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      toast({
        title: "All fields are necessary",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('https://finhelpbackend.onrender.com/api/v1/user/register', {
        Email: email,
        Username: username,
        Password: password,
        ConfirmPassword: confirmPassword,
      });

      if (response.data.success) {
        toast({
          title: "User registered successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        }
        
      } else {
        toast({
          title: response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="bg-[#13161F] text-white min-h-screen flex justify-between">
      <div style={{ width: "50%" }}>
        <div>
        <img src={FinHelp_transparent} alt="Logo" className='size-[90%] mt-[15%] ml-[17%] p-3' />
        </div>
        
        <div className='ml-[43%] -mt-[30%] text-3xl  font-semibold  underline text-[yellow]'>
          You Can Trust Us!!
        </div>
      </div>
      <div className='ml-[9%]'>
      <Divider color="" orientation='vertical'/>
      </div>
      <div className="flex flex-col ml-32" style={{ width: "50%", color: 'white' }}>
        <div className='mt-56' style={{ width: "65%" }}>
          <Input
            borderRadius="full"
            mb={4}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="whiteAlpha.900"
            placeholderTextColor="gray.300"
          />
          <Input
            borderRadius="full"
            mb={4}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            color="whiteAlpha.900"
            placeholderTextColor="gray.300"
          />
          <Input
            borderRadius="full"
            mb={4}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="whiteAlpha.900"
            placeholderTextColor="gray.300"
          />
          <Input
            borderRadius="full"
            mb={4}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            color="whiteAlpha.900"
            placeholderTextColor="gray.300"
          />
          <div className='ml-[40%] mt-5'> 

          <Stack direction="row" spacing={4}  align="center">
            <Button style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} onClick={handleSignUp} borderRadius="full"   variant="ghost">
              Sign Up
            </Button>
          </Stack>
          </div>
          <Text className='mt-5'>
            Already have an account{': '}
            <Link color='blue.500' href='/login'>
              Login
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Landing;
