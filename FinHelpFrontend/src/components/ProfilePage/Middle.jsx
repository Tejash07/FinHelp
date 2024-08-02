import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Link,
  chakra,
  Image,
  Button,
  Input,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
const Middle = () => {
  const [userData, setUserData] = useState({
    username: "Username",
    onlineStatus: "Online",
    joinDate: "Join date",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUsername = localStorage.getItem("Username");

      setUserData({
        ...userData,
        username: storedUsername || "Username",
        onlineStatus: "Online",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChangeUsername = async (event) => {
    event.preventDefault();
    const newUsername = event.target.elements.newUsername.value;
    const password = event.target.elements.password.value;
    try {
      const response = await axios.post(
        "https://finhelpbackend.onrender.com/api/v1/user/changeusername",
        {
          Username: localStorage.getItem("Username"),
          NewUsername: newUsername,
          Password: password,
        }
      );
      if (response.data.success) {
        setUserData({
          ...userData,
          username: newUsername,
        });
        localStorage.setItem("Username", newUsername);
      } else {
        console.error("Failed to update username:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const oldPassword = event.target.elements.oldPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    try {
      const response = await axios.post(
        "https://finhelpbackend.onrender.com/api/v1/user/changepassword",
        {
          Username: localStorage.getItem("Username"),
          NewPass: newPassword,
          CurrPass: oldPassword,
        }
      );
      if (response.data.success) {
        console.log("Password updated successfully");
      } else {
        console.error("Failed to update password:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const responsiveFontSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <div className="">
      <div className="bg-gray-900 text-gray-100 w-[75%] mt-6 ml-[13%] rounded-2xl flex flex-col items-center py-8">
        <Flex
          bg="#111827"
          _dark={{
            bg: "#3e3e3e",
          }}
          p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            w="xs"
            bg="#FFEA00"
            _dark={{
              bg: "gray.800",
            }}
            boxShadow="0px 4px 6px #2D5A8C, 0px -4px 6px #2D5A8C, 4px 0px 6px #2D5A8C, -4px 3px 6px #2D5A8C"
            rounded="lg"
            overflow="hidden"
            mx="auto"
          >
            <Box
              w="full"
              h={56}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="#111827"
              _dark={{
                bg: "gray.700",
              }}
            >
              <FaUserCircle size=" 200" />
            </Box>

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color="gray.800"
                _dark={{
                  color: "white",
                }}
                fontWeight="bold"
              >
                {userData.username}
              </Link>
              <chakra.span
                fontSize="sm"
                color="gray.700"
                _dark={{
                  color: "gray.200",
                }}
              >
                {userData.onlineStatus}
              </chakra.span>
            </Box>
          </Box>
        </Flex>
      </div>
      <div className="bg-[#13192e] w-full max-w-4xl mt-7 h-auto sm:h-96 shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 rounded-3xl">
        <Box
          className="bg-[#5ca8ff] w-full sm:w-1/3 h-auto sm:h-60 my-4 sm:my-0 rounded-tl-3xl rounded-br-3xl shadow-lg flex flex-col p-4"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            boxShadow:
              "4px 4px 6px #000000, 0px 9px 13px #000000, 4px 0px 6px #000000, -4px 3px 6px #000000",
          }}
        >
          <div className="border w-full sm:w-full mx-auto rounded-md border-black border-2 flex justify-center items-center mb-4">
            <div className="font-bold" style={{ fontSize: responsiveFontSize }}>Change Username</div>
          </div>
          <form
            onSubmit={handleChangeUsername}
            className="flex flex-col items-center"
          >
            <Input
              name="newUsername"
              placeholder="New Name"
              className="mt-4 h-10 text-white rounded-full border-2 px-2 w-full"
              style={{
                background: "linear-gradient(to left, #43cea2, #185a9d)",
              }}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="mt-4 h-10 text-[#ffff] rounded-full border-2 px-2 w-full"
              style={{
                background: "linear-gradient(to left, #43cea2, #185a9d)",
              }}
            />
            <Button type="submit" className="mt-5 underline w-24">
              Change
            </Button>
          </form>
        </Box>
        <Box
          className="bg-[#5ca8ff] w-full sm:w-1/3 h-auto sm:h-60 my-4 sm:my-0 rounded-tr-3xl rounded-bl-3xl shadow-lg flex flex-col p-4"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            boxShadow:
              "4px 4px 6px #000000, 0px 9px 13px #000000, 4px 0px 6px #000000, -4px 3px 6px #000000",
          }}
        >
          <div className="border w-full sm:w-full mx-auto rounded-md border-black border-2 flex justify-center items-center mb-4">
            <div className="font-bold" style={{ fontSize: responsiveFontSize }}>Change Password</div>
          </div>
          <form
            onSubmit={handleChangePassword}
            className="flex flex-col items-center"
          >
            <Input
              name="oldPassword"
              type="password"
              placeholder="Old Password"
              className="mt-4 h-10 text-white rounded-full border-2 px-2 w-full"
              style={{
                background: "linear-gradient(to left, #43cea2, #185a9d)",
              }}
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              className="mt-4 h-10 text-white rounded-full border-2 px-2 w-full"
              style={{
                background: "linear-gradient(to left, #43cea2, #185a9d)",
              }}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-4 h-10 text-white rounded-full border-2 px-2 w-full"
              style={{
                background: "linear-gradient(to left, #43cea2, #185a9d)",
              }}
            />
            <Button type="submit" className="mt-5 underline w-24">
              Change
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Middle;
