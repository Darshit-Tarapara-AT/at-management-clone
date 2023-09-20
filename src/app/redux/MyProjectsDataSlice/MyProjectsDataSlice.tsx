import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './MyProjectsDataTypes'
import tasks from 'app/assets/data/task.json';
import { getAllProjectsAction } from './MyProjectsDataAyscThunk';
import constant from 'config/const/const';


interface IShowAssignUsersJSONKey {
  [index:string] : any
}

const initialState: InitialState = {
  isLoading: false,
  isSuccess: false,
  projects: [],
  assignUsers: [],
  limit: constant.page.size,
}

const slice = createSlice({
  name: 'myProjects',
  initialState,
  reducers: {
    resetSuccessState(state) {
      state.isSuccess = false
    },
    showAssignUsers(state, action) {
      const selectedProjectUses:IShowAssignUsersJSONKey = []
      state.assignUsers = selectedProjectUses[action.payload]
    }
  },extraReducers:(builder) => {
    builder
    .addCase(getAllProjectsAction.pending, (state: InitialState) => {
      state.isLoading = true
    })  
    .addCase(getAllProjectsAction.fulfilled, (state: InitialState, { payload }) => {
      if(payload) {
        state.projects = payload?.data;
      }
      else {
        state.projects = []
      }
      state.isLoading = false
    })
    .addCase(getAllProjectsAction.rejected, (state: InitialState) => {
      state.isLoading = false
    })
  }
})

export const myProjectsDataReducer = slice.reducer;
export const myProjectsDataAction = slice.actions;
