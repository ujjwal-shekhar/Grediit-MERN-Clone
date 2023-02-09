const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 5
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    posted_in: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubGrediit',
    },
    content: {
        type: String,
        required: true,
        maxLength: 1000,
        minLength: 10
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
})

const Post = mongoose.model('Post', UserSchema);
module.exports = Post;