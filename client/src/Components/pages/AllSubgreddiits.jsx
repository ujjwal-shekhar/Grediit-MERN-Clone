import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';

import { Space } from 'antd';

import SearchBar from '../Subgreddiits/SearchBar';
import SGTags from '../Subgreddiits/AllSGTags' 

import axios from 'axios';

export default function AllSubgreddiits({ user }) {
    const [loading, setLoading] = useState(true);
    // const []
    // useEffect(() => {
    //     console.log("AllSg");
    //     axios.get(
    //         "http://localhost:8080/users/" + user.username + "/mod_subgreddiits",
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
    //             }
    //         }
    //     )
    //         .then((response) => {
                
    //             setLoading(false);
    //         })
    // }, []);

    return (
        <Container>
            <Box className='mt-2' sx={{width:'100%'}}>
                <Space direction='vertical'>
                    <SGTags />
                    <SearchBar />

                </Space>
            </Box>

            
        </Container>
    );
}