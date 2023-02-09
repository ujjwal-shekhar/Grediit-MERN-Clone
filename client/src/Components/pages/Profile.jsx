import { Grid, Container, Box } from '@material-ui/core';
import * as React from 'react';

import Button from '@mui/material/Button'

import ProfileCard from '../Dashboard/Profile/ProfileCard.jsx';

import { Routes, Route, Navigate } from 'react-router-dom';
import Followers from './Followers.jsx';
import Following from './Following.jsx';

const Profile = ({ user }) => {
    console.log(user);
    return (
        <>
        <Grid>
            <ProfileCard user={user}/>
        </Grid>
        </>
    );
} 
export default Profile;