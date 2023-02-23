import React from "react";
import { Card, Button, Space } from "antd";
import axios from "axios";

import SavedPostCard from "../Posts/SavedPostCard";

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

    const handleDelete = (post) => {
        axios.delete(
            `http://localhost:8080/users/${user.username}/remove_saved_post/${post.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }

    return (
        
    )
}   

export default App;