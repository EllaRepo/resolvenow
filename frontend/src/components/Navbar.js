import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import logo from '../assets/images/rlogo.PNG'

const navigateToAdmin = () => {
    window.location.replace('http://127.0.0.1:8000/admin/');
};

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <li className='nav-item active'>
                <Link className='nav-link text-white' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link text-white' to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link text-white' to='/signup'>Sign Up</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link text-white' onClick={navigateToAdmin} tabindex='-1' >Admin</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <Link className='nav-link text-white' to='/login' onClick={logout}>Logout</Link>
        </li>
    );

    return (
        <nav className='navbar navbar-expand-lg bottomBorder'>
            <Link className='navbar-brand text-white' to={isAuthenticated ? '#' : '/'}>
                <img style={{ width: "120px", padding: "6px" }} src={logo} alt="" />
            </Link>

            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                    {isAuthenticated ? authLinks() : guestLinks()}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
