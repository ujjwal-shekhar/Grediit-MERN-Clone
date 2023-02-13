import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

import MiniProfileCard from '../Dashboard/Profile/MiniProfileCard.jsx';
import Loading from './Loading.jsx';

import axios from 'axios';

export default function Followers({ user, perms }) {
  console.log('Followers reached ', user, perms); 
  const [followers, setFollowers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // console.log(user)

  React.useEffect(() => {
    axios.get(
      'http://localhost:8080/users/' + user.username + '/followers',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
      console.log(response.data);
      setFollowers(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
                <MiniProfileCard user={user} perms={perms}/>
                {/* <MiniProfileCard />
                <MiniProfileCard />
                <MiniProfileCard /> */}

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}