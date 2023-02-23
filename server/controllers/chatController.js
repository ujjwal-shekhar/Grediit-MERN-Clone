const User = require('../models/user');
const Chat = require('../models/chat');

// Get the list of all chats
exports.chat_list = function(req, res) {
    // Fetch all chats with either the sender or recipient being the current user
    Chat.find(
        {
            $or: [
                {chat_sender: req.user._id},
                {chat_recipient: req.user._id}
            ]
        },
        function(err, chats) {
            if (err) {
                res.status(500).json({message: 'Error fetching chats'});
            } else {
                res.status(200).json(chats);
            }
        }
    )
}

// Get details of a chat by it's id
exports.chat_details = function(req, res) {
    // Fetch the chat if the sender or recipient is the current user
    Chat.findOne(
        {
            $or: [
                {chat_sender: req.user._id},
                {chat_recipient: req.user._id}
            ],
            _id: req.params.id
        },
        function(err, chat) {
            if (err) {
                res.status(500).json({message: 'Error fetching chat'});
            } else {
                res.status(200).json(chat);
            }
        }
    )
}

// Post a new chat message
exports.chat_create = function(req, res) {
    // Create a new chat
    let chat = new Chat({
        chat_sender: req.user._id,
        chat_recipient: req.body.chat_recipient,
        chat_content: req.body.chat_content
    });

    // Save the chat
    chat.save(function(err) {
        if (err) {
            res.status(500).json({message: 'Error saving chat'});
        } else {
            res.status(200).json({message: 'Chat saved successfully'});
        }
    })
}