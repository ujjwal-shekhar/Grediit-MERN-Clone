const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const chat_controller = require("../controllers/chatController");

// Get list of all chats
router.get('/all', verifyToken, chat_controller.chat_list);

// Get details of a chat by it's id
router.get('/chat/:id', verifyToken, chat_controller.chat_details);

// Post a new chat message
router.post('/new', verifyToken, chat_controller.chat_create);

// Check if user is the sender
router.get('/isSender/:id', verifyToken, chat_controller.is_sender);

module.exports = router;