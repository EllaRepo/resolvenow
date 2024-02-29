import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <>
            <section className=''>
                <div className='py-4'>
                    <div className='jumbotron mt-6 bg-image text-center shadow-1-strong rounded text-white'>
                        <div className='mt-4 pt-4'>
                            <h1 className='display-4 text-center'>Welcome to ResolveNow!</h1>
                            <h2 className='lead text-center'>Online Complaint Registration Management - OCRM</h2>
                            <hr className='horizontal_line' />
                            <div className='d-flex justify-content-center'>
                                <p className='text-justify w-50 p-3 '>
                                    Welcome to our Complaint Registration Management website! Welcome
                                    understand that voicing your concerns is important, and we're here
                                    to make the process seamless for you. Our user-friendly platform allows
                                    you to register complaints effortlessly ensuring that your feedback reaches
                                    the right channels for prompt resolution. With our advanced tracking system,
                                    you can stay updated on the progress of your complaint, giving you peace of mind.
                                    Join us today and let us help you navigate the path to effective complaint resolution.
                                </p>
                            </div>
                            <p>Click the Login button</p>
                            <Link className='btn btn-primary blue_button btn-sm' to='/login' role='button'>Login</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    </div>
);

export default Home;
