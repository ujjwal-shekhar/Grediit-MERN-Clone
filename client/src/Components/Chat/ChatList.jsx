import * as React from "react";

import ChatStylePick from "./ChatStylePick";

import { Space } from "antd";

const ChatList = ({ chats }) => {
    console.log("Chats list mounted with : ", chats)
    return (
        <Space>
            {
                chats.map((chat) => {
                    <ChatStylePick chat={chat} />
                })
            }
        </Space>
    )
}

export default ChatList;