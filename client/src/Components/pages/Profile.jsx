import { Grid, Container, Box } from '@material-ui/core';
import * as React from 'react';

import Button from '@mui/material/Button'

import ProfileCard from '../Dashboard/Profile/ProfileCard.jsx';

import { Routes, Route, Navigate } from 'react-router-dom';
import Followers from './Followers.jsx';
import Following from './Following.jsx';

const Profile = () => {
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        image: 'https://via.placeholder.com/150',
        bio: 'I am a software developer and enjoy working on projects that make a positive impact.',
        phone: '+1234567890',
        location: 'New York City'
      };
      
    //   console.log("Rendered ProfileCard");
    return (
        <>

        <Grid>
            <ProfileCard user={user}/>
        </Grid>
        
        {/* <Routes>
            <Route path="followers" element={<Followers user={user}/>}/>
            <Route path="following" element={<Following user={user}/>}/>
        </Routes> */}
        </>
    );
} 
export default Profile;