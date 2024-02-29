import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated, user }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated && user) {
        return <Redirect to='/dashboard' />
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
                                                        <span className="h2 fw-bold mb-0">Login 👋</span>
                                                    </div>
                                                </div>
                                                <h5
                                                    className="d-flex justify-content-center fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Sign into your Account
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        className='form-control form-control-lg'
                                                        type='email'
                                                        placeholder='Email'
                                                        name='email'
                                                        value={email}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form2Example17">
                                                        Email address
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-2">
                                                    <input
                                                        className='form-control form-control-lg'
                                                        type='password'
                                                        placeholder='Password'
                                                        name='password'
                                                        value={password}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="form2Example27">
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <button
                                                        className="btn btn-primary btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                                <p className="" style={{}}>
                                                    Don't have an account?{" "}
                                                    <Link to="/signup" style={{}}>
                                                        Sign Up
                                                    </Link>
                                                </p>
                                                <p className=''>
                                                    Forget your Password? <Link to='/reset-password'>Reset Password</Link>
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
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);
