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
    console.log("req.body is : ", req.body)
    // Check if the req.body.recipient follows user.req._id
    // However, followers and following are arrays of objects
    // and req.body.recipient is the username of the recipient
    // so we need to find the user with the username
    // and then check if the user is in the array of objects

    // Find the user with the username
    User.findOne(
        {username: req.body.recipient},
        function(err, user) {
            if (err || !user) {
                res.status(500).json({message: 'Error fetching user'});
            } else {
                // Check if the user is in the array of objects
                User.findOne(
                    {
                        _id: req.user._id,
                        following: user._id,
                        followers: user._id
                    },
                    function(err, user2) {
                        if (err || !user2) {
                            res.status(500).json({message: 'Error fetching user'});
                        } else {
                            // Create a new chat
                            let chat = new Chat({
                                chat_sender: req.user._id,
                                chat_recipient: user._id,
                                chat_content: req.body.content
                            });

                            chat.save(function(err) {
                                if (err) {
                                    res.status(500).json({message: 'Error saving chat', err: err});
                                } else {
                                    res.status(200).json({message: 'Chat saved successfully'});
                                }
                            })
                        }
                    }
                )
            }
        }
    )
}

// Check if user is the sender
exports.is_sender = function(req, res) {
    // Fetch the chat if the sender or recipient is the current user
    Chat.findOne(
        {_id: req.params.id},
        function(err, chat) {
            if (err) {
                res.status(500).json({message: 'Error fetching chat'});
            } else {
                if (chat.chat_sender == req.user._id) {
                    res.status(200).json({message: 'User is the sender'});
                } else {
                    res.status(200).json({message: 'User is not the sender'});
                }
            }
        }
    )
}