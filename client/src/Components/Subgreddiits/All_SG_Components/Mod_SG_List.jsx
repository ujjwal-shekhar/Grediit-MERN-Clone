import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';

import Loading from '../../pages/Loading.jsx';
import MiniSubgreddiitCard from '../Subgreddiits/SG_Page_Components/MiniSubgreddiitCard.jsx'

import axios from 'axios';

export default function AllSubgreddiits({ user }) {
    const [loading, setLoading] = useState(true);
    const [modSG, setModSG] = useState([]);
    useEffect(() => {
        console.log("AllSg");
        axios.get(
            "http://localhost:8080/users/" + user.username + "/mod_subgreddiits",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                setModSG(response.data.subgreddiits);
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
                    {
                        modSG.map((sg) => {
                            return (
                                <MiniSubgreddiitCard subgreddiit={sg} perms={"MOD_ALL"}/>
                            )
                        })
                    }
                </Space>
            </Box>
        </Container>
    );
}