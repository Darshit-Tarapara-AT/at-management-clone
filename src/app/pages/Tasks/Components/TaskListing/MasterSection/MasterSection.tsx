import { Strings } from 'app/resource/Strings'
import React, { useState } from 'react'
import filterTask from 'app/assets/data/task.json'
import { setFilterListSelectInputOptions } from 'app/utils/helper'
import {  useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { FilterList } from 'app/Components/FilterLIst/FilterLIst'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import { Card } from 'react-bootstrap'
import { AlertMessage, Message } from 'app/utils/AlertMessage'
import { assignMultipleTaskToUserAction, changeMultipleTaskStatusAction, deleteMultipleTaskAction, getAllTasksActions } from 'app/redux/TaskSlice/TaskAsyncThunk'
import { getUserToken } from 'services/AuthServices'
import constant from 'config/const/const'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { getIndividualUProjectAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'

const initialState = {
    employee: [{ id: '', label: Strings.all }],
    status: [{ id: '', label: Strings.status }],
}
const MasterSection = () => {
    const [filterAttr, setFilterAttr] = useState(initialState);
    const dispatch = useAppDispatch()
    const { list: allUsers } = useSelector((state: IRootState) => state.UserStateData)
    const { specificProject, currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData)
    const { checkedTaskId } = useSelector((state: IRootState) => state.TaskStateData)
    const user = allUsers?.filter((item) => {
        const projectTeam = specificProject?.team?.split(",");
        return projectTeam?.includes(`${item?.id}`)
       }).map((item) => {
         return {
           id: item.id,
           label: item.name,
         }
       })

    const filtersOptions = [
        {
            title: 'employee',
            options: user,
            filterKey: 'employee',
            value: filterAttr,
        },
        {
            title: 'Status',
            options: setFilterListSelectInputOptions(filterTask["task.status"]),
            filterKey: 'status',
            value: filterAttr,
        }
    ]
    const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
        setFilterAttr((prevState) => {
            return {
                ...prevState,
                [filterKey]: filterValue,
            }
        })
    }
    const fetchLatestTaskData = () => {
        dispatch(getIndividualUProjectAction({ token: getUserToken(), id: Number(currentProjectId) }))
        dispatch(getAllTasksActions({ token: getUserToken(), page: constant.page.defaultNumber, projectId: currentProjectId?.toString() })).then((res) => {
            if(res?.payload) {
                dispatch(TaskActions.updateDuplicateListWhenBulkOperationComplete(res?.payload?.data));
                return
            }
            dispatch(TaskActions.updateDuplicateListWhenBulkOperationComplete([]))
        })
        dispatch(TaskActions.addSingleTasksInCheckList([]))
    }
    const updateMultiPleStatus = () => {
        dispatch(changeMultipleTaskStatusAction({
            token: getUserToken(),
            status: filterAttr?.status?.[0]?.id,
            taskId: checkedTaskId?.join(',')
        })).then((res) => {
            const data = res?.payload as { status: boolean, message: string }
            if (data?.status) {
                Message(Strings.taskStatusSuccessfullyChanged, "success", "").then((response) => {
                    if (response.isConfirmed) {
                        fetchLatestTaskData()
                    }
                })
            }
            else {
                Message(data.message, "error", "")
            }
        });
    }

    const updateAssignMultipleTaskToUser = () => {
        dispatch(assignMultipleTaskToUserAction({
            token: getUserToken(),
            userId: filterAttr?.employee?.[0]?.id,
            taskId: checkedTaskId?.join(',')
        })).then((res) => {
            const data = res?.payload as { status: boolean, message: string }
            if (data?.status) {
                Message(Strings.taskSuccessfullyAssign, "success", "").then((response) => {
                    if (response.isConfirmed) {
                        fetchLatestTaskData()
                    }
                })
            }
            else {
                Message(data.message, "error", "")
            }
        });
    }

    const handlerSubmit = () => {
        if (checkedTaskId?.length === 0) {
            Message(Strings.pleaseSelectAnyTask, "error", '')
            return
        }
        if (filterAttr?.employee?.[0]?.id && (!filterAttr?.status?.[0].id || filterAttr?.status.length === 0)) {
            updateAssignMultipleTaskToUser()
            return
        }
        if (filterAttr?.status[0]?.id && (!filterAttr?.employee?.[0]?.id || filterAttr?.employee.length === 0)) {
            updateMultiPleStatus()
            return
        }
        dispatch(assignMultipleTaskToUserAction({
            token: getUserToken(),
            userId: filterAttr?.employee?.[0]?.id,
            taskId: checkedTaskId?.join(',')
        })).then((res) => {
            const data = res?.payload as { status: boolean, message: string }
            if (data?.status) {
                updateMultiPleStatus()
            }
        })
    }
    const deleteHandler = () => {
        AlertMessage().then((result) => {
            if (result.isConfirmed) {
               dispatch(deleteMultipleTaskAction({
                token: getUserToken(),
                taskId: checkedTaskId?.join(',')
               })).then((res) => {
                fetchLatestTaskData()
               })
            }
        })
    }
    return (
        <Card className='card-flush mt-6 mt-xl-9 p-0'>
            <div className="card-header align-items-center">
                <div>
                    <button type="button" disabled={checkedTaskId.length === 0} className="btn btn-sm btn-danger" name="delete" value="Delete" wfd-id="id18" onClick={() => deleteHandler()}>
                        {Strings.delete}
                    </button>
                </div>
                <div className="card-toolbar my-1 justify-content-between justify-content-sm-start column-gap-5" data-select2-id="select2-data-164-wp82">
                    <FilterList onFilterSubmit={handlerSubmit} filtersOptions={filtersOptions} onFilterChange={handlerFilterOptions} buttonText={Strings.apply} />
                </div>
            </div>
        </Card>
    )
}

export default MasterSection