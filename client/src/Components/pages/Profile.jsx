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

const Profile = ({ user, setUser, perms }) => {
    const [loading, setLoading] = React.useState(true);
    const [foundUser, setFoundUser] = React.useState(null);
    const { username } = useParams();

    console.log("Inside Profile.jsx: ", user, perms, username);
    const [tempPerms, setTempPerms] = React.useState(perms);

    React.useEffect(() => {
        if (perms !== "AUTH") {
            if (user.username === username) {
                setFoundUser(user);
                setTempPerms("AUTH");
                // console.log("permsimfdismf" + perms);
            }
        }

        if (perms != "AUTH") {
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
        setLoading(false);
    }, []);


    if (loading) {
        return (
            <Loading />
        );
    }

    perms = tempPerms;
    console.log("after setting ", foundUser, perms);
    return (
        <>
            <Grid>
                {
                    perms === "AUTH" ?
                        <ProfileCard user={user} setUser={setUser} perms={"AUTH"} />
                        :
                        <ProfileCard user={foundUser} perms={"VIEW"} />
                }
            </Grid>
        </>
    );
}
export default Profile;