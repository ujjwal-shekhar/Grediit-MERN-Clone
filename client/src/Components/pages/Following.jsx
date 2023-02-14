import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

import MiniProfileCard from '../Dashboard/Profile/MiniProfileCard.jsx';
import Loading from './Loading.jsx';

import axios from 'axios';

export default function Following({ user, perms }) {
  console.log('following reached')
  const [following, setFollowing] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // console.log(user)

  React.useEffect(() => {
    axios.get(
      'http://localhost:8080/users/' + user.username + '/following',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
      console.log(response.data);
      setFollowing(response.data);
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
            {following.map(followee => <MiniProfileCard key={followee._id} user={followee} mode={"FOLLOWING"} />)}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}