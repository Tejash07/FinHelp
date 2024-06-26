import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Box, Link, chakra, Image, Button } from "@chakra-ui/react";

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
      const response = await axios.put(
        "http://localhost:3000/api/v1/user/profile",
        {
          newUsername,
          password,
        }
      );
      if (response.data.success) {
        setUserData({
          ...userData,
          username: newUsername,
        });
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
      const response = await axios.put(
        "http://localhost:3000/api/v1/user/password",
        {
          oldPassword,
          newPassword,
          confirmPassword,
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

  const handleFileChange = (file) => {
    handleUploadProfilePicture(file);
  };

  const handleUploadProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/profilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        console.log("Profile picture uploaded successfully");
      } else {
        console.error(
          "Failed to upload profile picture:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-gray-900 text-gray-100 w-[75%] mt-6 ml-[13%]  rounded-2xl flex flex-col items-center py-8">
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
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="avatar"
            />

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
      <div style={{boxShadow:
              "0px 4px 2px #000000, 0px 9px 13px #000000, 4px 0px 6px #000000, -4px 3px 6px #000000"}} className="bg-[#13192e] w-[130%] mt-7 h-96 -ml-[15%] shadow-2xl flex flex-row items-center rounded-3xl justify-evenly">
        <Box
          className="bg-[#5ca8ff] w-1/4 h-60 rounded-tl-3xl rounded-br-3xl shadow-lg flex flex-col"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
            boxShadow:
              "4px 4px 6px #000000, 0px 9px 13px #000000, 4px 0px 6px #000000, -4px 3px 6px #000000",
          }}
        >
          <div className="ml-[25%] mt-7 border w-44 rounded-md border-black border-2  justify-center items-center">
            <div className="ml-6 font-bold text-md">Change Username</div>
          </div>
          <div>
            <input
              placeholder="New Name"
              className="mt-4 ml-8 h-10 text-white rounded-full  border-2 px-2 "
              style={{ background: 'linear-gradient(to left, #43cea2, #185a9d)' }}
            ></input>
          </div>
          <div>
            <input
            
              placeholder="Password"
              className="mt-4 ml-8 h-10 text-[#ffff] rounded-full border-2  px-2 "
              style={{ background: 'linear-gradient(to left, #43cea2, #185a9d)' }}
            ></input>
          </div>
          <Button className="mt-5 underline w-24 ml-[32%]  ">Change</Button>
        </Box>
        <Box
          className="bg-[#5ca8ff] w-1/4 h-60 rounded-tr-3xl rounded-bl-3xl shadow-lg flex flex-col"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
            boxShadow:
              "4px 4px 6px #000000, 0px 9px 13px #000000, 4px 0px 6px #000000, -4px 3px 6px #000000",
          }}
        >
          <div className="ml-[25%] mt-7  ml-10 w-44 rounded-md border-black border-2 justify-center items-center">
            <div className="ml-6 font-bold text-md">Change Password</div>
          </div>
          <div>
            <input
              placeholder="Old Password"
              className="mt-4 ml-8 h-10 text-white rounded-full border-2 bg-black px-2 "
              style={{ background: 'linear-gradient(to left, #43cea2, #185a9d)' }}
            ></input>
          </div>
          <div>
            <input
              placeholder="New Password"
              className="mt-4 ml-8 h-10 text-white rounded-full border-2 bg-black px-2 "
              style={{ background: 'linear-gradient(to left, #43cea2, #185a9d)' }}
            ></input>
          </div>
          <Button className="mt-5 underline w-24 ml-[32%]  ">Change</Button>
        </Box>
        <Box
          className="bg-[#5ca8ff] w-1/4 h-60 rounded-tl-3xl rounded-br-3xl shadow-lg flex flex-col"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
            boxShadow:
              "4px 4px 6px #000000, 0px 9px 13px #000000, 4px 0px 6px #000000, -4px 3px 6px #000000",
          }}
        >
          <div className="ml-[25%] mt-7  ml-10 w-44 rounded-md  border-black border-2 justify-center items-center">
            <div className="ml-9 font-bold text-md">Change Photo</div>
          </div>
          <div>
            <input
              placeholder="Choose File"
              className="mt-10 ml-8 h-10 text-white rounded-full border-2 bg-black px-2 "
              style={{ background: 'linear-gradient(to left, #43cea2, #185a9d)' }}
              
            ></input>
          </div>
          
          <Button className="mt-9 underline w-24 ml-[32%]  ">Upload</Button>
        </Box>
      </div>
    </div>
  );
};

export default Middle;
