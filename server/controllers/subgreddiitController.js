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
                "banned_members" : subgreddiit.banned_members,
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

exports.subgreddiit_accept_membership = function (req, res, next) {
    console.log('subgreddiit_accept_membership called');
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
            else {
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
                        res.json({report: report});
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


// Delete subgreddiit and everything, including Posts, Reports associated to it
// exports.subgreddiit_delete = function (req, res, next) {
//     console.log('subgreddiit_delete called');
//     SubGreddiit.findOneAndDelete({name: req.params.name}, (err, subgreddiit) => {
//         if (err) console.log(err);
//         else {
//             console.log('Subgreddiit deleted');
//             res.json({isDeleted: true});
//         }
//     }
// }
