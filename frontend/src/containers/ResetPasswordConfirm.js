import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true)
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <>
                <section className='container mt-4'>
                    <div className='py-4'>
                        <div className=' d-flex justify-content-center align-items-center'>
                            <div className=''>
                                <div className='card bg_color2' style={{ borderRadius: '1rem', backgroundColor: '#78A083' }}>
                                    <div className='d-flex align-items-center'>
                                        <div className='card-body p-2 p-lg-4 text-black'>
                                            <form onSubmit={e => onSubmit(e)}>
                                                <div className='d-flex justify-content-center mb-3 pb-1'>
                                                    <div className='d-flex justify-content-center mb-1 pb-1'>
                                                        <span className='h2 fw-bold mb-0'>Set New Password:</span>
                                                    </div>
                                                </div>
                                                <h5
                                                    className='d-flex justify-content-center fw-normal mb-3 pb-3'
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Please enter your email address
                                                </h5>
                                                <div className='form-outline mb-2'>
                                                    <input
                                                        className='form-control'
                                                        type='password'
                                                        placeholder='New Password'
                                                        name='new_password'
                                                        value={new_password}
                                                        onChange={e => onChange(e)}
                                                        minLength='8'
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group  mb-2'>
                                                    <input
                                                        className='form-control'
                                                        type='password'
                                                        placeholder='Confirm New Password'
                                                        name='re_new_password'
                                                        value={re_new_password}
                                                        onChange={e => onChange(e)}
                                                        minLength='8'
                                                        required
                                                    />
                                                </div>
                                                <div className='d-flex justify-content-center mb-2'>
                                                    <button className='btn btn-primary' type='submit'>Reset Password</button>
                                                </div>

                                                <div className='d-flex justify-content-center'>
                                                    <Link to='#' className='small text-muted'>
                                                        Terms of use.
                                                    </Link>
                                                    <Link to='#' className='small text-muted'>
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
