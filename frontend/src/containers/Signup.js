import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, phone, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, phone, email, password, re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <>
                <section className="">
                    <div className="py-4">
                        <div className=" d-flex justify-content-center align-items-center">
                            <div className="">
                                <div className="card bg_color2" style={{ borderRadius: "1rem", backgroundColor: "#78A083" }}>
                                    <div className="d-flex align-items-center">
                                        <div className="card-body p-2 p-lg-4 text-black">
                                            <form onSubmit={e => onSubmit(e)}>
                                                <div className="d-flex justify-content-center mb-3 pb-1">
                                                    <div className="d-flex justify-content-center mb-1 pb-1">
                                                        <span className="h2 fw-bold mb-0">Sign Up</span>
                                                    </div>
                                                </div>
                                                <h5
                                                    className="d-flex justify-content-center fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Create your Account
                                                </h5>
                                                <div className='form-group mt-4'>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        placeholder='First Name*'
                                                        name='first_name'
                                                        value={first_name}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        placeholder='Last Name*'
                                                        name='last_name'
                                                        value={last_name}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        placeholder='Phone Number*'
                                                        name='phone'
                                                        value={phone}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        className='form-control'
                                                        type='email'
                                                        placeholder='Email*'
                                                        name='email'
                                                        value={email}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        className='form-control'
                                                        type='password'
                                                        placeholder='Password*'
                                                        name='password'
                                                        value={password}
                                                        onChange={e => onChange(e)}
                                                        minLength='8'
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        className='form-control'
                                                        type='password'
                                                        placeholder='Confirm Password*'
                                                        name='re_password'
                                                        value={re_password}
                                                        onChange={e => onChange(e)}
                                                        minLength='8'
                                                        required
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-center my-2">
                                                    <button
                                                        className="btn btn-primary btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                                <p className='mt-2'>
                                                    Already have an account? <Link to='/login'>Sign In</Link>
                                                </p>
                                                <div className='d-flex justify-content-center'>
                                                    <Link to="#" className="small text-muted">
                                                        Terms of use.
                                                    </Link>
                                                    <Link to="#" className="small text-muted">
                                                        Privacy policy
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
