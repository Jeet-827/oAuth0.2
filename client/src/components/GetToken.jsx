import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userSlice';
import { setToken } from '../../redux/slices/tokenSlice';
import Cookies from 'js-cookie';
import axios from 'axios';

const GetToken = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const refreshToken = Cookies.get('refreshToken');

    useEffect(() => {
        const fetchToken = async () => {
            try {
                if (!refreshToken) {
                    return;
                }

                if (token) return;

                const res = await axios.post(
                    'http://localhost:3000/api/auth/token',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                        withCredentials: true,
                    }
                );

                if (res.data.accessToken) {
                    dispatch(setToken(res.data.accessToken));
                    dispatch(setUserInfo(res.data.user));
                }
            } catch (err) {
                console.error(err);
                Cookies.remove('refreshToken');
                window.location.href = '/login';
            }
        };

        fetchToken();
    }, [dispatch, refreshToken, token]);

    return null;
};

export default GetToken;