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
    reported_in:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubGrediit',
    },
    concern: {
        type: String,
        required: true,
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        default: "Pending",
    }
})

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;