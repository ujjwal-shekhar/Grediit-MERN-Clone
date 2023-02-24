import React from "react";
import { Card, Button, Space } from "antd";
import axios from "axios";

import SavedPostCard from "../Posts/SavedPostCard";
import Loading from "../pages/Loading";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// import { Space } from "antd";

const App = ({ user }) => {
    const [loading, setLoading] = React.useState(false);
    const [savedPosts, setSavedPosts] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        axios.get(
            `http://localhost:8080/users/${user.username}/saved_posts`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response);
                setSavedPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        setLoading(false);
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <React.Fragment>
            <div className='p-5 text-center bg-light'>
                <h1 className='mb-3'>Saved Posts</h1>
            </div>
            <CssBaseline />
            <Container maxWidth="md">
                <Space direction="vertical" >
                {
                    savedPosts.map(post => {
                        return (
                            <SavedPostCard 
                            key={post._id}
                            post={post} />
                        )
                    })
                }
                </Space>
            </Container>
        </React.Fragment>
    )
}

export default App;