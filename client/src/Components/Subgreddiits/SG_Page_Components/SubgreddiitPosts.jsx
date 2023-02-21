import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import PostCard from '../../Posts/PostCard';

import axios from 'axios';

export default function PostContainer({ subgreddiitName }) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    console.log(subgreddiitName);
    axios.get(
      `http://localhost:8080/subgreddiits/SG/${subgreddiitName}/posts`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log("Posts found in " + subgreddiitName + " : " + response.data);
        setPosts(response.data.posts);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {
          (posts.length > 0) ? (posts.map((post, index) => {
            console.log(subgreddiitName);
            return (
              <PostCard
                key={index}
                subgreddiitName={subgreddiitName}
                postID={post}
              />
            )
          })) : (<h1>No posts yet</h1>)
        }
      </Container>
    </React.Fragment>
  );
}