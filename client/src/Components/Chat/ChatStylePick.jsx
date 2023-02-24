import * as React from "react";

import ChatReceiver from "../Chat/ChatReceiver";
import ChatSender from "../Chat/ChatSender";

import axios from "axios";

import Loading from "../pages/Loading";

const ChatStyle = ({ chat }) => {
    const [isSender, setIsSender] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    console.log("ChatStylePick mounted with : ", chat);

    React.useEffect(() => {
        axios.get(
            `http://localhost:8080/chats/isSender/${chat._id}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
        )
        .then((res) => {
            console.log(res);
            setIsSender(res.data.message === 'User is the sender');
        })
        .catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    console.log("ChatStylePick : ", chat);

    if (isSender) {
        return (
            <ChatSender chat={chat} />
        )
    } else {
        return (
            <ChatReceiver chat={chat} />
        )
    }
}

export default ChatStyle;