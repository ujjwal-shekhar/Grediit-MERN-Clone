const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubGreddiitSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 30,
        minLength: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 10   
    },
    tags: [{
        type: String,
        maxLength: 10,
        minLength: 1
    }],
    banned_keywords: [{
        type: String,
        maxLength: 10,
        minLength: 1
    }],
    banned_members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    common_members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

})

const SubGreddiit = mongoose.model('SubGreddiit', SubGreddiitSchema);
module.exports = SubGreddiit;