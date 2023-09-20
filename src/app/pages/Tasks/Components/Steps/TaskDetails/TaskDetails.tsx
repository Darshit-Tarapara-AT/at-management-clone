import React, {Dispatch, useCallback, useMemo, useState} from 'react'
import './TaskDetails.scss'
import {Strings} from 'app/resource/Strings'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker.css'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import {CheckListKeys, MainTaskDetailsFormProps} from '../../Modal/Modal'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import {TextArea} from 'app/Components/TextArea/TextArea'
import tasks from 'app/assets/data/task.json'
import {convertDateObjectToString, setSelectInputOptions} from 'app/utils/helper'
import {myProjectsDataAction} from 'app/redux/MyProjectsDataSlice/MyProjectsDataSlice'
import CustomDatePicker from 'app/Components/DatePicker/DatePicker'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose, faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Input} from 'baseui/input'
import {AlertMessage} from 'app/utils/AlertMessage'
import {useLocation} from 'react-router-dom'
import constant from 'config/const/const'
import {addCheckListAction, editCheckListItemAction, deleteCheckListItemAction} from 'app/redux/TaskSlice/TaskAsyncThunk'
import {getUserToken} from 'services/AuthServices'
import {TaskActions} from 'app/redux/TaskSlice/TaskSlice'
import { INPUT_KEY, allInputsStyles } from 'config/InputStyles/InputStyles'

interface ModalBodyProps {
  onSave: (payload: CheckListKeys) => void
  value: string
  setInputValue: Dispatch<React.SetStateAction<string>>
  checkedList: CheckListKeys[]
  editId: number
}
const MainTaskDetails: React.FC<MainTaskDetailsFormProps> = ({formik, taskId, ...props}) => {
  const {pathname} = useLocation()
  const [inputValue, setInputValue] = useState('')
  const {userPermissions} = useSelector(
    (state: IRootState) => state.UserPermissionsStateData
  )
  const [editId, setEditId] = useState<number | null>(null)
  const {list, parentTask, specificProject} = useSelector((state: IRootState) => state.ProjectStateData)
  const {taskCheckList} = useSelector((state: IRootState) => state.TaskStateData);
  const [hasAddChecklistClicked, setHasAddChecklistClicked] = useState(false)
  const dispatch = useAppDispatch()
const taskStageOptions = tasks['task.stage']?.filter((item, index) => {
return userPermissions?.task?.backlogStage ? item : index !== 0
});

  const projectList = useMemo(() => {
    return list?.map((item) => {
      return {
        id: item.id,
        label: item.name,
      }
    })
  }, [list])

  const parentTaskOption = useMemo(() => {
    return parentTask?.map((item) => {
      return {
        id: item.id,
        name: item.name,
      }
    })
  }, [parentTask])

  const getTeamMembersDetails = useCallback(() => {
    const selectedProjectDetails = specificProject?.team_members?.map((item) => {
      return {
        id: item?.id,
        name: item?.label,
      }
    })

    return selectedProjectDetails
  }, [specificProject?.team_members])

  const assignerList = useMemo(() => {
    const assignTo = getTeamMembersDetails()
    if (assignTo) {
      return assignTo
    }
    return []
  }, [getTeamMembersDetails])

  const addNewCheckListInAddTaskPage = (checkList: CheckListKeys) => {
    const newCheckList = [...taskCheckList]
    const findCheckItemIndex = taskCheckList.findIndex(({id}) => {
      return Number(id) === Number(editId)
    })
    if (findCheckItemIndex === -1) {
      newCheckList.push(checkList)
    } else {
      newCheckList[findCheckItemIndex] = checkList
      setEditId(null)
    }
    dispatch(TaskActions.editAndDeleteCheckList(newCheckList))
  }
  const updateCheckList = (checkList: CheckListKeys) => {
    dispatch(TaskActions.editAndDeleteCheckList(checkList))
    setEditId(null)
  }

  const handlerSubmitCheckList = (payload: CheckListKeys) => {
    if (taskId) {
      if (editId) {
        dispatch(
          editCheckListItemAction({
            token: getUserToken(),
            taskId: taskId,
            name: payload.name,
            checkListId: editId
          })
        ).then((response) => {
          updateCheckList(response?.payload)
        })
        return
      }
      dispatch(
        addCheckListAction({
          token: getUserToken(),
          taskId: taskId,
          name: payload.name,
        })
      ).then((response) => {
        updateCheckList(response?.payload)
      })
    } else {
      addNewCheckListInAddTaskPage(payload)
    }
  }

  const handlerChecked = (checked: boolean, id: number) => {
    const duplicateCheckList = [...taskCheckList]
    const newCheckList = duplicateCheckList.map((item) => {
      if (item.id === id && checked) {
        return {
          ...item,
          is_checked: 1,
        }
      }
      if (item.id === id && !checked) {
        return {
          ...item,
          is_checked: 0,
        }
      }
      return item
    })
    dispatch(TaskActions.editAndDeleteCheckList(newCheckList))
  }
  const deleteCheckListInAddTaskPage = (id: number) => {
    const newCheckList = taskCheckList.filter((item) => {
      return item.id !== id
    })
    dispatch(TaskActions.editAndDeleteCheckList(newCheckList))
  }

  const deleteCheckListHandler = (id: number) => {
    AlertMessage().then((result) => {
      if (result.isConfirmed) {
        if (taskId) {
          dispatch(
            deleteCheckListItemAction({
              token: getUserToken(),
              taskId: taskId,
              checkListId: id,
            })
          ).then((response) => {
            dispatch(TaskActions.editAndDeleteCheckList(response?.payload))
            setEditId(null)
          })
          return
        }
        deleteCheckListInAddTaskPage(id)
      }
    })
  }

  const editCheckListHandler = (id: number) => {
    setHasAddChecklistClicked(true)
    setEditId(id)
    const newCheckList = taskCheckList.find((item) => {
      return item.id === id
    })
    if (newCheckList) {
      setInputValue(newCheckList?.name)
    }
  }

  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <CustomInput
            type='text'
            placeHolder={`${Strings.enter}${Strings.name}`}
            formilk={formik}
            name={props.name}
            label={Strings.name}
            value={formik.values.name}
            onBlur={() => props.handlerBlurEvent(props.name)}
          />

          <TextArea
            formik={formik}
            name={props.description}
            isRequired={false}
            label={`${Strings.enter}${Strings.description}`}
            onBlur={() => props.handlerBlurEvent(props.description)}
          />
          <SelectInput
            name={props.project}
            formik={formik}
            isMulti={false}
            onBlur={() => {
              props.handlerBlurEvent(props.project)
              if(formik.values.project?.length ===0) {
                formik.setFieldValue(props.QA, [])
                formik.setFieldValue(props.assignTo, [])
              }
              dispatch(myProjectsDataAction.showAssignUsers(formik.values.project))
            }}
            label={Strings.project}
            options={projectList}
            optionTitle='label'
            optionValue='id'
          />
          <SelectInput
            name={props.assignTo}
            formik={formik}
            isMulti={false}
            onBlur={() => props.handlerBlurEvent(props.assignTo)}
            label={Strings.assignedTo}
            options={
              formik.values.project.length === 0 ? [{id: '', name: 'Select Project'}] : assignerList
            }
            optionTitle='name'
            optionValue='id'
          />
          <SelectInput
            name={props.QA}
            formik={formik}
            isMulti={false}
            onBlur={() => props.handlerBlurEvent(props.QA)}
            label={Strings.qa}
            options={
              formik.values.project.length === 0 ? [{id: '', name: 'Select Project'}] : assignerList
            }
            optionTitle='name'
            optionValue='id'
          />
          <SelectInput
            name={props.parentTask}
            isRequired={false}
            formik={formik}
            isMulti={false}
            onBlur={() => props.handlerBlurEvent(props.parentTask)}
            label={Strings.parentTask}
            options={parentTaskOption}
            optionTitle='name'
            optionValue='id'
          />

          <CustomDatePicker
            onBlur={props.handlerBlurEvent}
            label={Strings.startDate}
            title={Strings.startDate}
            formik={formik}
            isRequired={false}
            name={props.startDate}
          />
          <CustomDatePicker
            title={Strings.endDate}
            formik={formik}
            label={Strings.endDate}
            isRequired={false}
            name={props.endDate}
            onBlur={props.handlerBlurEvent}
            min={
              Array.isArray(formik.values.startDate)
                ? convertDateObjectToString(formik.values.startDate)
                : formik.values.startDate
            }
          />
          <CustomInput
            type='number'
            label={Strings.estimatedTime}
            placeHolder={Strings.enterEstimatedTimeInMinutes}
            onBlur={props.handlerBlurEvent}
            formilk={formik}
            name={props.estimatedTime}
            value={formik.values.estimatedTime}
          />
          {pathname.includes(constant.taskPathEndPoints.taskEdit) && (
            <div className='row mb-6 align-items-center'>
              <label className='col-lg-4 col-form-label fw-bold fs-6 required'>
                {Strings.trackedTime}
              </label>
              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6 text-gray-800'>
                  {formik.values.trackedTime ? `${formik.values.trackedTime} ${Strings.hours}` : ''}
                </span>
              </div>
            </div>
          )}

          <CustomInput
            type='text'
            label={Strings.percentage}
            placeHolder={`${Strings.enter}${Strings.percentage}`}
            onBlur={props.handlerBlurEvent}
            formilk={formik}
            name={props.percentage}
            value={formik.values.percentage}
          />

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6' htmlFor={props.isTaskBillable}>
              {Strings.isTaskBillable}
            </label>
            <div className='col-lg-8 fv-row mt-2'>
              <label className='form-check form-check-custom form-check-solid me-9'>
                <input
                  className='form-check-input me-3 '
                  name={props.isTaskBillable}
                  value={props.isTaskBillable}
                  type={'checkbox'}
                  id={props.isTaskBillable}
                  checked={formik.values.isTaskBillable}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
          </div>
          <SelectInput
            name={props.priority}
            formik={formik}
            isMulti={false}
            label={Strings.priority}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.priority)}
            options={setSelectInputOptions(tasks['task.priority'])}
            optionTitle='name'
            optionValue='id'
          />
          <SelectInput
            name={props.status}
            formik={formik}
            isMulti={false}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.status)}
            label={Strings.taskStage}
            options={setSelectInputOptions(taskStageOptions)}
            optionTitle='name'
            optionValue='id'
          />
          <SelectInput
            name={props.type}
            formik={formik}
            isRequired={true}
            isMulti={false}
            onBlur={() => props.handlerBlurEvent(props.type)}
            label={Strings.taskType}
            options={setSelectInputOptions(tasks['task.type'])}
            optionTitle='name'
            optionValue='id'
          />
          <TextArea
            formik={formik}
            name={props.comment}
            isRequired={false}
            label={`${Strings.enter}${Strings.comment}`}
            onBlur={() => props.handlerBlurEvent(props.comment)}
          />
          <div className='row'>
            <label className='col-lg-4 col-form-label fw-semibold fs-6'>
              <span>{Strings.checkList}</span>
            </label>
            <div className='col-lg-8 fv-row d-flex justify-content-between mt-5'>
              <div className='col-9'>
                {taskCheckList?.length > 0 &&
                  taskCheckList?.map((item) => {
                    return (
                      <div className='row mb-5'>
                        <div className='col-lg-9 d-flex align-items-center'>
                          <label className='form-check form-check-custom form-check-solid me-9 mb-3'>
                            <input
                              disabled={!pathname.includes(constant.taskPathEndPoints.taskEdit)}
                              onChange={(e) => handlerChecked(e.target.checked, item?.id)}
                              className='form-check-input me-3'
                              type='checkbox'
                              value=''
                              checked={item.is_checked === 1 ? true : false}
                              wfd-id='id24'
                            />
                            {item.name}
                          </label>
                        </div>
                        <div className='col-lg-3'>
                          <span
                            onClick={() => editCheckListHandler(item.id)}
                            className='btn btn-icon border border-success btn-color-success btn-sm me-1 action-btn'
                            title={Strings.edit}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className='svg-icon svg-icon-3'
                              title={Strings.edit}
                            />
                          </span>
                          <span
                            onClick={() => deleteCheckListHandler(item.id)}
                            className='btn btn-icon border border-danger btn-color-danger btn-sm me-1 action-btn'
                            title={Strings.delete}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className='svg-icon svg-icon-3'
                              title={Strings.delete}
                            />
                          </span>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className='col-3 text-end'>
                <span>
                  {hasAddChecklistClicked ? (
                    <FontAwesomeIcon
                      icon={faClose}
                      className='ki-duotone ki-plus fs-2x cursor'
                      onClick={() => setHasAddChecklistClicked(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlus}
                      className='ki-duotone ki-plus fs-2x cursor'
                      onClick={() => setHasAddChecklistClicked(true)}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
          {hasAddChecklistClicked && (
            <ModalBody
              editId={editId!}
              checkedList={taskCheckList}
              onSave={handlerSubmitCheckList}
              value={inputValue}
              setInputValue={setInputValue}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const ModalBody: React.FC<ModalBodyProps> = ({
  onSave,
  value,
  setInputValue,
  checkedList,
  editId,
}) => {
  const {isTaskCheckListLoading} = useSelector((state: IRootState) => state.TaskStateData);
  const {currentTheme} = useSelector((state: IRootState) => state.UIStateData)
  const handlerAdd = () => {
    const randomId = Math.random().toFixed(2)
    let payload: CheckListKeys = {
      id: Number(randomId),
      name: value,
      is_checked: 0,
    }
    if (editId) {
      const findAddedCheckItem = checkedList?.find((item) => item.id === editId)
      payload = {
        ...payload,
        id: findAddedCheckItem?.id!,
        is_checked: findAddedCheckItem?.is_checked!,
        name: value,
      }
    }
    onSave(payload)
    setInputValue('')
  }
  return (
    <>
      <div className='row mt-6'>
        <label className='col-lg-4  col-form-label'></label>
        <div className='col-lg-7'>
          <Input
            type='text'
            name={'inputValue'}
            onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
            value={value}
            placeholder={Strings.title}
            onChange={(e) => setInputValue(e.target.value)}
            overrides={{
              ...allInputsStyles(currentTheme, INPUT_KEY)
            }}
          />
        </div>
        <div className='col-lg-1'>
          <button
            type='button'
            aria-disabled={isTaskCheckListLoading}
            disabled={!value || isTaskCheckListLoading}
            className='d-flex justify-end btn btn-primary'
            onClick={handlerAdd}
          >
            {isTaskCheckListLoading ? (
              <span className='spinner-border spinner-border-md align-middle '></span>
            ) : (
              Strings.save
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default MainTaskDetails
