const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if(!Validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = "Handle needs to be between 2 an 40 characters";
    }
    if(Validator.isEmpty(data.handle)){
        errors.handle = "Handle is required";
    }
    if(Validator.isEmpty(data.status)){
        errors.status = "Status is required";
    }
    if(Validator.isEmpty(data.skills)){
        errors.skills = "Skills is required";
    }
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = "Not a valid URL"
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = "Not a valid URL"
        }
    }
    if(!isEmpty(data.linkedln)){
        if(!Validator.isURL(data.linkedln)){
            errors.linkedln = "Not a valid URL"
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = "Not a valid URL"
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = "Not a valid URL"
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = "Not a valid URL"
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}