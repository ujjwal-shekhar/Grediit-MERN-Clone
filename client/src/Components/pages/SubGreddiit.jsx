import PostCard from "../Posts/PostCard";
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline, Tab, Tabs, Grid } from '@mui/material';
import LinkTab from '@mui/material/Link';
import { useParams } from 'react-router-dom';
import Item from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import SubGreddiitModerationTabs from '../Subgreddiits/My_SG_Components/SGModerationTabs';
import Loading from './Loading.jsx';

import Modal from '@mui/material/Modal';

import axios from "axios";
import SGUsers from "../Subgreddiits/SG_Page_Components/SG_Users";
import SG_Joining_Requests from "../Subgreddiits/My_SG_Components/SG_Joining_Requests";
import SubgreddiitPosts from "../Subgreddiits/SG_Page_Components/SubgreddiitPosts";
import CreatePostForm from "../Subgreddiits/SG_Page_Components/SubgreddiitAddPost";

import { Button } from "antd";

export default function SubGreddiit() {
  const [value, setValue] = React.useState('one');

  const subgreddiitName = useParams().subgreddiitName;
  const [subgreddiit, setSubgreddiit] = React.useState({});
  const [perms, setPerms] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  React.useEffect(() => {
    // navigate(`/subgreddiits/${subgreddiitName}/posts`);
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
        console.log("sg data : ", res.data.subgreddiit);
        setSubgreddiit(res.data.subgreddiit);
        setPerms(res.data.isModerator);
        if (res.data.isModerator) {
          console.log()
          navigate(`/subgreddiits/${subgreddiitName}/mod/users`);
          setValue('two');
        } else {
          navigate(`/subgreddiits/${subgreddiitName}/posts`);
          setValue('one');
        }
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

  const handleCreatePostButton = () => {
    console.log('Create Posts')
    console.log(subgreddiitName + ' ' + subgreddiit._id)
    handleOpen();
  }

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
    <>
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>Greddiit</h1>
        {/* <h4 className='mb-3'>Not Reddit</h4> */}
        <Button onClick={handleCreatePostButton} variant="contained" color="primary" size="large">
            Create Post
        </Button>
      </div>
        
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
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box>
              <CreatePostForm SG_ID={subgreddiit._id}/>
            </Box>
        </Modal>
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
                <SubgreddiitPosts subgreddiitName={subgreddiitName} />
              }
              {
                (pathname == `/subgreddiits/${subgreddiitName}/mod/users`) &&
                <SGUsers subgreddiitName={subgreddiitName}/>
              }
              {
                (pathname == `/subgreddiits/${subgreddiitName}/mod/joining-requests`) &&
                <SG_Joining_Requests subgreddiitName={subgreddiitName}/>
              }
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}