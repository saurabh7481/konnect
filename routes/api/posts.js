const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

router.get('/', (req, res) => {
    Post.find().sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                //check for post owner
                if(post.user.toString() !== req.user.id){
                    return res.status(401).json({unauthorized: "User not authorized"})
                }

                post.remove().then(() => res.json({success: true}));
            })
            .catch(err => res.status(404).json(err));
    })
});

module.exports = router;