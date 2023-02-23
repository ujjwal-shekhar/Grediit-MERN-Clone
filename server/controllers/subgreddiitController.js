const SubGreddiit = require('../models/subgreddiit');
const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');
const Report = require('../models/report');

exports.subgreddiit_list = function (req, res, next) {
    console.log('subgreddiit_list called');
    SubGreddiit.find()
        .exec(function (err, list_subgreddiits) {
            if (err) { return next(err); }
            res.json({ title: 'SubGreddiit List', subgreddiit_list: list_subgreddiits });
        });
}

exports.subgreddiit_detail = function (req, res, next) {
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            res.json(subgreddiit);
        }
    })
}

exports.subgreddiit_create_test = function (req, res, next) {
    console.log("subgreddiit_create_test called");
}

exports.subgreddiit_create = function (req, res, next) {
    console.log('subgreddiit_create by POST called');
    console.log('req.body: ' + req.body.creatorID);
    const temptemp = mongoose.Types.ObjectId(req.body.creatorID)
    console.log('updatedType' + typeof(temptemp))
    const subgreddiit = new SubGreddiit({
        name: req.body.name,
        description: req.body.description,
        moderators: [mongoose.Types.ObjectId(req.body.creatorID)],     
        posts: [],
        tags: req.body.tags,
        banned_keywords: req.body.bannedKeywords,
        banned_members: [],
        common_members: []
    });
    console.log('subgreddiit: ' + subgreddiit);
    subgreddiit.save()
        .then(res => {
            res.redirect('/subgreddiits');
        })
        .catch(err => {
            console.log(err);
        });
}

// Check if user is a moderator of the subgreddiit
exports.subgreddiit_moderator_check = function (req, res, next) {
    console.log('subgreddiit_moderator_check called');
    console.log(req.user._id);
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('user is a moderator');
                res.json({isModerator: true});
            } else {
                console.log('user is not a moderator');
                res.json({isModerator: false});
            }
        }
    })
}

// Get details of subgreddiit by name
exports.subgreddiit_detail = function (req, res, next) {
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            // Check if user is a moderator
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('user is a moderator');
                res.json({subgreddiit: subgreddiit, isModerator: true});
            } else {
                console.log('user is not a moderator');
                res.json({subgreddiit: subgreddiit, isModerator: false});
            }
        }
    })
}

// Get list of posts in a subgreddiit
exports.subgreddiit_posts = function (req, res, next) {
    console.log('subgreddiit_posts called');
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            // Check if req.user is a moderator or a member of the subgreddiit
            if (subgreddiit.moderators.includes(req.user._id) 
            || subgreddiit.common_members.includes(req.user._id)) {
                res.json({posts: subgreddiit.posts, isMember: true});
            } else {   
                res.json({"Unauthorized": "You are not a member of this subgreddiit"});
            }
        }
    })
}

// GET list of all subgreddiits that the user is a moderator of
exports.subgreddiit_moderator_list = function (req, res, next) {
    console.log('subgreddiit_moderator_list called');
    SubGreddiit.find({moderators: {$in : [req.user._id]}})
        .exec(function (err, list_subgreddiits) {
            if (err) { console.log(err) }
            console.log(list_subgreddiits);
            res.json({ title: 'SubGreddiit List', subgreddiit_list: list_subgreddiits });
        });
}

// Get list of members in a subgreddiit
exports.subgreddiit_members = function (req, res, next) {
    console.log('get_members called');
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            res.json({
                "common_members" : subgreddiit.common_members,
                "blocked_members" : subgreddiit.blocked_members,
                "requested_members" : subgreddiit.requested_members,
                "mods" : subgreddiit.moderators
            });
        }
    })
}

// Get all subgreddiits in which user isn't a member or a moderator or a requested member
exports.subgreddiit_non_member_list = function (req, res, next) {
    console.log('subgreddiit_list called');
    SubGreddiit.find({$and: [
        {moderators: {$nin: [req.user._id]}},
        {common_members: {$nin: [req.user._id]}},
        {requested_members: {$nin: [req.user._id]}}
    ]})
        .exec(function (err, list_subgreddiits) {
            if (err) { console.log(err) }
            console.log(list_subgreddiits);
            res.json({ title: 'SubGreddiit List', subgreddiit_list: list_subgreddiits });
        });
}

// Create post in subgreddit
exports.subgreddiit_create_post_content = function (req, res, next) {
    console.log('subgreddiit_create_post_content called');
    const post = new Post ({
        title: req.body.title,
        posted_by: req.user._id,
        posted_in: req.body.postedIn,
        content: req.body.content,    
    })

    // Check if it has any banned keywords, if so, replace it with *
    
    post.save()
        .then(res => {
            // Add the post to subgreddiit.posts with id=posted_in
            SubGreddiit.findOneAndUpdate(
                {_id: req.body.postedIn}, 
                {$push: {posts: res._id}}, (err, subgreddiit) => {
                if (err) console.log(err);
                else {
                    console.log(subgreddiit)
                    console.log('Post added to subgreddiit');
                }
            })
        })
        .catch(err => console.error(err))
}


// Get details of a post in a subgreddiit and check if the user is either a common_member
// or a moderator of the subgreddiit

exports.subgreddiit_post_details = function (req, res, next) {
    console.log('subgreddiit_post_detail called');
    Post.findOne({_id: req.params.post}, (err, post) => {
        console.log("The post we got : ", post)
        if (err) console.log(err);
        else {
            // Check if user is a moderator or a common_member of the req.params.name subg
            SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
                if (err) console.log(err);
                else {
                    if (subgreddiit.moderators.includes(req.user._id)
                    || subgreddiit.common_members.includes(req.user._id)) {
                        console.log("The user is a member of the subgreddiit");
                        res.json({post: post, isMember: true});
                    }
                    else {
                        res.json({isMember: false});
                    }
                }
            })
        }
    })
}

// Post a comment in sub greddiit
exports.subgreddiit_post_comment = function (req, res, next) {
    // Push a comment to the post's comments array
    // Check if the user is a moderator or common member of the subgreddiit id in the req bodu
    
    SubGreddiit.findOne({ name: req.params.name }, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id) 
            || subgreddiit.common_members.includes(req.user._id)) {
                Post.findOneAndUpdate(
                    { _id: req.params.post },
                    { $push: { comments: req.body.content } },
                    (err, post) => {
                        if (err) console.log(err);
                        else {
                            res.json({ "success": true });
                        }
                    })
                }
            else {
                res.json({ "success": false });
            }
        }
    });  
}

// Add a user id to the requested_members array of the subgreddiit
exports.subgreddiit_request_membership = function (req, res, next) {
    console.log('subgreddiit_request_membership called');
    // Add a user to requested members only if they aren't already 
    // a member or a moderator of the subgreddiit or a requested member
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)
            || subgreddiit.common_members.includes(req.user._id)
            || subgreddiit.requested_members.includes(req.user._id)) {
                console.log('User is already a member of the subgreddiit');
                res.json({isRequested: false});
            }
            else {
                SubGreddiit.findOneAndUpdate(
                    {name: req.params.name},
                    {$push: {requested_members: req.user._id}},
                    (err, subgreddiit) => {
                        if (err) console.log(err);
                        else {
                            console.log('User added to requested_members');
                            res.json({isRequested: true});
                        }
                    }
                )
            }
        }
    })  
}

exports.subgreddiit_accept_membership = function (req, res, next) {
    console.log('subgreddiit_accept_membership called');
    // Check if user is a moderator of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('User is a moderator of the subgreddiit');
                // Pull the user from requested members and push it to common members
                // Do this only if the member isn't part of moderatroes or common members
                SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
                    if (err) console.log(err);
                    else {
                        if (subgreddiit.moderators.includes(req.body.userId)
                        || subgreddiit.common_members.includes(req.body.userId)) {
                            console.log('User is already a member of the subgreddiit');
                            res.json({isAccepted: false});
                        }
                        else {
                            console.log('User is not a member of the subgreddiit');
                            SubGreddiit.findOneAndUpdate(
                                {name: req.params.name},
                                {$pull: {requested_members: req.body.userId}},
                                (err, subgreddiit) => {
                                    if (err) console.log(err);
                                    else {
                                        console.log('User removed from requested_members');
                                        SubGreddiit.findOneAndUpdate(
                                            {name: req.params.name},
                                            {$push: {common_members: req.body.userId}},
                                            (err, subgreddiit) => {
                                                if (err) console.log(err);
                                                else {
                                                    console.log('User added to common_members');
                                                    res.json({isAccepted: true});
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                        }
                    }
                })
            } else {
                console.log('User is not a moderator of the subgreddiit');
                res.json({isAccepted: false});
            }
        }
    })
}

exports.subgreddiit_reject_membership = function (req, res, next) {
    console.log('subgreddiit_reject_membership called');
    // Check if user is a moderator of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('User is a moderator of the subgreddiit');
                SubGreddiit.findOneAndUpdate(
                    {name: req.params.name},
                    {$pull: {requested_members: req.body.userId}},
                    (err, subgreddiit) => {
                        if (err) console.log(err);
                        else {
                            console.log('User removed from requested_members');
                            res.json({isRejected: true});
                        }
                    }
                )
            }
            else {
                console.log('User is not a moderator of the subgreddiit');
                res.json({isRejected: false});
            }
        }
    })
}

// Get all reports in a subgreddiit
exports.subgreddiit_get_all_reports = function (req, res, next) {
    console.log('subgreddiit_get_reports called');
    // Check if user is a moderator of the subgreddiit

    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('User is a moderator of the subgreddiit');
                Report.find({reported_in: subgreddiit._id}, (err, reports) => {
                    if (err) console.log(err);
                    else {
                        console.log('Reports found');
                        res.json({reports: reports});
                    }
                })
            }
            else {
                console.log('User is not a moderator of the subgreddiit');
                res.json({reports: []});
            }
        }
    })
}

// exports.subgreddiit_get_report_by_id
exports.subgreddiit_get_report_by_id = function (req, res, next) {
    console.log('subgreddiit_get_report_by_id called');
    // Check if user is a moderator of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('User is a moderator of the subgreddiit');
                Report.findOne({_id: req.params.reports_id}, function (err, report) {
                    if (err) console.log(err);
                    else {
                        console.log('Report found');
                        // If the report was created more than 10 days before, delete it
                        const timeThreshold = 10 * 24 * 60 * 60 * 1000;
                        if (report.created_at < Date.now() - timeThreshold) {
                            Report.findOneAndDelete({_id: req.params.reports_id}, (err, report) => {
                                if (err) console.log(err);
                                else {
                                    console.log('Report deleted');
                                    res.json({report: null});
                                }
                            })
                        } else {
                            res.json({report: report});
                        } 

                    }
                })
            }
            else {
                console.log('User is not a moderator of the subgreddiit');
                res.json({report: null});
            }
        }
    })
}

exports.subgreddiit_create_report = function (req, res, next) {
    console.log('subgreddiit_create_report called');
    // Check if user is a moderator or a common_member of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id) 
            || subgreddiit.common_members.includes(req.user._id)) {

                console.log('User is a moderator or a common_member of the subgreddiit');
                let report = new Report({
                    reported_by: req.user._id,
                    reported_user: req.body.postCreator,
                    reported_in: req.body.postedIn,
                    post: req.params.postID,
                    concern: req.body.concern,
                })
                report.save((err, report) => {
                    if (err) console.log(err);
                    else {
                        console.log('Report created');
                        res.json({isReported: true});
                    }
                })
            }
            else {
                console.log('User is not a moderator or a common_member of the subgreddiit');
                res.json({isReported: false});
            }
        }
    })
}

// Ignore a report by setting its status to ignored
exports.subgreddiit_ignore_report = function (req, res, next) {
    console.log('subgreddiit_ignore_report called');
    // Check if user is a moderator of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('User is a moderator of the subgreddiit');
                Report.findOneAndUpdate(
                    {_id: req.params.report_id},
                    {status: 'Ignored'},
                    (err, report) => {
                        console.log(report)
                        if (err) console.log(err);
                        else {
                            console.log('Report ignored');
                            res.json({isIgnored: true});
                        }
                    }
                )
            }
            else {
                console.log('User is not a moderator of the subgreddiit');
                res.json({isIgnored: false});
            }
        }
    })
}

// Delete post by id and everything, including Reports associated to it
exports.subgreddiit_delete_post = function (req, res, next) {
    console.log('subgreddiit_delete_post called');
    // Check if user is a moderator subgreddiit and pull the post from the subgreddiit
    SubGreddiit.findOneAndUpdate(
        {name: req.params.name},
        {$pull: {posts: req.params.postID}},
        (err, subgreddiit) => {
            if (err) console.log(err);
            else {
                if (subgreddiit.moderators.includes(req.user._id)) {
                    console.log('User is a moderator of the subgreddiit');
                    Report.deleteMany({post: req.params.postID}, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log('Reports deleted');
                            Post.findOneAndDelete({_id: req.params.postID}, (err, post) => {
                                if (err) console.log(err);
                                else {
                                    console.log('Post deleted');
                                    res.json({isDeleted: true});
                                }
                            })
                        }
                    })
                }
                else {
                    console.log('User is not a moderator of the subgreddiit');
                    res.json({isDeleted: false});
                }
            }
        }
    )
}

// Delete the reports with reported_in as the sg name
// Remove these posts from user's saved_posts, created_posts
// Delete the posts with posts_in as the sg name
// Remove the subgreddiit from the user's mod_subgreddiits, view_subgreddiits,
// Finally delete the subgrediit

exports.subgreddiit_delete = function (req, res, next) {
    console.log('subgreddiit_delete called');
    console.log(req.params.name)
    // Check if user is a moderator of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            console.log("Subgreddiit found")
            if (subgreddiit.moderators.includes(req.user._id)) {
                console.log('User is a moderator of the subgreddiit');
                // Delete the reports with reported_in as the sg name
                Report.deleteMany({reported_in: subgreddiit._id}, (err) => {
                    if (err) console.log(err);
                    else {
                        console.log('Reports deleted');
                        // Remove these posts from user's saved_posts, created_posts
                        User.updateMany(
                            {},
                            {$pull: {saved_posts: {$in: subgreddiit.posts}, created_posts: {$in: subgreddiit.posts}}},
                            (err) => {
                                if (err) console.log(err);
                                else {
                                    console.log('Posts removed from users');
                                    // Delete the posts with posts_in as the sg name
                                    Post.deleteMany({posted_in: subgreddiit._id}, (err) => {
                                        if (err) console.log(err);
                                        else {
                                            console.log('Posts deleted');
                                            // Remove the subgreddiit from the user's mod_subgreddiits, view_subgreddiits,
                                            User.updateMany(
                                                {},
                                                {$pull: {mod_subgreddiits: subgreddiit._id, view_subgreddiits: subgreddiit._id}},
                                                (err) => {
                                                    if (err) console.log(err);
                                                    else {
                                                        console.log('Subgreddiit removed from users');
                                                        // Finally delete the subgrediit
                                                        SubGreddiit.findOneAndDelete({name: req.params.name}, (err) => {
                                                            if (err) console.log(err);
                                                            else {
                                                                console.log('Subgreddiit deleted');
                                                                res.json({isDeleted: true});
                                                            }
                                                        })
                                                    }
                                                }
                                            )
                                        }
                                    })
                                }
                            }
                        )
                    }
                })
            } else {
                console.log('User is not a moderator of the subgreddiit');
                res.json({isDeleted: false});
            }
        }
    })
}

// Leave sg, this will remove the user from an sg common member and 
// put them in the banned_members list

exports.subgreddiit_leave = function (req, res, next) {
    console.log('subgreddiit_leave called');
    // Check if user is a common member of the subgreddiit
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.common_members.includes(req.user._id)) {
                console.log('User is a common member of the subgreddiit');
                // Remove user from common_members and add to banned_members
                SubGreddiit.findOneAndUpdate(
                    {name: req.params.name},
                    {$pull: {common_members: req.user._id}, $push: {banned_members: req.user._id}},
                    (err, subgreddiit) => {
                        if (err) console.log(err);
                        else {
                            console.log('User removed from common_members and added to banned_members');
                            res.json({isLeft: true});
                        }
                    }
                )
            }
            else {
                console.log('User is not a common member of the subgreddiit');
                res.json({isLeft: false});
            }
        }
    })
}

// Upvote or downvote by pulling/pushing 
// The user can either upvote or downvote
// Not both, and the users are stored in the aprr array

exports.subgreddiit_post_vote = function(req, res, next) {
    console.log('subgreddiit post up down vote called');
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id) 
            ||  subgreddiit.common_members.includes(req.user._id)) {
                if (req.body.vote_type === "UPVOTE") {
                    Post.findOneAndUpdate(
                        {_id: req.params.postID},
                        {$pull: {downvotes: req.user._id}, 
                        $push: {upvotes: req.user._id}},
                        (err, post) => {
                            if (err) console.log(err);
                            else {
                                console.log('Post upvoted');
                                res.json({isUpvoted: true});
                            }
                        }
                    )
                } else if (req.body.vote_type === "DOWNVOTE") {
                    Post.findOneAndUpdate(
                        {_id: req.params.postID},
                        {$pull: {upvotes: req.user._id}, 
                        $push: {downvotes: req.user._id}},
                        (err, post) => {
                            if (err) console.log(err);
                            else {
                                console.log('Post downvoted');
                                res.json({isDownvoted: true});
                            }
                        }
                    )
                }
            } else {
                console.log('User is not allowed to view posts')
            }
        }
    })
}

// Add the post to the saved posts
// But only if the user is a common member of the subgreddiit
// or the user is a moderator of the subgreddiit
// Add only if the post is not already saved

exports.subgreddiit_save_post = function(req, res, next) {
    console.log('subgreddiit save post called');
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)
            ||  subgreddiit.common_members.includes(req.user._id)) {
                if (!req.user.saved_posts.includes(req.params.postID)) {
                    User.findOneAndUpdate(
                        {_id: req.user._id},
                        {$push: {saved_posts: req.params.postID}},
                        (err, user) => {
                            if (err) console.log(err);
                            else {
                                console.log('Post saved');
                                res.json({isSaved: true});
                            }
                        }
                    )
                } else {
                    console.log('Post is already saved');
                    res.json({isSaved: false});
                }
            }
        }
    })
}

// Subgreddiit block user
// Only moderators can block users
// The user is added to the blocked_members list
// The user is removed from the common_members list
// You are given the report id, fetch the corresponding post
// from the report get the post
// set status to blocked of every post posted by the user corresponding

exports.subgreddiit_block_report = function(req, res, next) {
    console.log('subgreddiit block user called');
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)) {
                // Check if the user is already blocked
                if (!subgreddiit.blocked_members.includes(req.body.blocked_user)) {
                    // Add the user to the blocked_members list
                    SubGreddiit.findOneAndUpdate(
                        {name: req.params.name},
                        {$push: {blocked_members: req.body.blocked_user}},
                        (err, subgreddiit) => {
                            if (err) console.log(err);
                            else {
                                console.log('User added to blocked_members');
                                // Remove the user from the common_members list
                                SubGreddiit.findOneAndUpdate(
                                    {name: req.params.name},
                                    {$pull: {common_members: req.body.blocked_user}},
                                    (err, subgreddiit) => {
                                        if (err) console.log(err);
                                        else {
                                            console.log('User removed from common_members');
                                            // Set the status of every post posted by the user to blocked
                                            Post.updateMany(
                                                {reported_by: {$in: [req.body.blocked_user]}},
                                                {blocked: true},
                                                (err, data) => {
                                                    if (err) 
                                                        console.log(err);
                                                    else {
                                                        // console.log('Status of posts set to blocked');
                                                        // res.json({isBlocked: true});
                                                        // Change the status of report to blocked
                                                        Report.findOneAndUpdate(
                                                            {_id: req.params.report_id},
                                                            {status: "Blocked"},
                                                            (err, report) => {
                                                                if (err) console.log(err);
                                                                else {
                                                                    console.log('Report status set to blocked');
                                                                    res.json({isBlocked: true});
                                                                }
                                                            }
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )
                } else {
                    console.log('User is already blocked');
                    res.json({isBlocked: false});
                }
            }
        }
    })
}

// Check if a user is in blocked members list
// If the user is in the blocked members list
// then the user is not allowed to view the subgreddiit

exports.subgreddiit_check_blocked = function(req, res, next) {
    console.log('subgreddiit check blocked called');
    SubGreddiit.findOne({name: req.params.name}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            console.log(subgreddiit)
            // if (subgreddiit.blocked_members.includes(req.body.toCheck)) {
            //     console.log('User is blocked');
            //     res.json({isBlocked: true});
            // } else {
            //     console.log('User is not blocked');
            //     res.json({isBlocked: false});
            // }
            // Check if user is a blocked and return the isBlocked 
            // Also fetch the user from the db and send in response
            // so that the user can be added to the blocked members list
            // of the subgreddiit
            if (subgreddiit.blocked_members.includes(req.body.toCheck)) {
                User.findOne({_id: req.body.toCheck}, (err, user) => {
                    if (err) console.log(err);
                    else {
                        console.log('User is blocked');
                        user.username = "Blocked User";
                        res.json({isBlocked: true, user: user});
                    }
                }
            )
            } else {
                console.log('User is not blocked');
                User.findOne({_id: req.body.toCheck}, (err, user) => {
                    if (err) console.log(err);
                    else {
                        console.log('User is blocked');
                        res.json({isBlocked: false, user: user});
                    }
                })
            }


        }
    })
}

// Get Subgreddiit by id
// Only return if it user is a moderator or a common member

exports.subgreddiit_get_by_id = function(req, res, next) {
    console.log('subgreddiit get by id called');
    SubGreddiit.findOne({_id: req.params.id}, (err, subgreddiit) => {
        if (err) console.log(err);
        else {
            if (subgreddiit.moderators.includes(req.user._id)
            ||  subgreddiit.common_members.includes(req.user._id)) {
                res.json(subgreddiit);
            }
        }
    })
}

// Remove a saved post from a user
// Only the user can remove a saved post