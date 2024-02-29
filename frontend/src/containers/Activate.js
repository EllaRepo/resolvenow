import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);

    };

    if (verified) {
        return <Redirect to='/login' />
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
                                            <div className='d-flex justify-content-center mb-3 pb-1'>
                                                <div className='d-flex justify-content-center mb-1 pb-1'>
                                                    <span className='h2 fw-bold mb-0'>Verify your Account</span>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center mb-2'>
                                                <button
                                                    className='btn btn-primary'
                                                    type='button'
                                                    onClick={verify_account}>
                                                    Verify
                                                </button>
                                            </div>
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

export default connect(null, { verify })(Activate);
