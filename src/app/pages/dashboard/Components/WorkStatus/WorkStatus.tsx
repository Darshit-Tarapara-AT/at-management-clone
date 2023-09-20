import { Strings } from "app/resource/Strings"
import { useAppDispatch } from "app/redux/store"
import { dailyTaskSlackNotificationAction } from "app/redux/TaskSlice/TaskAsyncThunk"
import { getUserToken } from "services/AuthServices"

const WorkStatus = () => {
    const dispatch = useAppDispatch()
    const userToken = getUserToken()

    const submitHandler = () => {
        dispatch(dailyTaskSlackNotificationAction(userToken)).then((res)=>{
            if (res.payload){
                localStorage.removeItem("login_token")
                window.location.reload()
            }
        })
    }

    return (
        <>
            <button
            type="button"
            style={{marginRight: "36px"}}
            className="btn btn-sm fw-bold btn-secondary"
            onClick={submitHandler}
            >{Strings.submitWorkStatus}</button>
        </>
    )
}

export default WorkStatus