import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { Space } from 'antd';

import Loading from '../../pages/Loading.jsx';
import MiniSubgreddiitCard from '../../Subgreddiits/SG_Page_Components/MiniSubgreddiitCard.jsx'

import { MDBRow } from 'mdb-react-ui-kit';

import axios from 'axios';


const itemComp = (a, b, type) => {
    if (type === 'AscendingName') {
        return a.name.localeCompare(b.name);
    }
    else if (type === 'DescendingName') {
        return b.name.localeCompare(a.name);
    }
    else if (type === 'Followers') {
        return b.common_members.length - a.common_members.length;
    }
    else if (type === 'CreationDate') {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
    else {
        return 0;
    }
}

export default function Member_SG_List({ user, tags, searchValue, sortFilter }) {
    const [loading, setLoading] = useState(true);
    const [memberSG, setMemberSG] = useState([]);
    useEffect(() => {
        console.log("AllSg");
        axios.get(
            "http://localhost:8080/users/" + user.username + "/common_members",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                setMemberSG(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    if (sortFilter.length === 1) {
        console.log("Sorting by modSG")
        memberSG.sort(
            sortFilter
            .map((item) => {
                return (a, b) => itemComp(a, b, item);
            }
        )[0]);
    } else if (sortFilter.length === 2) {
        memberSG.sort(
            sortFilter
            .map((item) => {
                return (a, b) => itemComp(a, b, item);
            })[0])
            .sort(
                sortFilter
                .map((item) => {
                    return (a, b) => itemComp(a, b, item);
                })[1]
            );
    } else if (sortFilter.length === 3) {
        memberSG.sort(
            sortFilter
            .map((item) => {
                return (a, b) => itemComp(a, b, item);
            })[0])
            .sort(
                sortFilter
                .map((item) => {
                    return (a, b) => itemComp(a, b, item);
                })[1])
                .sort(
                    sortFilter
                    .map((item) => {
                        return (a, b) => itemComp(a, b, item);
                    })[2]
                )
    }

    if (loading) {
        return <Loading />
    }

    return (
        <Container>
            <Box className='mt-2' sx={{width:'100%'}}>
                <Space direction='vertical'>
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4 mt-1'>
                    {
                        memberSG.map((sg) => {
                            return (
                                <MiniSubgreddiitCard 
                                key={sg._id}
                                searchValue={searchValue}
                                tags={tags}
                                subgreddiit={sg} 
                                perms={"MEMBER"}/>
                            )
                        })
                    }
                    </MDBRow>
                </Space>
            </Box>
        </Container>
    );
}