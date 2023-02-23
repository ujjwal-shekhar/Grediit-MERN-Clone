import { Card, Space } from 'antd';
import Button from 'antd/lib/button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Fuse from 'fuse.js'

const App = ({ subgreddiit, perms, tags, searchValue }) => {
  // console.log(tags);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log('Clicked DELETE SG button');
    setProcessing(true);
    axios.delete(
      `http://localhost:8080/subgreddiits/SG/${subgreddiit.name}/delete`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    setProcessing(false);
  }
  const handleOpen = () => {
    // console.log('Clicked');
    if (perms === "MOD_MY")
      navigate(`/subgreddiits/${subgreddiit.name}/mod/users`);
    else 
      navigate(`/subgreddiits/${subgreddiit.name}/`);
  }

  const handleJoin = () => {
    console.log('Clicked Join');
    setProcessing(true);
    axios.get(
      `http://localhost:8080/subgreddiits/SG/${subgreddiit.name}/join_request`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    setProcessing(false);
  }

  const handleLeave = () => {
    console.log('Clicked');
    setProcessing(true);
    axios.get(
      `http://localhost:8080/subgreddiits/SG/${subgreddiit.name}/leave`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    setProcessing(false);
  }
  

  const toReturn = () => {
    if (perms === "MOD_MY") {
      return (
        <Space>
          <Button type="primary" danger onClick={handleDelete}>Delete</Button>
          <Button type="primary" onClick={handleOpen}>Open</Button>
        </Space>
      )
    } else if (perms === "MOD_ALL") {
      return (
        <Space>
          <Button type="primary" danger disabled={true} onClick={handleLeave}>Leave</Button>
          <Button type="primary" onClick={handleOpen}>Open</Button>
        </Space>
      )
    } else if (perms === "MEMBER") {
      return (
        <Space>
          <Button type="primary" danger onClick={handleLeave}>Leave</Button>
          <Button type="primary" onClick={handleOpen}>Open</Button>
        </Space>
      )
    } else if (perms === "LEFT") {
      return (
        <Space>
          <Button type="primary" danger disabled={true} onClick={handleDelete}>Join</Button>
          <Button type="primary" onClick={handleOpen}>Open</Button>
        </Space>
      )
    } else if (perms === "NON_MEMBER") {
      return (
        <Space>
          <Button type="primary" onClick={handleJoin} loading={processing}>Join</Button>
          <Button type="primary" disabled={true} onClick={handleOpen}>Open</Button>
        </Space>
      )
    } else if (perms === "REQUESTED") {
      return (
        <Space>
          <Button type="primary" danger disabled={true} >Requested</Button>
          <Button type="primary" onClick={handleOpen}>Open</Button>
        </Space>
      )
    }
  }

  const options = {
    includeScore: true,
    keys: ['name']
  }
  
  if (searchValue !== "" && searchValue !== null){
    const fuse = new Fuse([subgreddiit], options);
    // console.log("Search Value : ", searchValue);
    const result = fuse.search(searchValue);
  //   console.log("SearchValue" + searchValue + "Result : ", result);
    if (result.length !== 0) {
      console.log("Result isnt null : ", result);
      if (result[0].score > 0.6) {
        console.log("Result is bad bro : ", result)
        return null;
      } 
    } else {
      return null;
    }
  } 

  if (tags !== null) {
    // check if tags in sg tags
    const checkTags = () => {
      if (tags.length === 0) {
        return true;
      }
      for (let i = 0; i < tags.length; i++) {
        if (subgreddiit.tags.includes(tags[i])) {
          return true;
        }
      }
      return false;
    }
  
    if (!checkTags()) {
      return null;
    }
  }

  return (
    <Space direction="vertical" size={16}>
      <Card
        title={subgreddiit.name}
        extra={
                toReturn()
              }
        style={{
          width: 300,
        }}
        loading={processing}
      >
        <p>Description : {subgreddiit.description}</p>
        <p>Number of People : {subgreddiit.moderators.length + subgreddiit.common_members.length}</p>
        <p>Number of posts : {subgreddiit.posts.length}</p>
        <p>
          Banned Keywords : {
            subgreddiit.banned_keywords.map((keyword, index) => {
              return (
                <span key={index}> {index ? "," : ""} {keyword}  </span>
              )
            })
          }
        </p>
        <p>
          Tags : {
            subgreddiit.tags.map((tag, index) => {
              return (
                <span key={index}> {index ? "," : ""} {tag}  </span>
              )
            })
          }
        </p>
      </Card>
    </Space>
  );
};
export default App;