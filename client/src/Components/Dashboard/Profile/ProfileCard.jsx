import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'; 

import Followers from '../../pages/Followers';
import CreateSGForm from '../../Subgreddiits/SubgreddiitCreateForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

export default function ProfileCard({ user, perms }) {
  console.log(user, perms);
  const navigate = useNavigate();
  const fullName = user.first_name + ' ' + user.last_name;
  const [showSGForm, setShowSGForm] = React.useState(false);
  const [showEditForm, setShowEditForm] = React.useState(false);

  const handleToggle = (formType) => {
    if (formType === 'SG') {
      setShowSGForm(!showSGForm);
    } else if (formType === 'Edit') {
      setShowEditForm(!showEditForm);
    }
  }

  const handleClose = () => {
    setShowSGForm(false);
    setShowEditForm(false);
  }

  const handleFollowers = () => {
    navigate('/profile/followers')
  }
  const handleFollowing = () => {
    navigate('/profile/following')
  }
  const handleFollow = () => {
    
  }
  const handleEdit = () => {
    handleToggle('Edit')
  }
  const handleUnfollow = () => {

  }
  const handleCreateSG = () => {
    handleToggle('SG');
  }
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <Modal
        open={showSGForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateSGForm creator={user}/>
        </Box>
      </Modal>
      <Modal
        open={showEditForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          lmai  
        </Box>
      </Modal>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 md-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    { perms == "AUTH" ? 
                        <MDBBtn outline className='mb-2' color="dark" style={{height: '36px', overflow: 'visible'}} onClick={handleEdit}>
                        Edit profile
                        </MDBBtn> 
                        
                        :

                        <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                        Follow
                        </MDBBtn>
                      }

                    { perms == "AUTH" && 
                      <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}} onClick={handleCreateSG}>
                      Create SG
                      </MDBBtn>
                    }
                    
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{fullName}</MDBTypography>
                  <MDBCardText>{'@' + user.username}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div className="px-3">
                  <MDBBtn color='light' onClick={handleFollowers}>
                    <MDBCardText className="mb-1 h5">4</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </MDBBtn>
                  </div>
                  <div>
                  <MDBBtn color='light' onClick={handleFollowing}>
                    <MDBCardText className="mb-1 h5">4</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </MDBBtn>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">EmailID: {user.email}</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Contact Number : {user.contact_number}</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Age: {user.age}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Routes>
        <Route path="followers" element={<Followers />} />
        <Route path="following" element={<Followers />} />
      </Routes>
    </div>
  );
}