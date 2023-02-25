import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { Space } from 'antd';

import Loading from '../../pages/Loading.jsx';
import MiniSubgreddiitCard from '../../Subgreddiits/SG_Page_Components/MiniSubgreddiitCard.jsx'

import { MDBRow } from 'mdb-react-ui-kit';

import axios from 'axios';

export default function Member_SG_List({ user, tags, searchValue }) {
    const [loading, setLoading] = useState(true);
    const [memberSG, setMemberSG] = useState([]);
    useEffect(() => {
        console.log("AllSg");
        axios.get(
            "http://localhost:8080/users/" + user.username + "/banned_members",
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
                                perms={"LEFT"}/>
                            )
                        })
                    }
                    </MDBRow>
                </Space>
            </Box>
        </Container>
    );
}