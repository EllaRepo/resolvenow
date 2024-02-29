import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register_complaint, get_complaints} from '../actions/auth';
const swal = require('sweetalert2');

const UserDashboard = ({ register_complaint, get_complaints, isAuthenticated, user, compData, contAddr }) => {
    const [compSubmitted, setCompSubmitted] = useState(false)
    const [usrComplaints, setUsrComplaints] = useState([''])
    const [contAddrLoaded, setContAddrLoaded] = useState(false)
    const [usrCmptFetched, setusrCmptFetched] = useState(0)
    const [showTab, setShowTab] = useState(0)
    const [regData, setregData] = useState([
        'Addis Ababa',
        'Sidama',
        'Amhara',
        'Tigray',
        'Benshangul',
        'Afar',
        'Harrari',
        'Gambela'
    ])
    const [ctypes, setCtypes] = useState([
        'Light',
        'Road/Street',
        'Water',
        'Garbage',
        'Other'
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
            setUsrComplaints(compData)
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
        if (showTab === 0) {
            setShowTab(1);
        }
  if (!usrCmptFetched) {
            load_complaints();
        }
    }, []);

    const alerUser = data => {
        swal.fire({
            title: 'Please select ' + data,
            icon: 'error',
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        const fData = new FormData();

        if (region === '') {
            alerUser('region')
        } else if (compType === '') {
            alerUser('complaint type')
        } else if (compSev === '') {
            alerUser('region')
        } else {
            fData.append('image', image);
            fData.append('email', user.email);
            fData.append('compTitle', compTitle);
            fData.append('city', city);
            fData.append('subCity', subCity);
            fData.append('landmark', landmark);
            fData.append('desc', desc);
            fData.append('region', region);
            fData.append('compType', compType);
            fData.append('compSev', compSev);

            register_complaint(fData);
            setCompSubmitted(true);
        }
    };

    if (isAuthenticated) {
        //return <Redirect to='/' />
    }

    if (compSubmitted) {
        setFormData({
            ...formData,
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
        setCompSubmitted(false);
    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='sidebar col-sm-auto sticky-top'
                        style={{ backgroundColor: '#35374B' }}
                    >
                        <div className='d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top'>
                            <Link to='#' className='d-block p-3 link-dark text-decoration-none' title='' data-bs-toggle='tooltip' data-bs-placement='right' data-bs-original-title='Icon-only'>
                                <i className='bi-bootstrap fs-1'></i>
                            </Link>
                            <ul className='nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center'>
                                <li className='nav-item'>
                                    <Link
                                        to='#'
                                        className='nav-link py-3 px-2'
                                        title=''
                                        data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        onClick={() => setShowTab(1)}
                                    >
                                        Register Complaint
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='#'
                                        className='nav-link py-3 px-2'
                                        title='' data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        onClick={() => handle_complaint_status()}
                                    >
                                        Complaint Status
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='#'
                                        className='nav-link py-3 px-2'
                                        title='' data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        onClick={() => setShowTab(3)}
                                    >
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='#' className='nav-link py-3 px-2'
                                        title='' data-bs-toggle='tooltip'
                                        data-bs-placement='right'
                                        data-bs-original-title='Customers'
                                        onClick={() => setShowTab(4)}
                                    >
                                        Contact Address
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-sm p-1 min-vh-100 text-white'
                        style={{ backgroundColor: '#35374B' }}
                    >
                        <div className='tab-content container'>
                            <div className={`tab-pane fade show ${showTab === 1 ? 'ml-5 active' : ''}`}>
                                <div className='d-flex justify-content-center'>
                                    <div className='card bg_color2' style={{ borderRadius: '1rem', backgroundColor: '#78A083' }}>
                                        <div className='d-flex align-items-center'>
                                            <div className='card-body p-2 p-lg-4 text-black'>
                                                <div className=''>
                                                    <form className='' onSubmit={e => onSubmit(e)}>
                                                        <div className='d-flex justify-content-center mb-2 pb-1'>
                                                            <div className='d-flex justify-content-center pb-1'>
                                                                <span className='h2 fw-bold mb-0'>Report Complaint</span>
                                                            </div>
                                                        </div>
                                                        <h5
                                                            className='d-flex justify-content-center fw-normal mb-1 pb-3'
                                                        >
                                                            Register your Complaint
                                                        </h5>
                                                        <div className='form-group mb-2'>
                                                            <input
                                                                type='text'
                                                                className='form-control form-control-lg'
                                                                placeholder='Complaint Title'
                                                                name='compTitle'
                                                                value={compTitle}
                                                                maxLength={128}
                                                                onChange={e => onChange(e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='form-group mb-2'>
                                                            <input
                                                                type='text'
                                                                className='form-control form-control-lg'
                                                                placeholder='City'
                                                                name='city'
                                                                value={city}
                                                                maxLength={20}
                                                                onChange={e => onChange(e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='form-group mb-2'>
                                                            <input
                                                                type='text'
                                                                className='form-control form-control-lg'
                                                                placeholder='Sub City'
                                                                name='subCity'
                                                                value={subCity}
                                                                maxLength={20}
                                                                onChange={e => onChange(e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='form-group mb-2'>
                                                            <input
                                                                type='text'
                                                                className='form-control form-control-lg'
                                                                placeholder='Landmark'
                                                                name='landmark'
                                                                value={landmark}
                                                                maxLength={20}
                                                                onChange={e => onChange(e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='form-group mb-2'>
                                                            <select
                                                                className='form-control form-control-lg'
                                                                name='region'
                                                                value={region}
                                                                onChange={e => onChange(e)}
                                                                required
                                                            >
                                                                <option value='default' selected>Select Region</option>
                                                                {
                                                                    regData.map((reg) => (
                                                                        <option value={reg}>{reg}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='form-group mb-2'>
                                                            <select
                                                                className='form-control form-control-lg'
                                                                name='compType'
                                                                value={compType}
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
                                                        <div className='form-group mb-2'>
                                                            <select
                                                                className='form-control form-control-lg'
                                                                name='compSev'
                                                                value={compSev}
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
                                                        <div className='form-group mb-2'>
                                                            <textarea
                                                                type='text'
                                                                className='form-control form-control-lg'
                                                                placeholder='Description'
                                                                name='desc'
                                                                value={desc}
                                                                maxLength={300}
                                                                onChange={e => onChange(e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='form-group mb-2'>
                                                            <span>Add your complaint photo </span>
                                                            <input
                                                                type='file'
                                                                name='image'
                                                                accept='image/png, image/jpeg'
                                                                onChange={e => handleFileSelect(e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className='d-flex justify-content-center pt-1 mt-2'>
                                                            <button
                                                                className='btn btn-primary btn-lg btn-block'
                                                                type='submit'
                                                            >
                                                                Register
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`tab-pane fade show ${showTab === 2 ? 'active' : ''}`}>
                                {
                                    usrCmptFetched && (
                                        <section className='usr_comps'>
                                            {
                                                usrComplaints.map((object) =>
                                                    <article className='usr_art'>
                                                        <div className='headline'>
                                                            <div className='mx-4'>
                                                                <h2>Complaint id: {object['id']} </h2>
                                                            </div>
                                                            <div className=''>
                                                                <span className='comp_status'>{object['status']}</span>
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <div className='row comp_detail'>
                                                                <p>Complaint Title: {object['compTitle']}</p>
                                                                <p>City: {object['city']}</p>
                                                                <p>Sub-city: {object['subCity']}</p>
                                                                <p>Region: {object['region']} </p>
                                                                <p>Complaint Type: {object['compType']} </p>
                                                                <p>Complaint Severity: {object['compSev']}</p>
                                                            </div>
                                                            <div className='row'>
                                                            
                                                            </div>
                                                        </div>
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
                            <div className={`tab-pane fade show ${showTab === 4 ? 'active' : ''}`}>
                                {
                                    contAddr && (
                                        <section className='usr_comps'>
                                            <article className='usr_art'>
                                                <div className='headline'>
                                                    <h2>Contact Addres</h2>
                                                </div>
                                                <div className='comp_detail'>
                                                    <p>Name: {contAddr.name} </p>
                                                    <p>Contact Person: {contAddr.contactPerson} </p>
                                                    <p>email: {contAddr.email} </p>
                                                    <p>Phone no: {contAddr.phone} </p>
                                                </div>
                                                <hr />
                                            </article>
                                        </section>
                                    )
                                }
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
    contAddr: state.auth.addr
});

export default connect(mapStateToProps, { register_complaint, get_complaints })(UserDashboard);
