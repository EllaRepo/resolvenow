import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
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
                                                        <span className='h2 fw-bold mb-0'>Request Password Reset:</span>
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
                                                        className='form-control form-control-lg'
                                                        type='email'
                                                        placeholder='Email'
                                                        name='email'
                                                        value={email}
                                                        onChange={e => onChange(e)}
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

export default connect(null, { reset_password })(ResetPassword);
