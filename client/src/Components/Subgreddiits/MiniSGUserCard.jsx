import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

export default function MiniProfileCard({ user }) {
  console.log("MiniProfileCard : " + user, mode);
  const fullName = user.first_name + " " + user.last_name;

//   const handleRemove = () => {
//     console.log("Remove");
//   }

//   const handleUnfollow = () => {
//     console.log("Unfollow");
//   }

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
                      style={{ width: '115px', borderRadius: '10px' }}
                      className="d-sm-block"
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3 mt-1">
                    <MDBCardTitle>{fullName}</MDBCardTitle>
                    <MDBCardText>@{user.username}</MDBCardText>

                    <div className="d-flex pt-1 ">
                      <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                      {
                        (mode !== "FOLLOWING") ?
                        <MDBBtn className="flex-grow-1" color="danger" onClick={handleRemove}>Remove</MDBBtn>
                        :
                        <MDBBtn className="flex-grow-1" color="danger" onClick={handleUnfollow}>Unfollow</MDBBtn>
                      }
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