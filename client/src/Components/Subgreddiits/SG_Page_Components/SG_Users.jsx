import axios from 'axios';
import React from 'react';
// import MiniProfileCard from '../Dashboard/Profile/MiniProfileCard';
import MiniSGUserCard from './MiniSGUserCard';
import Loading from '../../pages/Loading.jsx';

import Divider from '@mui/material/Divider';

// import axios from 'axios';

export default function SGUsers({ subgreddiitName }) {
    const [loading, setLoading] = React.useState(true);
    const [common_members, setCommonMembers] = React.useState([]);
    const [banned_members, setBannedMembers] = React.useState([]);
    const [moderators, setModerators] = React.useState([]);
    React.useEffect(() => {
        axios.get(
            `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/members_list`,
            {
                headers: {
                    'Content-Type': 'application/json', 
                }
            }
        )
            .then((response) => {
                setCommonMembers(response.data.common_members);
                setBannedMembers(response.data.banned_members);
                setModerators(response.data.mods);
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
            <Divider>Members</Divider>
            {common_members.map((member, index) => {
                return <MiniSGUserCard key={index} userID={member} mode={"SG_USER"}/>
            })}
            {moderators.map((member, index) => {
            console.log(member);
                return <MiniSGUserCard key={index} userID={member} />
            })}
            <Divider>Banned Members</Divider>
            {banned_members.map((member, index) => {
                return <MiniSGUserCard key={index} userID={member} />
            })}
        </React.Fragment>
    )
}