import { useEffect, useState } from 'react';
import { Container, Box } from '@material-ui/core';

import { Space } from 'antd';

import SearchBar from '../Subgreddiits/All_SG_Components/SearchBar';
import SGTags from '../Subgreddiits/All_SG_Components/AllSGTags';

import Mod_SG_List from '../Subgreddiits/All_SG_Components/Mod_SG_List';
import Member_SG_List from '../Subgreddiits/All_SG_Components/Member_SG_List';
import NonMember_SG_List from '../Subgreddiits/All_SG_Components/NonMember_SG_List';
import BannedMember_SG_List from '../Subgreddiits/All_SG_Components/BannedMember_SG_List';

import Divider from '@mui/material/Divider';

export default function AllSubgreddiits({ user }) {
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    return (
        <>
        <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>Greddiit</h1>
        {/* <h4 className='mb-3'>Not Reddit</h4> */}
        <Box className='mt-2' sx={{width:'100%'}}>
            <Space direction='vertical'>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>   
                <SGTags tags={tags} setTags={setTags}/>
            </Space>
        </Box>
        {/* <a className='btn btn-primary' href='' role='button'>
          Call to action
        </a> */}
      </div>
        <Container>
            <Mod_SG_List user={user} tags={tags} searchValue={searchValue}/>
            <Divider />
            <Member_SG_List user={user} tags={tags} searchValue={searchValue}/>
            <Divider />
            <NonMember_SG_List user={user} tags={tags} searchValue={searchValue}/>
            <Divider />
            <BannedMember_SG_List user={user} tags={tags} searchValue={searchValue}/>
        </Container>
        </>
    );
}