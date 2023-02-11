const SubGreddiit = require('../models/subgreddiit');
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
        tags: [],
        banned_keywords: [],
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

