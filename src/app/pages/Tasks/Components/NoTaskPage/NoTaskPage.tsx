import { Strings } from 'app/resource/Strings'
import React from 'react'
import darkModeImage from 'app/assets/image/no-task-dark.png'
import lightModeImage from 'app/assets/image/no-task.png'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { Card } from 'react-bootstrap'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { setItem } from 'app/utils/storage'
import { useNavigate } from 'react-router-dom'
import { PATHS } from 'config/paths/paths'

const NoTaskPage = () => {
    const { currentTheme } = useSelector((state: IRootState) => state.UIStateData);
    const { currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData);
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const img = currentTheme === Strings.light ? lightModeImage : darkModeImage;
    
    const navigateToAddTask = () => {
        const addTaskPath = PATHS.task.add.replaceAll(":id", `${currentProjectId}`);
        dispatch(TaskActions.setDynamicallyCurrentPath(addTaskPath));
        setItem("currentPath", addTaskPath);
        navigator(addTaskPath)
    }
    return (
        <Card>
            <div className="card-body">
                <div className="card-px text-center pt-15 pb-15">
                    <h2 className="fs-2x fw-bold mb-0">{Strings.noTasksFound}</h2>
                    <p className="text-gray-400 fs-4 fw-semibold py-7">
                        {Strings.clickOnBelowButtonToCreate} <br />{Strings.aNewTask}
                    </p>
                    <button className="btn btn-primary  fs-6 px-8 py-4" onClick={() => navigateToAddTask()}>
                        {Strings.addNewTask}
                    </button>
                </div>
                <div className="text-center pb-15 px-5">
                    <img src={img} alt="" className="mw-100 h-200px h-sm-325px" />
                </div>
            </div>
        </Card>

    )
}

export default NoTaskPage