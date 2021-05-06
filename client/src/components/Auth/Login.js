import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

const Login = ({login, isAuthenticated}) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        errors: {}
    })

    const {email, password, errors} = values;

    const handleChange = name => event => 
        setValues({ ...values, errors: {}, [name]: event.target.value });


    const onSubmit = e => {
        e.preventDefault();
        login({email, password});
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <>
            {/* <div className="alert alert-danger">
                Invalid Credentials
            </div> */}
            <h1 className="large text-primary">
                Sign In
            </h1>
            <p className="lead">
                <i className="fas fa-user">
                    Log In to your Account
                </i>
            </p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input type="email" placeholder="Email" onChange={handleChange('email')} value={email}/>
                    <small className="form-text">
                        This site uses gravatar for profile picture. Use a gravatar email for the same.
                    </small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password"
                    minLength="6" onChange={handleChange('password')} value={password}/>
                </div>
                <input className="btn btn-primary" type="submit" value="Sign In"/>
            </form>
            <p className="my-1">
                Don't have an account?
                <Link to="/register"> Register</Link>
            </p>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { login })(Login);
