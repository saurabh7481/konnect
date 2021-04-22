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

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                    return res.status(100).json({alreadyLiked: "User already liked this post"})
                }
                post.likes.unshift({user: req.user.id});
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json(err));
    })
});

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res.status(100).json({notLiked: "Not liked this post yet"})
                }

                //get remove idx
                const idx = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                post.likes.splice(idx, 1);
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json(err));
    })
});

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            const comment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(comment);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({notfound: "No such post found"}));
})

router.delete('/comment/:id/:commentId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.params.commentId).length === 0){
                return res.status(404).json({notfound: "Comment does not exist"});
            }

            const idx = post.comments.map(item => item._id.toString()).indexOf(req.params.commentId);
            post.comments.splice(idx, 1);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({notfound: "No such post found"}));
})

module.exports = router;