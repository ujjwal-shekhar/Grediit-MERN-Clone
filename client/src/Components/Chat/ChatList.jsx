import * as React from "react";

import ChatStylePick from "./ChatStylePick";

import { Space } from "antd";

import Loading from "../pages/Loading";

const ChatList = ({ chats }) => {
    console.log("Chats list mounted with : ", chats)
    // Sort chats by dateTime
    chats.sort((a, b) => {
        return new Date(a.chat_timestamp) - new Date(b.chat_timestamp);
    })
    return (
        <Space direction="vertical">
            {
                chats.map((chat) => {
                    // console.log("ChatList.jsx : ", chat);
                    return <ChatStylePick key={chat._id} chat={chat} />
                })
            }
        </Space>
    )
}

export default ChatList;