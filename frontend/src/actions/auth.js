import axios from 'axios';
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    FETCH_USER_COMPLAINTS_SUCCESS,
    FETCH_USER_COMPLAINTS_FAIL,
    LOGOUT
} from './types';

const useAxios = () => {
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    });

    axiosInstance.interceptors.request.use(async (req, dispatch) => {
        const user = jwtDecode(localStorage.getItem('access'));
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, {
                refresh: localStorage.getItem('refresh')
            });
            dispatch({
                type: REFRESH_SUCCESS,
                payload: res.data
            });

            req.headers.Authorization = `JWT ${localStorage.getItem('access')}`;

            return req;
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL,
            });
        }

    });

    return axiosInstance;
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await useAxios().get(`${process.env.REACT_APP_API_URL}/auth/users/me/`);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const signup = (first_name, last_name, phone, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, phone, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const register_complaint = (formData) => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            const api = useAxios();
            api.defaults.headers['Content-Type'] = 'multipart/form-data';
            const res = await api.post(`${process.env.REACT_APP_API_URL}/auth/postComp/`, formData);
            Swal.fire({
                title: "Complaint registered Successfully!",
                icon: "success",
                toast: true,
                timer: 6000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                title: "Error:" + err.message,
                icon: "error",
                toast: true,
                timer: 6000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
};

export const get_complaints = (email) => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            const api = useAxios();
            const { data } = await api.get(`${process.env.REACT_APP_API_URL}/auth/complaints/${email}`);
            dispatch({
                type: FETCH_USER_COMPLAINTS_SUCCESS,
                payload: data
            })
        } catch (err) {
            dispatch({
                type: FETCH_USER_COMPLAINTS_FAIL
            })
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
};
