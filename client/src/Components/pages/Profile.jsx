import { Grid, Container, Box } from '@material-ui/core';
import * as React from 'react';

import Button from '@mui/material/Button'

import ProfileCard from '../Dashboard/Profile/ProfileCard.jsx';
import Loading from '../pages/Loading.jsx';

import { useParams } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Followers from './Followers.jsx';
import Following from './Following.jsx';

import jwt_decode from 'jwt-decode';

import axios from 'axios' 

const Profile = ({ user, perms }) => {
    const { username } = useParams();
    if (username) {
        if (((jwt_decode(localStorage.getItem("token")))._doc).username === username) {
            user = ((jwt_decode(localStorage.getItem("token")))._doc);
            perms = "AUTH";
        }
    } else if (((jwt_decode(localStorage.getItem("token")))._doc).username === user.username) {
        user = ((jwt_decode(localStorage.getItem("token")))._doc);
        perms = "AUTH";
    }
    const [foundUser, setFoundUser] = React.useState(null);

    if (foundUser) console.log("here2");
    if ((perms != "AUTH") && (!foundUser)) {
        console.log("here");
        axios({
            url: "http://localhost:8080/users/" + username,
            method: "GET",
        })
        .then((response) => {
            setFoundUser(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    if (perms !== "AUTH" && !foundUser) {
        return (
            <Loading />
        );
    }


    console.log("after setting ", foundUser);
    return (
        <>
        <Grid>
            {
                perms === "AUTH" ?
                <ProfileCard user={user} perms={"AUTH"}/>
                :
                <ProfileCard user={foundUser} perms={"VIEW"}/>
            }
        </Grid>
        </>
    );
} 
export default Profile;