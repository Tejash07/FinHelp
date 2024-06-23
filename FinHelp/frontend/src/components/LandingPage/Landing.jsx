import React, { useState } from 'react';
import { Button, Stack, Input, Text, Link, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
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
          <img src="https://www.logodesignlove.com/wp-content/uploads/2012/08/microsoft-logo-02.jpeg" alt="Logo" className='size-72 mt-32 ml-52 p-3' />
        </div>
        <div className='ml-64 size-36 font-bold'>
          TagLine
        </div>
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
          <Stack direction="row" spacing={4} align="center">
            <Button onClick={handleSignUp} borderRadius="full" bg='white' color='gray.900' variant="ghost">
              Sign Up
            </Button>
          </Stack>
          <Text>
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
