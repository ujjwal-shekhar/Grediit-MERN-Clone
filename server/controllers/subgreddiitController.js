const SubGreddiit = require('../models/subgreddiit');
const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');

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
    const post = new Post ({
        title: req.body.title,
        posted_by: req.user._id,
        posted_in: req.body.postedIn,
        content: req.body.content,    
    })
    post.save()
        .then(res => console.log(res))
        .catch(err => console.error(err))
}


// 

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
