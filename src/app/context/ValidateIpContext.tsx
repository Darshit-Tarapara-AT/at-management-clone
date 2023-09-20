/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import api from 'config/api';
import React, { createContext, useContext, useEffect , useState } from 'react'
import config from 'config/config';
import { ipActions } from 'app/redux/ipAddressSlice/ipAddressSlice';
import { Loader } from 'app/Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { getUserToken } from 'services/AuthServices';
import { IRootState, useAppDispatch } from 'app/redux/store';
import { useSelector } from 'react-redux';
import { PATHS } from 'config/paths/paths';

interface ValidateIpProps {
    children: React.ReactNode
    pathname: string
}
interface ValidateContextProps {
    status: string,
    isIpValid: boolean
}
const validateIPContext = createContext<ValidateContextProps>({
    status: '',
    isIpValid: false
})
const ValidateIPProvider: React.FC<ValidateIpProps> = ({
    children,
    pathname
}) => {
    const [status, setStatus] = useState<string>('pending');
    const [isIpValid, setIpValid] = useState<boolean>(false)
    const { isLoaded } = useSelector((state: IRootState) => state.UserPermissionsStateData);
    const { isCurrentUserDataFetch } = useSelector((state: IRootState) => state.UserStateData);
    const navigator = useNavigate();
    const dispatch = useAppDispatch()
    const token = getUserToken();

    useEffect(() => {
        axios.get(config.getIpAddressUrl).then((response) => {
            setStatus('processing');
            dispatch(ipActions.updateIpAddress(response?.data?.ipString))
            axios.get(config.apiUrl + PATHS.home + api.ip.validate + '?ip_address=' + response?.data?.ipString).then((res) => {
                if (!res?.data?.status) {
                    setIpValid(false);
                    setStatus('error');
                    navigator(PATHS.auth.unauthorizedAccess)
                }else {
                    setIpValid(true);
                    setStatus('success');
                }
            })
        })
        return () => {
            setStatus('pending');
            setIpValid(false);
        }
    }, [pathname, token])
    return (
        <validateIPContext.Provider value={{
            status,
            isIpValid
        }}>
        {(status === 'processing' || isLoaded || isCurrentUserDataFetch) && <Loader/>}
        {status === 'success'  && children}
        </validateIPContext.Provider>
    )
}

const useValidateContext = () => {
    return useContext(validateIPContext)
}
export {useValidateContext}

export default ValidateIPProvider