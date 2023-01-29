const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    first_name : {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 2
    },
    last_name : {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 2
    },
    username : {
        type: String,
        unique: true,
        required: true,
        maxLength: 40,
        minLength: 2
    },
    password : {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 8
    },
    email : {
        type: String,
        unique: true,
        required: true,
    },
    age : {
        type: Number,
        required: true,
        min: 13,
        max: 100
    },
    contact_number : {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    }
})

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;