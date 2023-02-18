import { Card, Space } from 'antd';
import Button from 'antd/lib/button';

import { useNavigate } from 'react-router-dom';

const App = ({ subgreddiit, perms }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log('Clicked');
  }
  const handleOpen = () => {
    // console.log('Clicked');
    if (perms === "MOD_MY" || perms === "MOD_ALL")
      navigate(`/subgreddiits/${subgreddiit.name}/mod/users`);
    else 
      navigate(`/subgreddiits/${subgreddiit.name}/`);
  }

  const handleLeave = () => {
    console.log('Clicked');
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
          <Button type="primary" danger onClick={handleDelete}>Leave</Button>
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
          <Button type="primary" danger onClick={handleDelete}>Join</Button>
          <Button type="primary" onClick={handleOpen}>Open</Button>
        </Space>
      )
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
      </Card>
    </Space>
  );
};
export default App;
// import React from 'react';
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBTypography,
//   MDBIcon
// } from 'mdb-react-ui-kit';

// export default function MiniSubgreddiitCard({ subgreddiit, perms }) {
//   return (
//     <section className="" style={{ backgroundColor: '#5f59f7' }}>
//       <MDBContainer className="py-5 h-100">
//         <MDBRow className="justify-content-center align-items-center h-100">
//           <MDBCol xl="10">
//             <MDBCard className="mb-1" style={{ borderRadius: '15px' }}>
//               <MDBCardBody className="p-4">
//                 <MDBTypography tag='h3'>{subgreddiit.name}</MDBTypography>
//                 <MDBCardText className="small">
//                   <MDBIcon far icon="star" size="lg" />
//                   <span className="mx-2">|</span> Created by <strong>{subgreddiit.moderators[0]}</strong> on 11 April , 2021
//                 </MDBCardText>
//                 <hr className="my-4" />
//                 <div className="d-flex justify-content-start align-items-center">
//                   <MDBCardText className="text-uppercase mb-0">
//                     <MDBIcon fas icon="cog me-2" /> <span className="text-muted small">settings</span>
//                   </MDBCardText>
//                   <MDBCardText className="text-uppercase mb-0">
//                     <MDBIcon fas icon="link ms-4 me-2" /> <span className="text-muted small">program link</span>
//                   </MDBCardText>
//                   <MDBCardText className="text-uppercase mb-0">
//                     <MDBIcon fas icon="ellipsis-h ms-4 me-2" /> <span className="text-muted small">program link</span> <span className="ms-3 me-4">|</span>
//                   </MDBCardText>
//                   <a href="#!">
//                     <MDBCardImage
//                       width="35"
//                       src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
//                       alt="avatar"
//                       className="rounded-circle me-3"
//                       fluid />
//                   </a>
//                   <MDBBtn outline color="dark" floating size="sm">
//                     <MDBIcon fas icon="plus" />
//                   </MDBBtn>
//                 </div>
//               </MDBCardBody>
//             </MDBCard>

//             {/* <MDBCard className="mb-5" style={{ borderRadius: '15px' }}>
//               <MDBCardBody className="p-4">
//                 <MDBTypography tag='h3'>Company Culture</MDBTypography>
//                 <MDBCardText className="small">
//                   <MDBIcon fas icon="star text-warning" size="lg" />
//                   <span className="mx-2">|</span> Public <span className="mx-2">|</span> Updated by <strong>MDBootstrap</strong> on 11 April , 2021
//                 </MDBCardText>
//                 <hr className="my-4" />
//                 <div className="d-flex justify-content-start align-items-center">
//                   <MDBCardText className="text-uppercase mb-0">
//                     <MDBIcon fas icon="cog me-2" /> <span className="text-muted small">settings</span>
//                   </MDBCardText>
//                   <MDBCardText className="text-uppercase mb-0">
//                     <MDBIcon fas icon="link ms-4 me-2" /> <span className="text-muted small">program link</span>
//                   </MDBCardText>
//                   <MDBCardText className="text-uppercase mb-0">
//                     <MDBIcon fas icon="ellipsis-h ms-4 me-2" /> <span className="text-muted small">program link</span> <span className="ms-3 me-4">|</span>
//                   </MDBCardText>
//                   <a href="#!">
//                     <MDBCardImage width="35" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp" alt="avatar" className="rounded-circle me-1" fluid />
//                     <MDBCardImage width="35" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" alt="avatar" className="rounded-circle me-1" fluid />
//                     <MDBCardImage width="35" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp" alt="avatar" className="rounded-circle me-1" fluid />
//                     <MDBCardImage width="35" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar" className="rounded-circle me-3" fluid />
//                   </a>
//                   <MDBBtn outline color="dark" floating size="sm">
//                     <MDBIcon fas icon="plus" />
//                   </MDBBtn>
//                 </div>
//               </MDBCardBody>
//             </MDBCard> */}
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// }