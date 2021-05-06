import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import PropTypes from 'prop-types';

const Navbar = ({isAuthenticated, logout}) => {
    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="/">
                <i className="fas fa-sign-out-alt" />{' '}
                <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> Konnect
                </Link>
            </h1>
            <>{isAuthenticated ? authLinks : guestLinks}</>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, {logout})(Navbar);

