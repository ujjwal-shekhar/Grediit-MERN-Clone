import { useState } from 'react';
import { Container, Box } from '@material-ui/core';

import { Space } from 'antd';

import SearchBar from '../Subgreddiits/All_SG_Components/SearchBar';
import SGTags from '../Subgreddiits/All_SG_Components/AllSGTags';
import SortFilterDropdown from '../Subgreddiits/All_SG_Components/SortFilterDropdown'

import Mod_SG_List from '../Subgreddiits/All_SG_Components/Mod_SG_List';
import Member_SG_List from '../Subgreddiits/All_SG_Components/Member_SG_List';
import NonMember_SG_List from '../Subgreddiits/All_SG_Components/NonMember_SG_List';
import BannedMember_SG_List from '../Subgreddiits/All_SG_Components/BannedMember_SG_List';

export default function AllSubgreddiits({ user }) {
    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [sortFilter, setSortFilter] = useState([]);
    console.log(sortFilter);
    // SortFilter will be like {pos:pos, val:val}
    return (
        <>
        <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>Greddiit</h1>
        <Box className='mt-2' sx={{width:'100%'}}>
            <Space direction='vertical'>
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>   
                <Space size={'large'}>
                <SGTags tags={tags} setTags={setTags}/>
                <SortFilterDropdown sortFilter={sortFilter} setSortFilter={setSortFilter}/>
                <button onClick={() => console.log(sortFilter)}>Check</button>
                </Space>
            </Space>
        </Box>
      </div>
        <Container>
            <Mod_SG_List user={user} tags={tags} searchValue={searchValue} sortFilter={sortFilter}/>
            <Member_SG_List user={user} tags={tags} searchValue={searchValue} sortFilter={sortFilter}/>
            <NonMember_SG_List user={user} tags={tags} searchValue={searchValue} sortFilter={sortFilter}/>
            <BannedMember_SG_List user={user} tags={tags} searchValue={searchValue} sortFilter={sortFilter}/>
        </Container>
        </>
    );
}