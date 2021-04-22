const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = "No profile for this user"
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const profileData = {};
    profileData.user = req.user.id;
    if(req.body.handle) profileData.handle = req.body.handle;
    if(req.body.company) profileData.company = req.body.company;
    if(req.body.website) profileData.website = req.body.website;
    if(req.body.location) profileData.location = req.body.location;
    if(req.body.status) profileData.status = req.body.status;
    if(req.body.githubusername) profileData.githubusername = req.body.githubusername;
    if(typeof req.body.skills !== 'undefined'){
        profileData.skills = req.body.skills.split(',');
    }

    profileData.social = {};
    if(req.body.facebook) profileData.social.facebook = req.body.facebook;
    if(req.body.instagram) profileData.social.instagram = req.body.instagram;
    if(req.body.linkedln) profileData.social.linkedln = req.body.linkedln;
    if(req.body.youtube) profileData.social.youtube = req.body.youtube;
    if(req.body.twitter) profileData.social.twitter = req.body.twitter;

    Profile.findOne({user: req.user.id})
            .then(profile => {
                if(profile){
                    //Update
                    Profile.findOneAndUpdate({user: req.user.id}, {$set: profileData}, {new: true})
                            .then(profile => res.json(profile))
                } else {
                    //Create
                    //Check handle
                    Profile.findOne({handle: profileData.handle})
                        .then(profile => {
                            if(profile){
                                errors.handle = "Handle Already Exists";
                                res.status(400).json(errors);
                            }

                            //Save
                            new Profile(profileData).save().then(profile => res.json(profile))
                        })
                }
            })
});

router.get('/handle/:handle', (req,res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = "There is no profile with this handle"
                    res.status(400).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
});

router.get('/user/:userId', (req,res) => {
    const errors = {};
    Profile.findOne({handle: req.params.userId})
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = "There is no profile with this ID"
                    res.status(400).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json({error: "There is no profile with this ID"}));
});

router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noprofile = "There are no profiles"
            return res.status(404).json(errors)
        }
        res.json(profiles);
    })
    .catch(err => res.status(404).json({error: "There are no profiles"}));
});

router.post('/experience', passport.authenticate('jwt', {sesssion: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
            .then(profile => {
                const newExp = {
                    title: req.body.title,
                    company: req.body.location,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                profile.experience.unshift(newExp);
                profile.save().then(profile => res.json(profile));
            })
});

router.post('/education', passport.authenticate('jwt', {sesssion: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
            .then(profile => {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }

                profile.education.unshift(newEdu);
                profile.save().then(profile => res.json(profile));
            })
});

router.delete('/experience/:id', passport.authenticate('jwt', {sesssion: false}), (req, res) => {
    Profile.findOne({user: req.params.id})
            .then(profile => {
                //Get remove index
                const idx = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.id)

                //Splice it
                profile.experience.splice(idx, 1);
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => req.status(404).json(err));
});

router.delete('/education/:id', passport.authenticate('jwt', {sesssion: false}), (req, res) => {
    Profile.findOne({user: req.params.id})
            .then(profile => {
                //Get remove index
                const idx = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.id)

                //Splice it
                profile.education.splice(idx, 1);
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => req.status(404).json(err));
});

router.delete('/', passport.authenticate('jwt', {sesssion: false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
            .then(() => {
                User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({success: true}));
            })
});

module.exports = router;