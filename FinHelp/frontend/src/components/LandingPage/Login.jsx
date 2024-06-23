import React, { useState } from 'react';
import { Button, Stack, Input, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        Username: username,
        Password: password,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('Username', username);
        

        navigate('/home'); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Invalid credentials');
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
          {error && <Text color="red.500">{error}</Text>}
          <Stack direction="row" spacing={4} align="center">
            <Button onClick={handleLogin} borderRadius="full" bg='white' color='gray.900' variant="ghost">
              Log In
            </Button>
          </Stack>
          <Text>
            Don't have an account{': '}
            <Link color='teal.500' href='/'>
              Sign Up
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
