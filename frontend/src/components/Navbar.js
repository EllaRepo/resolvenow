import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

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
                <Link className='nav-link text-white' to='#' tabindex='-1' >Admin</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <Link className='nav-link text-white' to='/login' onClick={logout}>Logout</Link>
        </li>
    );

    return (
        <nav style={{ backgroundColor: '#B5C0D0' }} className='navbar navbar-expand-lg navbar-light'>
            <Link className='navbar-brand text-white' to='/'>CRM SYS</Link>
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
