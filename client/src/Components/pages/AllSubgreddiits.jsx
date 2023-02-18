import { useEffect } from 'react';
import { Container, Box } from '@material-ui/core';

import { Space } from 'antd';

import SearchBar from '../Subgreddiits/SearchBar';
import SGTags from '../Subgreddiits/AllSGTags' 

export default function AllSubgreddiits() {
    useEffect(() => {
        console.log("AllSg");
    }, []);

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