const User = require('../models/user');
const SubGreddiit = require('../models/subgreddiit');
const Post = require('../models/post');
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

// Display user details using id
exports.user_detail_id = function (req, res, next) {
    User.findById(req.params.id, (err, user) => {
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

// Get user's subgreddiits that they moderate
exports.user_mod_subgreddiits_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        // console.log("User validation : ", req.user._id == user._id)
        if (err) console.log(err);
        else if (req.user._id != user._id) {
            res.status(401).json({message: 'You are not authorized to view this'});
        }
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

// Get user's subgreddiits that they are a member of
exports.user_members_subgreddiits_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else if (req.user._id != user._id) {
            res.status(401).json({message: 'You are not authorized to view this'});
        }
        else {
            // Find all subgreddiits with user in common_members
            SubGreddiit.find({common_members: user._id}, (err, subgreddiits) => {
                if (err) console.log(err);
                else {
                    res.json(subgreddiits);
                }
            })
        }
    })
}

// Get user's subgreddiits that they are a requested_member of
exports.user_requested_subgreddiits_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else if (req.user._id != user._id) {
            res.status(401).json({message: 'You are not authorized to view this'});
        }
        else {
            // Find all subgreddiits with user in requested_member
            SubGreddiit.find({requested_members: user._id}, (err, subgreddiits) => {
                if (err) console.log(err);
                else {
                    res.json(subgreddiits);
                }
            })
        }
    });
}

// Get user's subgreddiits that they are a banned_member of
exports.user_banned_subgreddiits_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else if (req.user._id != user._id) {
            res.status(401).json({message: 'You are not authorized to view this'});
        }
        else {
            // Find all subgreddiits with user in banned_members
            SubGreddiit.find({banned_members: user._id}, (err, subgreddiits) => {
                if (err) console.log(err);
                else {
                    res.json(subgreddiits);
                }
            })
        }
    });
}


// Handle user delete on POST
exports.user_delete_post = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function deleteUser(err) {
        if (err) { return next(err); }
        res.redirect('/users');
    });
}

// Update user on POST
// But the user cannot update the refs to their followers and following and other refs
exports.user_update_post = function (req, res, next) {
    User.findByIdAndUpdate(req.user._id,
        {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            age: req.body.age,
            contact_number: req.body.contactNumber,
        }, 
        {
        new: true,
        }, 
        function (err, theuser) {
            if (err) {console.log("Error in updating user: ", err);}
            theuser.password = undefined;
            res.json(theuser);
        }
    );
}

// Remove follower from user
exports.user_remove_follower_post = function (req, res, next) {
    console.log("user_remove_follower_post called");
    const toRemove = req.body.toRemove;

    User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {followers: toRemove}},
        (err, user) => {
            if (err) console.log(err);
            else {
                User.findOneAndUpdate(
                    {_id: toRemove},
                    {$pull: {following: req.user._id}},
                    (err, follower) => {
                        if (err) console.log(err);
                        else {
                            res.json(follower);
                        }
                    }
                )
            }
        }
    )
}

// Remove following from user 
exports.user_remove_following_post = function (req, res, next) {
    console.log("user_remove_following_post called");
    const toRemove = req.body.toUnfollow;

    console.log("toRemove: ", toRemove)

    User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {following: toRemove}},
        (err, user) => {
            if (err) console.log(err);
            else {
                User.findOneAndUpdate(
                    {_id: toRemove},
                    {$pull: {followers: req.user._id}},
                    (err, following) => {
                        if (err) console.log(err);
                        else {
                            res.json(following);
                        }
                    }
                )
            }
        }
    )
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

// Get user following
exports.user_following_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            User.find({_id: user.following}, (err, following) => {
                if (err) console.log(err);
                else {
                    res.json(following);
                }
            })
        }
    })
}

// Get user following and followers count
exports.user_following_followers_count_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            res.json({following: user.following.length, followers: user.followers.length});
        }
    })
}

// // Add a user by id in the post request to the user's list of following
// exports.user_add_follower_post_by_id = function (req, res, next) {
//     User.findById(req.params.id,  (err, user) => {
//         if (err) console.log(err);
//         else {
//             User.findByIdAndUpdate(
//                 req.user._id,
//                 {$push: {following: user._id}},
//                 (err, user) => {
//                     if (err) console.log(err);
                    
//                 }
//             )
//     })
// }
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

// Get saved_posts
exports.user_saved_posts_get = function (req, res, next) {
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) console.log(err);
        else {
            Post.find({_id: user.saved_posts}, (err, posts) => {
                if (err) console.log(err);
                else {
                    res.json(posts);
                }
            })
        }
    })
}

// Remove saved post from user
exports.user_remove_saved_post = function (req, res, next) {
    User.findOne({username: req.user.username}, (err, user) => {
        if (err) console.log(err);
        else {
            user.saved_posts.pull(req.params.postID);
            user.save();
            res.json(user);
        }
    })
}

// // Add a post to the user's list of saved posts
// exports.user_add_saved_post = function (req, res, next) {
//     User.findOne({username: req.user.username}, (err, user) => {
//         if (err) console.log(err);
//         else {
//             // add only if post is not already saved
//             if (!user.saved_posts.includes(req.params.postID)) {
//                 user.saved_posts.push(req.params.postID);
//                 user.save();
//                 res.json(user);
//             }
//         }
//     })
// }