const User = require('../models/user');
const SubGreddiit = require('../models/subgreddiit');
const jwt = require('jsonwebtoken');

// Display a list of users
exports.user_list = function (req, res, next) {
    User.find()
        .exec(function (err, list_users) {
            if (err) { return next(err); }
            res.json({ title: 'User List', user_list: list_users });
        });
}

// Display details of a user
exports.user_detail = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            res.json(user);
        }
    })
}

// Display user create form on GET
exports.user_create_get = function (req, res, next) {
    console.log('user_create_get called');
    res.json({ title: 'Create User' });
}

// Handle user create on POST
exports.user_create_post = (req, res, next) => {
    console.log('user_create_post called');

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        contact_number: req.body.contact_number,
        followers: [],
        following: [],
        subgrediits: []
    });
    user.save()
        .then(res => {
            res.redirect('/users');
        })
        .catch(err => {
            console.log(err);
        });
}

// Display user delete form on GET
exports.user_delete_get = function (req, res, next) {
    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) { return next(err); }
            res.json({ title: 'Delete User', user: user });
        });
}

// Get user's subgreddiits that they moderate
exports.user_mod_subgreddiits_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            SubGreddiit.find({moderators: user._id}, (err, subgreddiits) => {
                if (err) console.log(err);
                else {
                    res.json(subgreddiits);
                }
            })
        }
    })
} 

// Get user's subgreddiits that they are a member 
exports.user_view_subgreddiits_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            
        }
    })
}

// Handle user delete on POST
exports.user_delete_post = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function deleteUser(err) {
        if (err) { return next(err); }
        res.redirect('/users');
    });
}

// Display user update form on GET
exports.user_update_get = function (req, res, next) {
    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) { return next(err); }
            res.json({ title: 'Update User', user: user });
        });
}

exports.user_profile_get = function (req, res, next) {
    res.json({ title: 'User Profile' });
}

// Handle user update on POST
exports.user_update_post = function (req, res, next) {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        contactNumber: req.body.contactNumber,
        _id: req.params.id
    });
    User.findByIdAndUpdate(req.params.id, user, {}, function (err, theuser) {
        if (err) { return next(err); }
        res.redirect(theuser.url);
    });
}

// Handle user login on POST
exports.user_login_post = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            res.status(400).json({ msg: "User does not exist" });
        }

        console.log("Before isMatch");
        user.comparePassword(password, (err, isMatch) => {
            if (err) throw err;

            console.log("isMatch", isMatch)            
            if (!isMatch) {
                console.log("Inside isMatch");
                res.status(400).json({ msg: "Incorrect password" });
            }
            user.password = undefined;
            const payload = { id: user._id, ...user };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '300d' });
            delete user.password;
            console.log(user);
            res.status(200).json({ token });
        });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}

// Get user followers
exports.user_followers_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            User.find({_id: user.followers}, (err, followers) => {
                if (err) console.log(err);
                else {
                    res.json(followers);
                }
            })
        }
    })
}

// Add a user in the post request to the user's list of followers
exports.user_add_follower_post = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            User.findOne({username: req.params.follower}, (err, follower) => {
                if (err) console.log(err);
                else {
                    user.followers.push(follower._id);
                    user.save();
                    console.log("added follower");
                    res.json(user);
                }
            })
        }
    })
    User.findOne({username: req.params.follower}, (err, follower) => {
        if (err) console.log(err);
        else {
            User.findOne({username: req.params.username}, (err, user) => {
                if (err) console.log(err);
                else {
                    follower.following.push(user._id);
                    follower.save();
                    console.log("added following");
                }
            })
        }
    })
};