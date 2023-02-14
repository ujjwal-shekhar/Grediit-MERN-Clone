import * as React from 'react';

import MiniSubgreddiitCard from '../Subgreddiits/MiniSubgreddiitCard.jsx'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function UserSubgreddiits() {
    const subgreddiit = {
        name: 'test',
        description: 'LOREM IPSUM DOLOR SIT AMET',
        moderators: ['test'],
        banned_keywords: ['test1', 'test2', 'test3'],
        posts : ['test1', 'test2', 'test3'],
        common_members: ['test1', 'test2', 'test3'],
    }
    const handleAddSG = () => {
        console.log("Add SG")
    }



    // <React.Fragment>
    // <CssBaseline />
    // <Container maxWidth="lg">
    //     <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
    // <Box sx={{ width: '100%', marginBottom:'5px' }}>
    // </Box>
    // <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
    //     <LinkTab label="Posts" href="/" />
    //     <LinkTab label="Moderation" href="/mod" />
    // </Tabs>
    //     </Box>
    // </Container>
    // </React.Fragment>
    return (
        <div>
        <Stack>
            <Item>
                <MiniSubgreddiitCard subgreddiit={subgreddiit} perms={"MOD"}/>
            </Item>
            <Item>
                <MiniSubgreddiitCard subgreddiit={subgreddiit} perms={"MOD"}/>
            </Item>
        </Stack>
        <IconButton onClick={handleAddSG} sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            // color: 'white',
            // backgroundColor: 'primary',
        }}>
            <AddCircleOutlineIcon fontSize='large' color='primary'/>
        </IconButton>
        {/* <MiniSubgreddiitCard />
        <MiniSubgreddiitCard /> */}
        </div>
    )
}