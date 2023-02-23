const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    chat_sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    chat_recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    chat_content: {
        type: String,
        required: true,
        maxLength: 1000,
        minLength: 1
    },
    chat_timestamp: {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;