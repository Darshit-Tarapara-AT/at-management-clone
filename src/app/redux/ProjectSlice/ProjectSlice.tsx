import { createSlice } from '@reduxjs/toolkit'
import { Strings } from 'app/resource/Strings';
import { getAllProjectsAction, getAllProjectsParentTaskAction, getIndividualUProjectAction, getSearchProjectsAction } from './ProjectAyscThunk';
import { addLeadActionPayLoad, InitialProjectState } from './ProjectTypes'
import constant from 'config/const/const';
const initialSpecificProject =
{
  name: "",
  short_name: "",
  client_id: "",
  estimation_hours: "",
  project_manager: "",
  team: '',
  progress_status: "",
  client_type: "",
  billing_type: "",
  taken_hours: "",
  status: "",
  slack_url: "",
  start_date: '',
  end_date: '',
  show_in_portfolio: false,
  logo: "",
  industries: "",
  id: 0,
  technologies: "",
  project_type: "",
  color: "",
  tag: "",
  description: "",
  tools: "",
  demo_site: "",
  demo_site_credentials: "",
  live_site_url: "",
  live_site_credentials: "",
  added_by_user: {id: 0, name: '', image_url: ''},
  updated_by_user: {id: 0, name: '', image_url: ''},
}
const initialState: InitialProjectState = {
  list: [],
  isLoading: false,
  currentProjectId: "",
  tempList: [],
  page: constant.page.defaultNumber,
  total: constant.page.defaultTotal,
  nextPageUrl: null,
  isSuccess: false,
  parentTask: [],
  isError: false,
  isProjectSideBarLinkClicked: false,
  error: '',
  duplicateList: [],
  previousPageUrl: null,
  limit: constant.page.size,
  specificProject: initialSpecificProject,
  status: '',
}
const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    toggleSideBarMenu(state, action) {
      state.isProjectSideBarLinkClicked = action.payload;
    },
    hasError(state, action) {
      state.isError = action.payload;
    },
    projectStatus(state, action) {
      state.status = action.payload;
    },
    addProject(state, action: addLeadActionPayLoad) {
      state.list.push(action.payload)
      state.isLoading = false
    },
    editProject(state, action) {
      state.list = action.payload
    },
    setTotalProjects(state, action) {
      state.total = action.payload
    },
    resetSpecificProjects(state) { 
      state.specificProject = initialSpecificProject
    },
    getCurrentProjectId(state, action) {
      state.currentProjectId = action.payload
    },
    updateSpecificProject(state, action) {
      state.specificProject = action.payload
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
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
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.list = [...state.duplicateList];
    },
    resetErrorState(state) {
      state.specificProject = initialSpecificProject
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsAction.pending, (state: InitialProjectState) => {
        state.isLoading = true
      })
      .addCase(getAllProjectsAction.fulfilled, (state: InitialProjectState, { payload }) => {
        if (payload) {
          state.limit = payload?.per_page
          state.list = payload?.data
          state.total = payload?.total
          state.previousPageUrl = payload.prev_page_url
          state.duplicateList = payload?.data
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        else {
          state.list = []
        }
        state.isLoading = false
      }).addCase(getAllProjectsAction.rejected, (state: InitialProjectState) => {
        state.isLoading = false
      }).addCase(getSearchProjectsAction.pending, (state: InitialProjectState) => {
      })
      .addCase(getSearchProjectsAction.fulfilled, (state: InitialProjectState, { payload }) => {
        
        if (payload) {
      
          state.list = payload?.data
          state.total = payload?.total
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
          state.limit = payload?.per_page
        }
        else {
          state.list = []
          state.error = Strings.noMatchFound
          state.limit = constant.page.size;
          state.total = constant.page.defaultTotal;
          state.page = constant.page.defaultNumber
        }
        state.isLoading = false
      })
      .addCase(getSearchProjectsAction.rejected, (state: InitialProjectState) => {
        state.isLoading = false
      })
      .addCase(getIndividualUProjectAction.pending, (state: InitialProjectState) => {
        state.isLoading = true

      })
      .addCase(getIndividualUProjectAction.fulfilled, (state: InitialProjectState, { payload }) => {
        if (payload?.status) {
          state.specificProject = payload?.data
          state.isError = false
          state.isLoading = false
          return
        }
        state.isError = true
        state.isLoading = false
      }).addCase(getIndividualUProjectAction.rejected, (state: InitialProjectState) => {
        state.isLoading = false
      })
      .addCase(getAllProjectsParentTaskAction.pending, (state: InitialProjectState) => {
        state.isLoading = true
      })
      .addCase(getAllProjectsParentTaskAction.fulfilled, (state: InitialProjectState, { payload }) => {
          state.parentTask = payload
          state.isLoading = false
      }).addCase(getAllProjectsParentTaskAction.rejected, (state: InitialProjectState) => {
        state.isLoading = false
      })
  }
})

export const ProjectReducer = slice.reducer
export const ProjectActions = slice.actions
