import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

import axios from 'axios';

import Loading from '../../pages/Loading.jsx';

export default function MiniProfileCard({ userID, mode }) {
  // console.log("MiniProfileCard : " + user, mode);
  console.log("MiniProfileCard : " + userID  + " Mode: " + mode);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({});

  // const 
  
  React.useEffect(() => {
    axios.get(
      `http://localhost:8080/users/id/${userID}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])

  const handleAccept = () => {
    console.log("Accept");
  }

  const handleReject = () => {
    console.log("Reject");
  }

  const fullName = user.first_name + " " + user.last_name;

  if (loading) {
    return <Loading />
  }

  return (
    <div className="mb-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="8" xl="10" className="mt-0">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '80px', borderRadius: '10px' }}
                      className="d-sm-block"
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3 mt-1">
                    <MDBCardTitle>{fullName}</MDBCardTitle>
                    <MDBCardText>@{user.username}</MDBCardText>

                    <div className="d-flex pt-1 ">
                      
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}