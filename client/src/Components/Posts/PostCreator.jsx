import React from 'react';

import axios from 'axios';

const PostCreator = ({ postCreator, subgreddiitName }) => {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [blocked, setBlocked] = React.useState(false);
    React.useEffect(() => {
        console.log('Post Creator Mounted');
        axios.post(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/check_blocked`,
            JSON.stringify({
                toCheck: postCreator
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then(res => {
                console.log('Post Creator Data: ', res.data.user.username);
                setUsername(res.data.user.username);
                setBlocked(res.data.isBlocked);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [])

    if (blocked) {
        return (
            <p>Blocked User</p>
        )
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <p>{username}</p>
    )
}

export default PostCreator;