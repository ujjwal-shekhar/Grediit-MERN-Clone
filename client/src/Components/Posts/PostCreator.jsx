import React from 'react';

import axios from 'axios';

const PostCreator = ({ postCreator, subgreddiitName }) => {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    React.useEffect(() => {
        console.log('Post Creator Mounted');
        axios.post(
            `http://localhost:8080/subgreddiits/SG/${postCreator}/check_blocked`,
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
                console.log('Post Creator Data: ', res.data.username);
                // setUsername(res.data.username);
                if (res.data.)
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