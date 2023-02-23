import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = ({ user }) => {
  const [content, setContent] = React.useState("");
  const [recipient, setRecipient] = React.useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      content,
      recipient,
    };
    axios
      .post(
        "http://localhost:8080/chats/new",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <li className="bg-white mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} handleChange={handleContentChange}/>
            </li>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <li className="bg-white mb-3">
              <MDBTextArea label="Receiver" id="textAreaExample" rows={4} handleChange={handleRecipientChange}/>
            </li>
          </Item>
        </Grid>
      </Grid>
      <MDBBtn color="info" rounded className="float-end" 
              onClick={handleSubmit} >
        Send
      </MDBBtn>
    </>
  )
}

export default App;