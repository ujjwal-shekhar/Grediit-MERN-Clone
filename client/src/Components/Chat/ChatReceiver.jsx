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

import axios from "axios";

const ChatReceiver = ({ chat }) => {
    const [sender, setSender] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Get the details of the chat.chat_sender
        axios
            .get("http://localhost:8080/users/id/" + chat.chat_recipient, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((res) => {
                console.log("Chat sender details : ", res.data);
                setSender(res.data.username);
            })
            .catch((err) => {
                console.log(err);
            })
        setLoading(false);
    }, [])
    return (
        <li className="d-flex justify-content-between mb-4">
            <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
            />
            <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">from {sender}</p>
                    {/* <p className="text-muted small mb-0">
                        <MDBIcon far icon="clock" /> 12 mins ago
                    </p> */}
                </MDBCardHeader>
                <MDBCardBody>
                    <p className="mb-0">
                        {chat.chat_content}
                    </p>
                </MDBCardBody>
            </MDBCard>
        </li>
    )
} 

export default ChatReceiver;