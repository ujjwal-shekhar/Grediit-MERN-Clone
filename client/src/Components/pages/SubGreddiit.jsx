import PostCard from "../Posts/PostCard";
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline, Tab, Tabs, Grid } from '@mui/material';
import LinkTab from '@mui/material/Link';
import { useParams } from 'react-router-dom';
import Item from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import SubGreddiitModerationTabs from '../Subgreddiits/SGModerationTabs';

export default function SubGreddiit() {
  const [value, setValue] = React.useState('one');

  const subgreddiitName = useParams().subgreddiitName;

  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(`/subgreddiits/${subgreddiitName}/posts`);
  }, [])

  console.log(subgreddiitName);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 'one') {
      navigate(`/subgreddiits/${subgreddiitName}/posts`);
    } else {
      navigate(`/subgreddiits/${subgreddiitName}/mod`);
    }
  };

  const handlePosts = () => {
    console.log("Posts");
  }

  const handleMod = () => {
    console.log("Mod");
  }

  return (
    // <PostCard />
    <React.Fragment>
      <CssBaseline />
          <Box sx={{ bgcolor:'white', width: '100%', marginBottom: '5px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered>
              <Tab label="Posts" onClick={handlePosts} value='one'/>
              <Tab label="Moderation" onClick={handleMod} value='two'/>
            </Tabs>
          </Box>
      <Grid container spacing={2}>
      <Grid item xs={4} sm={4} md={4}>
        <Item>
        
      {
        (value == 'two') && 
        <SubGreddiitModerationTabs subgreddiitName={subgreddiitName}/>
      }
      </Item>
      </Grid>
      <Grid item >

      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
          
        </Box>
      </Container>
      </Grid>
      </Grid>
    </React.Fragment>
  )
}