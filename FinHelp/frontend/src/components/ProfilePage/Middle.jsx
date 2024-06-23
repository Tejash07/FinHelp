import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Middle = () => {
    const [userData, setUserData] = useState({
        username: 'Username', 
        onlineStatus: 'Online', 
        joinDate: 'Join date',
    });

 
    useEffect(() => {
        fetchUserData();
    }, []);

    // Fetch user data from the backend
    const fetchUserData = async () => {
        try {
            const storedUsername = localStorage.getItem('Username');
    
            
            setUserData({
                ...userData,
                username: storedUsername || 'Username', 
                onlineStatus: 'Online', 
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    

   
    const handleChangeUsername = async (newUsername, password) => {
        try {
            // Send a PUT request to update the username
            const response = await axios.put('http://localhost:3000/api/v1/user/profile', {
                newUsername,
                password,
            });
            if (response.data.success) {
                // Update the username in the UI
                setUserData({
                    ...userData,
                    username: newUsername,
                });
            } else {
                console.error('Failed to update username:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const handleChangePassword = async (oldPassword, newPassword, confirmPassword) => {
        try {
            // Send a PUT request to update the password
            const response = await axios.put('http://localhost:3000/api/v1/user/password', {
                oldPassword,
                newPassword,
                confirmPassword,
            });
            if (response.data.success) {
                console.log('Password updated successfully');
            } else {
                console.error('Failed to update password:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const handleUploadProfilePicture = async (file) => {
        try {
            // Create form data to send the file
            const formData = new FormData();
            formData.append('profilePicture', file);

            // Send a POST request to upload the profile picture
            const response = await axios.post('http://localhost:3000/api/v1/user/profilePicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                console.log('Profile picture uploaded successfully');
            } else {
                console.error('Failed to upload profile picture:', response.data.message);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };


    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center py-8">
            {/* Profile information */}
            <div className="w-3/4 flex mb-8">
                <div className="w-[100%] py-8 px-4 mx-2 flex flex-col items-center">
                    <div className="w-24 h-24 border border-gray-300 rounded-lg mb-4 flex items-center justify-center">
                        Profile Pic
                    </div>
                    <div className="border border-gray-300 rounded-lg w-full p-2 mb-2 text-center">{userData.username}</div>
                    <div className="border border-gray-300 rounded-lg w-full p-2 mb-2 text-center">{userData.onlineStatus}</div>
                    <div className="border border-gray-300 rounded-lg w-full p-2 text-center">{userData.joinDate}</div>
                </div>
            </div>

            {/* Change username section */}
            <div className="w-3/4 flex justify-evenly">
                <div className="w-1/3 border border-gray-300 rounded-lg p-8 flex flex-col items-center">
                    <div className="border border-gray-300 rounded-lg w-full p-4 text-center mb-4">Change Username</div>
                    <input type='text' placeholder='new name' className='border border-gray-300 rounded-lg text-black w-4/5 p-2 mb-2 my-2' />
                    <input type='password' placeholder='pass' className='border border-gray-300 rounded-lg text-black w-4/5 p-2 mb-2 my-2' />
                    <button onClick={handleChangeUsername} className='border border-gray-300 rounded-lg w-4/5 p-2 my-2'>Change</button>
                </div>

                {/* Change password section */}
                <div className="w-1/3 border border-gray-300 rounded-lg mx-1 p-8 flex flex-col items-center">
                    <div className="border border-gray-300 rounded-lg w-full p-4 text-center mb-4">Change Password</div>
                    <input type='password' placeholder='old pass' className='border border-gray-300 rounded-lg text-black w-4/5 p-2 mb-2 my-2' />
                    <input type='password' placeholder='new pass' className='border border-gray-300 rounded-lg text-black w-4/5 p-2 mb-2 my-2' />
                    <input type='password' placeholder='confirm' className='border border-gray-300 rounded-lg text-black w-4/5 p-2 mb-2 my-2' />
                    <button onClick={handleChangePassword} className='border border-gray-300 rounded-lg w-4/5 p-2'>Change</button>
                </div>

                {/* Profile picture section */}
                <div className="w-1/3 border border-gray-300 rounded-lg p-8 flex flex-col items-center">
                    <div className="border border-gray-300 rounded-lg w-full p-4 text-center mb-4">Profile Picture</div>
                    <input type='file' onChange={(e) => handleFileChange(e.target.files[0])} className='border border-gray-300 rounded-lg w-4/5 p-2 mb-2 my-2' />
                    <button onClick={handleUploadProfilePicture} className='border border-gray-300 rounded-lg w-4/5 p-2 my-2'>Upload</button>
                </div>

            </div>
        </div>
    );
};

export default Middle;
