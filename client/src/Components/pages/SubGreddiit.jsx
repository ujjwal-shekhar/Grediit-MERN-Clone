import PostCard from "../Posts/PostCard";
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline, Tab, Tabs, Grid } from '@mui/material';
import LinkTab from '@mui/material/Link';
import { useParams } from 'react-router-dom';
import Item from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import SubGreddiitModerationTabs from '../Subgreddiits/SGModerationTabs';
import Loading from './Loading.jsx';

import axios from "axios";
import SGUsers from "../Subgreddiits/SG_Users";

export default function SubGreddiit() {
  const [value, setValue] = React.useState('one');

  const subgreddiitName = useParams().subgreddiitName;
  const [subgreddiit, setSubgreddiit] = React.useState({});
  const [perms, setPerms] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  React.useEffect(() => {
    navigate(`/subgreddiits/${subgreddiitName}/posts`);
    axios.get(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
    )
      .then((res) => {
        setSubgreddiit(res.data);
        setPerms(res.data.isModerator);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  console.log(subgreddiitName);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 'one') {
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

  if (loading) {
    return <Loading />
  }

  return (
    // <PostCard />
    <React.Fragment>
      <CssBaseline />
      { (perms) && 
        <Box sx={{ bgcolor: 'white', width: '100%', marginBottom: '5px' }}>
          <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" centered>
            <Tab label="Posts" onClick={handlePosts} value='one' />
            <Tab label="Moderation" onClick={handleMod} value='two' />
          </Tabs>
        </Box>
      }
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4} md={4}>
          <Item>

            {
              (value == 'two') && (perms == true) &&
              <SubGreddiitModerationTabs subgreddiitName={subgreddiitName} />
            }
          </Item>
        </Grid>
        <Grid item >

          <Container   className="mt-4">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width: '100%' }} >
              {
                (pathname == `/subgreddiits/${subgreddiitName}/posts`) &&
                <h1>Insert Posts</h1>
              }
              {
                (pathname == `/subgreddiits/${subgreddiitName}/mod/users`) &&
                <SGUsers subgreddiitName={subgreddiitName}/>
                // <h1>Insert Users</h1>
              }
            </Box>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}