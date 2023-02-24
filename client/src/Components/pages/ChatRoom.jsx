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
import ChatList from "../Chat/ChatList";

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
                console.log("Chats list : ", res.data);
                setChats(res.data);
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

    console.log("Chats list : after axios", chats);

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }} >
            <MDBRow>
                <MDBCol md="6" lg="7" xl="8">
                    <MDBTypography listUnStyled>
                        <ChatList chats={chats} />
                        <ChatInputForm user={user} />
                    </MDBTypography>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}