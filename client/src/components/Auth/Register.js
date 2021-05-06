import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alertAction';
import {register} from '../../actions/authActions';
import PropTypes from 'prop-types';

const Register = ({isAuthenticated, setAlert, register}) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Password and Confirm Password do not match', 'danger');
        } else {
            register({name, email, password});
        }
    };

    if(isAuthenticated){
        return <Redirect to='/dashboard' />;
    }

    return (
        <>
            <h1 className="large text-primary">
                Sign Up
            </h1>
            <p className="lead">
                <i className="fas fa-user">
                    Create Your Account
                </i>
            </p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input type="text" placeholder="Name" onChange={handleChange('name')} value={name}/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email"
                    onChange={handleChange('email')} value={email}/>
                    <small className="form-text">
                        This site uses gravatar for profile picture. Use a gravatar email for the same.
                    </small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password"
                    minLength="6" onChange={handleChange('password')} value={password}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password"
                    minLength="6"
                    onChange={handleChange('password2')} value={password2}/>
                </div>
                <input className="btn btn-primary" type="submit" value="Sign Up"/>
            </form>
            <p className="my-1">
                Already have an account?
                <Link to="/login"> Sign In</Link>
            </p>
        </>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
