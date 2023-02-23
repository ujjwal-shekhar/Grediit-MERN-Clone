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

const ChatSender = ({ user }) => {
    return (
        <li class="d-flex justify-content-between mb-4">
            <MDBCard className="w-100">
                <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p class="fw-bold mb-0">Lara Croft</p>
                    {/* <p class="text-muted small mb-0">
                        <MDBIcon far icon="clock" /> 13 mins ago
                    </p> */}
                </MDBCardHeader>
                <MDBCardBody>
                    <p className="mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                    </p>
                </MDBCardBody>
            </MDBCard>
            <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
            />
        </li>
    )
} 

export default ChatSender;