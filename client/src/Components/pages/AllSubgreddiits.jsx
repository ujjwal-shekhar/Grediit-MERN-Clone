import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';

import { Space } from 'antd';

import SearchBar from '../Subgreddiits/All_SG_Components/SearchBar';
import SGTags from '../Subgreddiits/All_SG_Components/AllSGTags';

import Mod_SG_List from '../Subgreddiits/All_SG_Components/Mod_SG_List';
import Member_SG_List from '../Subgreddiits/All_SG_Components/Member_SG_List';
import NonMember_SG_List from '../Subgreddiits/All_SG_Components/NonMember_SG_List';

export default function AllSubgreddiits({ user }) {
    return (
        <Container>
            <Box className='mt-2' sx={{width:'100%'}}>
                <Space direction='vertical'>
                    <SGTags />
                    <SearchBar />
                </Space>
            </Box>
    
            <Mod_SG_List user={user}/>
            <Member_SG_List user={user}/>
            <NonMember_SG_List user={user}/>
        </Container>
    );
}