const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: false,
        max: 30
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
           title: {
               type: String,
               required: true
           },
           company: {
               type: String,
               required: true
           },
           location: {
               type: String
           },
           from: {
               type: Date,
               required: true
           },
           to: {
               type: Date
           },
           current: {
               type: Boolean,
               default: false
           },
           description: {
               type: String
           }
        }

    ],
    education: [
        {
           school: {
               type: String,
               required: true
           },
           degree: {
               type: String,
               required: true
           },
           field: {
               type: String,
               required: false
           },
           from: {
               type: Date,
               required: true
           },
           to: {
               type: Date
           },
           current: {
               type: Boolean,
               default: false
           },
           description: {
               type: String
           }
        }

    ],
    social: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedln: {
            type: String
        },
        youtube: {
            type: String
        }
    }
}, {timestamps: true});

module.exports = Profile = mongoose.model("profile", ProfileSchema);