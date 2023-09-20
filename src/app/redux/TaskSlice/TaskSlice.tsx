import {createSlice} from '@reduxjs/toolkit'
import {
  addCheckListAction,
  addTaskAction,
  addTaskCorrectionRequestAction,
  dailyTaskSlackNotificationAction,
  editTaskCorrectionRequestAction,
  getAllTasksActions,
  getIndividualTaskAction,
  getSearchTaskAction,
  getSingleTaskEntryAction,
  taskCorrectionRequestAction,
  updateTaskCorrectionRequestStatusAction,
} from './TaskAsyncThunk'
import {
  addTaskActionPayload,
  InitialTaskState,
  SingleTaskEntryResponsePayload,
  TaskEntryCorrectionResponse,
  TaskEntryCorrectionResponsePayload,
} from './TaskType'
import constant from 'config/const/const'
import {PATHS} from 'config/paths/paths'
import {Strings} from 'app/resource/Strings'

const initialState: InitialTaskState = {
  list: [],
  tempList: [],
  isLoading: false,
  taskEntry: [],
  newTaskEntry: [],
  checkedTaskId: [],
  hasEditTaskCorrection: false,
  currentTaskCorrectionEditRow: 1,
  page: constant.page.defaultNumber,
  total: constant.page.defaultTotal,
  specificTask: {
    isTaskRunning: false,
    added_by_username: '',
    id: 0,
    parentTaskName: '',
    parent_task_name: '',
    name: '',
    trackedTime: '',
    assigned_user: 0,
    takenHours: '',
    estimationHours: '',
    deleteItem: false,
    editItem: false,
    viewItem: false,
    end_date: '',
    start_date: '',
    check_list: '',
    percentage: '',
    is_task_billable: 0,
    priority: '',
    task_status: '',
    project_id: 0,
    task_type: '',
    comment: '',
    created_by: null,
    last_updated_by: null,
    created_at: '',
    tracked_time: 0,
    updated_at: '',
    description: '',
    assigned_qa: 0,
    estimated_time: 0,
    parent_id: null,
    project: {
      created_at: '',
      created_by: null,
      image_url: '',
      updated_at: '',
      show_in_portfolio: false,
      logo: '',
      industries: '',
      id: 0,
      tag: '',
      taken_hours: '',
      lastUpdatedBy: { image_url: '', name: '' },
      technologies: '',
      project_type: '',
      color: '',
      description: '',
      tools: '',
      demo_site: '',
      demo_site_credentials: '',
      live_site_url: '',
      live_site_credentials: '',
      name: '',
      short_name: '',
      client_id: '',
      estimation_hours: '',
      project_manager: '',
      team: '',
      progress_status: '',
      client_type: '',
      billing_type: '',
      status: '',
      slack_url: '',
      start_date: '',
      end_date: '',
      added_by_user: {
        id: 0,
        name: '',
        image_url: ''
      },
      updated_by_user: {
        id: 0,
        name: '',
        image_url: ''
      }
    },
    taskchecklist: [],
    added_by_user: {
      id: 0,
      name: '',
      image_url: ''
    },
    updated_by_username: {
      id: 0,
      name: '',
      image_url: ''
    }
  },
  duplicateList: [],
  selectedProjectTaskList: {},
  isTaskCheckListLoading: false,
  selectedProjectId: [],
  nextPageUrl: null,
  isSuccess: false,
  previousActiveTask: 0,
  totalTaskTrackRecords: {
    totalInHours: '',
    totalMinutes: '',
    totalTime: '',
  },
  taskCheckList: [],
  currentTaskPath: PATHS.task.list,
  isTaskSideBarLinkClicked: false,
  error: '',
  hasUserEditTaskEntry: false,
  taskEntryCorrectionList: [],
  previousPageUrl: null,
  activeTaskId: '',
  limit: constant.page.size,
  taskCorrectionList: [],
}
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateSelectedProjectId(state, action) {
      state.selectedProjectId.push(action.payload)
    },
    toggleSideBarMenu(state, action) {
      state.isTaskSideBarLinkClicked = action.payload
    },
    setHasUserEditTaskEntry(state, action) {
      state.hasUserEditTaskEntry = action.payload
    },
    setCurrentTaskCorrectionEditRow(state, action) {
      state.currentTaskCorrectionEditRow = action.payload
    },
    setDynamicallyCurrentPath(state, action) {
      state.currentTaskPath = action.payload
    },
    addNewCheckList(state, action) {
      state.taskCheckList.push(action.payload)
    },
    editAndDeleteCheckList(state, action) {
      state.taskCheckList = action.payload
    },
    updateTaskList(state, {payload}) {
      state.list = payload?.data
      state.total = payload?.total
      state.previousPageUrl = payload.prev_page_url
      state.nextPageUrl = payload.next_page_url
      state.page = payload?.current_page
    },
    setActiveTaskId(state, action) {
      state.previousActiveTask = Number(state.activeTaskId)
      state.activeTaskId = action.payload
    },
    updateHasEditTaskEntryCorrection(state, action) {
      state.hasEditTaskCorrection = action.payload
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    addTasks(state, action: addTaskActionPayload) {
      state.list.push(action.payload)
      state.isLoading = false
    },
    editTasks(state, action) {
      state.list = action.payload
    },
    updateSpecificPTask(state, action) {
      state.specificTask = action.payload
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    editUser(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPage(state, action) {
      state.page = Math.abs(state.page + action.payload.currentPage)
    },
    updateSelectedTask(state, action) {
      state.selectedProjectTaskList = action.payload
    },
    resetState(state) {
      state.isLoading = false
      state.isSuccess = false
      state.taskEntry = []
      state.newTaskEntry = []
      state.tempList = [...state.duplicateList]
    },
    resetErrorState(state) {
      state.error = ''
    },
    updateDuplicateListWhenBulkOperationComplete(state, action) {
      state.duplicateList = action.payload
    },
    addSingleTasksInCheckList(state, action) {
      state.checkedTaskId = action.payload
    },
    selectAllCheckbox(state, action) {
      state.checkedTaskId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksActions.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(getAllTasksActions.fulfilled, (state: InitialTaskState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        if (payload?.data?.length > 0) {
          state.duplicateList = payload?.data
        } else {
          state.list = []
        }
        state.isLoading = false
      })
      .addCase(getAllTasksActions.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
      .addCase(addTaskAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(addTaskAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isLoading = false
      })
      .addCase(addTaskAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
      .addCase(getSearchTaskAction.pending, (state: InitialTaskState) => {})
      .addCase(getSearchTaskAction.fulfilled, (state: InitialTaskState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        } else {
          state.list = []
        }
        state.isLoading = false
      })
      .addCase(getSearchTaskAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
      .addCase(getSingleTaskEntryAction.pending, (state: InitialTaskState) => {})
      .addCase(getSingleTaskEntryAction.fulfilled, (state: InitialTaskState, {payload}) => {
        if (payload?.data) {
          const trackTime = {
            totalInHours: payload.totalInHours,
            totalMinutes: payload.totalMinutes,
            totalTime: payload.totalTime,
          }
          state.taskEntry = [...payload.data]
          state.newTaskEntry = [...payload.new_task_correction]
          state.total = payload?.total
          state.totalTaskTrackRecords = trackTime
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        } else {
          state.list = []
        }
        state.isLoading = false
      })
      .addCase(getSingleTaskEntryAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })

      .addCase(getIndividualTaskAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(getIndividualTaskAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isLoading = false
      })
      .addCase(getIndividualTaskAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
      .addCase(addCheckListAction.pending, (state: InitialTaskState) => {
        state.isTaskCheckListLoading = true
      })
      .addCase(addCheckListAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isTaskCheckListLoading = false
      })
      .addCase(addCheckListAction.rejected, (state: InitialTaskState) => {
        state.isTaskCheckListLoading = false
      })
      .addCase(dailyTaskSlackNotificationAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(dailyTaskSlackNotificationAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isLoading = false
      })
      .addCase(dailyTaskSlackNotificationAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })

      .addCase(taskCorrectionRequestAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(editTaskCorrectionRequestAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(editTaskCorrectionRequestAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isLoading = false
        if (payload) {
          const correctionData = [...state.taskEntryCorrectionList]
          const updateTaskCorrection = correctionData?.map((item) => {
            if (item.id === payload?.id) {
              return {
                ...item,
                ...payload,
              }
            }
            return item
          })
          const findTaskCorrectionIndex = state.taskEntry?.findIndex((item) => Number(item.task_correction[0]?.id) === Number(payload?.id))
          if(findTaskCorrectionIndex !== -1) {
            state.taskEntry[findTaskCorrectionIndex].task_correction = [{...payload}]
          }
          state.taskEntryCorrectionList = updateTaskCorrection
        } else {
          state.taskEntryCorrectionList = []
          state.error = Strings.noMatchFound
          state.total = constant.page.defaultTotal
          state.page = constant.page.defaultNumber
        }
      })
      .addCase(editTaskCorrectionRequestAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
      .addCase(taskCorrectionRequestAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isLoading = false
        if (payload?.data) {
          state.taskEntryCorrectionList = payload?.data
          state.taskCorrectionList = payload?.data
          state.total = payload?.total
          state.page = payload?.current_page
        } else {
          state.taskCorrectionList = []
          state.error = Strings.noMatchFound
          state.total = constant.page.defaultTotal
          state.page = constant.page.defaultNumber
        }
      })
      .addCase(taskCorrectionRequestAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })

      .addCase(updateTaskCorrectionRequestStatusAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(updateTaskCorrectionRequestStatusAction.fulfilled, (state: InitialTaskState, {payload}) => {
        state.isLoading = false
        if (payload?.status) {
          const correctionData = [...state.taskEntryCorrectionList]
          const updateTaskCorrectionList = correctionData?.map((item) => {
            if (item.id === payload?.data?.id) {
              return {
                ...item,
                ...payload?.data,
              }
            }
            return item
          })
          state.taskEntryCorrectionList = updateTaskCorrectionList
        } else {
          state.taskEntryCorrectionList = []
          state.error = Strings.noMatchFound
          state.total = constant.page.defaultTotal
          state.page = constant.page.defaultNumber
        }
      })
      .addCase(updateTaskCorrectionRequestStatusAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
     

      .addCase(addTaskCorrectionRequestAction.pending, (state: InitialTaskState) => {
        state.isLoading = true
      })
      .addCase(addTaskCorrectionRequestAction.fulfilled, (state: InitialTaskState, {payload}) => {
        const response = payload as TaskEntryCorrectionResponsePayload
        if (response?.status) {
          state.taskEntryCorrectionList = response?.data?.data
          state.total = response?.data?.total
          state.page = response?.data?.current_page
        } else {
          state.error = response?.message
        }
        state.isLoading = false
      })
      .addCase(addTaskCorrectionRequestAction.rejected, (state: InitialTaskState) => {
        state.isLoading = false
      })
  },
})

export const TaskReducer = slice.reducer
export const TaskActions = slice.actions
