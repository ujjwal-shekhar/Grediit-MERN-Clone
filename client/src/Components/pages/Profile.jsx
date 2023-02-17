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
    const [loading, setLoading] = React.useState(true);
    const [foundUser, setFoundUser] = React.useState(null);
    const { username } = useParams();

    React.useEffect(() => {
        if (perms !== "AUTH") {
            if (user.username === username) {
                perms = "AUTH";
                setLoading(false);
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
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, []);

    if (loading) {
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
                        <ProfileCard user={user} perms={"AUTH"} />
                        :
                        <ProfileCard user={foundUser} perms={"VIEW"} />
                }
            </Grid>
        </>
    );
}
export default Profile;