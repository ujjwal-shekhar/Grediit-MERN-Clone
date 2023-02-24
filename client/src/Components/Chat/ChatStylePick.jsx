import * as React from "react";

import ChatReceiver from "../Chat/ChatReceiver";
import ChatSender from "../Chat/ChatSender";

import axios from "axios";

const ChatStyle = ({ chat }) => {
    const [isSender, setIsSender] = React.useState(false);
    React.useEffect(() => {
        axios.get(
            `http://localhost:8080/isSender/${chat}`, 
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
    }, [])

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