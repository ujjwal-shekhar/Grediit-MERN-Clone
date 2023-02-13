import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

import MiniProfileCard from '../Dashboard/Profile/MiniProfileCard.jsx';

export default function Followers({ user, perms }) {
  console.log('Followers reached'); 
  // axios.get('http://localhost:8080/profile/' + user.username + '/followers')
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            {/* <MDBCard> */}
                <MiniProfileCard user={user} perms={perms}/>
                <MiniProfileCard />
                <MiniProfileCard />
                <MiniProfileCard />
            {/* </MDBCard> */}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}