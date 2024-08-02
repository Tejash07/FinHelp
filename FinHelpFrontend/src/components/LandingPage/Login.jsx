import React, { useState } from 'react';
import { Button, Stack, Input, Text, Link, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import FinHelp_transparent from './FinHelp_transparent.png'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://finhelpbackend.onrender.com/api/v1/user/login', {
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
          <img src={FinHelp_transparent} alt="Logo" className='size-[90%] mt-[15%] ml-[17%] p-3' />
        </div>
        <div className='ml-[43%] -mt-[30%] text-3xl  font-semibold  underline text-[yellow]'>
          You Can Trust Us!!
        </div>
      </div>
      
      <div  className='ml-[9%] '>

      <Divider color="" orientation='vertical'/>
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
          <div className='ml-[40%] mt-5'>

          <Stack direction="row" spacing={4} align="center">
            <Button style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }} onClick={handleLogin} borderRadius="full" bg='white' color='gray.900' variant="ghost">
              Log In
            </Button>
          </Stack>
          </div>
          <Text className='mt-5'>
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
