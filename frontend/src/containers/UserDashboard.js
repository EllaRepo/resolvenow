import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register_complaint, get_complaints } from '../actions/auth';

const UserDashboard = ({ register_complaint, get_complaints, isAuthenticated, user, compData }) => {
    const [compSubmitted, setCompSubmitted] = useState(false)
    const [usrComplaints, setUsrComplaints] = useState({})
    const [usrCmptFetched, setusrCmptFetched] = useState(0)
    const [showTab, setShowTab] = useState(0)
    const [regData, setregData] = useState([
        'Addis Ababa',
        'Sidama',
        'Amhara'
    ])
    const [ctypes, setCtypes] = useState([
        'Light',
        'Road/Street',
        'Water',
        'Garbage'
    ])
    const [formData, setFormData] = useState({
        compTitle: '',
        city: '',
        subCity: '',
        landmark: '',
        region: '',
        compType: '',
        compSev: '',
        desc: '',
        image: null
    });

    const { compTitle, city, subCity, landmark, region, compType, compSev, desc, image } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileSelect = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }

    const load_complaints = () => {
        get_complaints(user.email);
        if (compData) {
            console.log(compData.data);
            setUsrComplaints(compData.data)
            setusrCmptFetched(1)
        }
    }

    const handle_complaint_status = () => {
        load_complaints();
        if (usrCmptFetched) {
            setShowTab(2);
        }
    }
    useEffect(() => {
        if (!usrCmptFetched) {
            load_complaints();
        }
    }, []);
    const onSubmit = e => {
        e.preventDefault();

        //if (region === 'default')
        //alerUser('region')
        //else if (compType === 'default')
        //alerUser('complaint type')
        // else if (compSev === 'default')
        //alerUser('region')
        // else
        const fData = new FormData();
        fData.append('email', user.email);
        fData.append('compTitle', compTitle);
        fData.append('city', city);
        fData.append('subCity', subCity);
        fData.append('landmark', landmark);
        fData.append('region', region);
        fData.append('compType', compType);
        fData.append('compSev', compSev);
        fData.append('desc', desc);
        fData.append('image', image);

        register_complaint(fData);
        setCompSubmitted(true);
    };

    if (isAuthenticated) {
        //return <Redirect to='/' />
    }

    if (compSubmitted) {
        setFormData({
            'compTitle': '',
            city: '',
            subCity: '',
            landmark: '',
            region: '',
            compType: '',
            compSev: '',
            desc: '',
            image: null
        });
        setCompSubmitted(false);
    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-auto sticky-top'
                        style={{ backgroundColor: '#B5C0D0' }}
                    >
                        <div className='d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top'>
                            <a href='/' className='d-block p-3 link-dark text-decoration-none' title='' data-bs-toggle='tooltip' data-bs-placement='right' data-bs-original-title='Icon-only'>
                                <i className='bi-bootstrap fs-1'></i>
                            </a>
                            <ul className='nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center'>
                                <li className='nav-item'>
                                    <a
                                        href='#'
                                        className='nav-link py-3 px-2'
                                        title=''
                                        data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        onClick={() => setShowTab(1)}
                                    >
                                        Register Complaint
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='nav-link py-3 px-2'
                                        title='' data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        onClick={() => handle_complaint_status()}
                                    >
                                        Complaint Status
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='nav-link py-3 px-2'
                                        title='' data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        onClick={() => setShowTab(3)}
                                    >
                                        My Profile
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='nav-link py-3 px-2' title='' data-bs-toggle='tooltip' data-bs-placement='right' data-bs-original-title='Customers'>
                                        Contact Address
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-sm p-3 min-vh-100 text-white'
                        style={{ backgroundColor: '#CCD3CA' }}
                    >
                        <div className='tab-content container'>
                            <div className={`tab-pane fade show ${showTab === 1 ? 'ml-5 active' : ''}`}>
                                <div className='col-md-6 col-lg-7 d-flex justify-center'>
                                    <div className='container mt-4 card-body p-4 p-lg-5 text-black usr_art '>
                                        <h1>Report Complaint</h1>
                                        <p> Register your Complaint</p>
                                        <form onSubmit={onSubmit}>
                                            <div className='form-group   mb-4'>
                                                <input
                                                    type='text'
                                                    className='form-control form-control-lg'
                                                    placeholder='Complaint Title'
                                                    name='compTitle'
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group mb-4'>
                                                <input
                                                    type='text'
                                                    className='form-control form-control-lg'
                                                    placeholder='City'
                                                    name='city'
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group mb-4'>
                                                <input
                                                    type='text'
                                                    className='form-control form-control-lg'
                                                    placeholder='Sub City'
                                                    name='subCity'
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group mb-4'>
                                                <input
                                                    type='text'
                                                    className='form-control form-control-lg'
                                                    placeholder='Landmark'
                                                    name='landmark'
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group mb-4'>
                                                <select
                                                    id='form2Example27'
                                                    className='form-control form-control-lg'
                                                    name='region'
                                                    onChange={e => onChange(e)}
                                                    required
                                                >
                                                    <option value='default' selected>
                                                        <p className='text-bg-dark'>Select Region</p>
                                                    </option>
                                                    {
                                                        regData.map((reg) => (
                                                            <option value={reg}>{reg}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group mb-4'>
                                                <select
                                                    className='form-control form-control-lg'
                                                    name='compType'
                                                    onChange={e => onChange(e)}
                                                    required
                                                >
                                                    <option value='default' selected>Select Complaint type</option>
                                                    {
                                                        ctypes.map((ctype) => (
                                                            <option value={ctype}>{ctype}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group mb-4'>
                                                <select
                                                    className='form-control form-control-lg'
                                                    name='compSev'
                                                    onChange={e => onChange(e)}
                                                    required
                                                >
                                                    <option value='default' selected>Select Complaint severity</option>
                                                    <option value='Critical' >Critical</option>
                                                    <option value='High'>High</option>
                                                    <option value='Medium'>Medium</option>
                                                    <option value='Low'>Low</option>
                                                    <option value='Informational'>Informational</option>
                                                </select>
                                            </div>
                                            <div className='form-group mb-4'>
                                                <textarea
                                                    type='text'
                                                    className='form-control form-control-lg'
                                                    placeholder='Description'
                                                    name='desc'
                                                    value={desc}
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group mb-4'>
                                                <span>Add your complaint photo </span>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    accept="image/png, image/jpeg"
                                                    onChange={e => handleFileSelect(e)}
                                                    required
                                                />
                                            </div>
                                            <div className='pt-1 mb-4'>
                                                <button
                                                    className='btn btn-dark btn-lg btn-block'
                                                    type='submit'
                                                >
                                                    Register
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className={`tab-pane fade show ${showTab === 2 ? 'active' : ''}`}>
                                {
                                    usrCmptFetched && (
                                        <section className="usr_comps">

                                            {
                                                usrComplaints.map((object) =>
                                                    <article className="usr_art container">
                                                        <div className="headline">
                                                            <h2>Complaint id: {object.id} </h2>
                                                            <div className="comp_status">{object.status}</div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="col comp_detail">
                                                                <p>Complaint Title: {object['compTitle']}</p>
                                                                <p>City: {object['city']}</p>
                                                                <p>Sub-city: {object['subCity']}</p>
                                                                <p>Region: {object['region']} </p>
                                                                <p>Complaint Type: {object['compType']} </p>
                                                                <p>Complaint Severity: {object['compSev']}</p>
                                                            </div>
                                                            <div className='col'>
                                                                <img src={object.image} alt=''></img>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </article>
                                                )
                                            }
                                        </section>)
                                }
                            </div>
                            <div className={`tab-pane fade show ${showTab === 3 ? 'active' : ''}`}>
                                <section className='usr_comps'>
                                    <article className='usr_art'>
                                        <div className='headline'>
                                            <h2>User Profile</h2>
                                        </div>
                                        <div className='comp_detail'>
                                            <p>First Name: {user.first_name} </p>
                                            <p>Last Name: {user.last_name} </p>
                                            <p>email: {user.email} </p>
                                            <p>Phone no: {user.phone} </p>
                                        </div>
                                        <hr />
                                    </article>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    compData: state.auth.data,
});

export default connect(mapStateToProps, { register_complaint, get_complaints })(UserDashboard);
