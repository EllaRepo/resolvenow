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
}
