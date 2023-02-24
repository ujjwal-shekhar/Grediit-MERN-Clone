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

import Loading from "../pages/Loading";

import axios from "axios";

const ChatSender = ({ chat }) => {
    const [recipient, setRecipient] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Get the details of the chat.chat_recipient
        axios
            .get("http://localhost:8080/users/id/" + chat.chat_recipient, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((res) => {
                console.log("Chat recipient details : ", res.data);
                setRecipient(res.data.username);
            })
            .catch((err) => {
                console.log(err);
            })
        setLoading(false);
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <li className="d-flex justify-content-between mb-4">
            <MDBCard className="w-100">
                <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">to {recipient}</p>
                </MDBCardHeader>
                <MDBCardBody>
                    <p className="mb-0">
                        {chat.chat_content}
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