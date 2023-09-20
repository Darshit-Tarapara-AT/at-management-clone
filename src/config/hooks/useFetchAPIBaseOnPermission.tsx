/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from "app/redux/store";
import  { useCallback, useEffect, useState } from "react";

const useFetchAPIBaseOnPermission = <T extends Partial<T>>(
    hasPermission: boolean,
    callBack: Function,
    payload: T,
    isLoaded = false,
    list?: any[],
    total = 1
) => {
    const dispatch = useAppDispatch();
    const [hasLoading, setHasLoading] = useState(false)

    const getCallBack = useCallback(() => {
        dispatch(callBack(payload)).then(() => {
            setHasLoading(false)
        })
    },[dispatch])

    useEffect(() => {
        if (hasPermission && !isLoaded && (!list)) {
            setHasLoading(true);
            getCallBack();
        }
    }, [getCallBack, hasPermission, isLoaded, list]);

    useEffect(() => {
        if (hasPermission && !isLoaded && list && (list?.length < total)) {
            setHasLoading(true);
            getCallBack();
        }
    }, [getCallBack, hasPermission, isLoaded, list, total]);

    return {hasLoading}
}

export default useFetchAPIBaseOnPermission;