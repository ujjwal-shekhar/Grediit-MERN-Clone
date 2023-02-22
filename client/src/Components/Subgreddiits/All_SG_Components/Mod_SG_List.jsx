import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';
import { Space } from 'antd';

import Loading from '../../pages/Loading.jsx';
import MiniSubgreddiitCard from '../../Subgreddiits/SG_Page_Components/MiniSubgreddiitCard.jsx'

import { MDBRow } from 'mdb-react-ui-kit';

import axios from 'axios';

export default function Mod_SG_List({ user, tags }) {
    const [loading, setLoading] = useState(true);
    const [modSG, setModSG] = useState([]);
    useEffect(() => {
        console.log("Mod_sg mounted");
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
                console.log("response received as : ", response.data);
                
                setModSG(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    if (loading) {
        return <Loading />
    }

    console.log("tags : ", tags);

    return (
        <Container>
            <Box className='mt-2' sx={{width:'100%'}}>
                <Space direction='vertical'>
                    <MDBRow className='row-cols-1 row-cols-md-3 g-100 mt-1'>
                    {
                        modSG.map((sg) => {
                            return (
                                <MiniSubgreddiitCard 
                                key={sg._id}
                                subgreddiit={sg} 
                                tags={tags}
                                perms={"MOD_ALL"}/>
                            )
                        })
                    }
                    </MDBRow>
                </Space>
            </Box>
        </Container>
    );
}