/* eslint-disable react-hooks/exhaustive-deps */
import { userSignIn } from 'app/redux/AuthSlice/AuthAyscThunk';
import { useAppDispatch } from 'app/redux/store';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from 'app/redux/store';
import { Loader } from 'app/Components/Loader/Loader';
import { getUserToken } from 'services/AuthServices';
import { PATHS } from 'config/paths/paths';

const Validate = () => {
    const param = useParams();
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const token = getUserToken();
    const { isLoading } = useSelector(
        (state: IRootState) => state.AuthStateData
    )

    useEffect(() => {
        const email = param?.email as string
        const otp = param?.otp as string
        const payload = {
            encryptedEmail: email, encryptedOtp: otp
        }
        if(token) {
            navigator('/dashboard');
        }else {
            dispatch(userSignIn(payload)).then((response) => {
                if(response.payload.token) {
                    navigator(PATHS.dashboard.list);
                }
            });
        }
    }, [token])
    return (
        <>
            {isLoading && <Loader />}
        </>
    )
}
export default Validate;
