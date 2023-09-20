import { getUserLeaveCalendarDataAction } from 'app/redux/LeaveSlice/LeaveAyscThunk';
import { IRootState, useAppDispatch } from 'app/redux/store';
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getUserToken } from 'services/AuthServices';


const LeaveLayOut = () => {


    return (
            <Fragment>
                <Outlet />
            </Fragment>
    )
}

export default LeaveLayOut