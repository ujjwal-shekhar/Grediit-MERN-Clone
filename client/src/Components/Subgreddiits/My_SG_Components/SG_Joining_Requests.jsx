import axios from 'axios';
import React from 'react';
// import MiniProfileCard from '../../Dashboard/Profile/MiniProfileCard';
import JoiningRequestsCard from '../../Subgreddiits/My_SG_Components/Joining_Requests_Card';
import Loading from '../../pages/Loading.jsx';

import Divider from '@mui/material/Divider';

// import axios from 'axios';

export default function SGUsers({ subgreddiitName }) {
    const [loading, setLoading] = React.useState(true);
    const [requestedMembers, setRequestedMembers] = React.useState([]);
    React.useEffect(() => {
        axios.get(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/members_list`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                setRequestedMembers(response.data.requested_members);
                console.log("Requested members : ", response.data.requested_members)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []) 

    if (loading) {
        return <Loading />
    }

    return (
        <React.Fragment>
            {
                requestedMembers.map((member, index) => {
                    return <JoiningRequestsCard key={index} 
                    userID={member} subgreddiitName={subgreddiitName}/>
                })
            }
        </React.Fragment>
    )
}