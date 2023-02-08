const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reported_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reported_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
    },
    concern: {
        type: String,
        required: true,
    }
})