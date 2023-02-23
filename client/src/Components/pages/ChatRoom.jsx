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

import ChatInputForm from "../Chat/ChatInputForm";
import ChatReceiver from "../Chat/ChatReceiver";
import ChatSender from "../Chat/ChatSender";

import Loading from "./Loading";

import axios from "axios";

export default function App({ user }) {
    const [chats, setChats] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        axios
            .get("http://localhost:8080/chats/all", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((res) => {
                console.log(res);
                setChats(res.data.chats);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }} >
            <MDBRow>
                <MDBCol md="6" lg="7" xl="8">
                    <MDBTypography listUnStyled>
                        <ChatSender />
                        <ChatReceiver />

                        <ChatInputForm user={user} />
                    </MDBTypography>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}