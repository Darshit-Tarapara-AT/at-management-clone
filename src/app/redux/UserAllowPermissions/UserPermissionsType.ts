export interface InitialState {
  userPermissions: UserPermissionKeys
  isLoaded: boolean
}
export interface UserPermissionKeys {
    dashboard: {
      list:boolean
      recentTask: boolean
      upcomingBirthday:boolean
      upcomingWorkAnniversary:boolean
      todayOnLeave:boolean
      allOnlineUser:boolean
      lastOfflineUsers:boolean
    }
    user: {
      add: boolean
      edit: boolean
      delete: boolean
      view: boolean
      filter:boolean
      list: boolean
    }
    role: {
      list: boolean
      view: boolean
      delete: boolean
      edit: boolean
      add: boolean
    }
    credential: {
      filter: boolean | undefined
      list: boolean
      view: boolean
      delete: boolean
      edit: boolean
      add: boolean
    }
    permission: {
      list: boolean
      view: boolean
      delete: boolean
      edit: boolean
      add: boolean
    }
    policy: {
      add: boolean
      list: boolean
      edit: boolean
      filter:boolean
      view: boolean
      allhistory: boolean
      history: boolean
      delete: boolean
    }
    lead : {
      add: boolean
      list: boolean
      edit: boolean
      view: boolean
      delete: boolean
      filter: boolean
    },
    client:{
      list: boolean
      filter :boolean
      edit:boolean
      delete:boolean
      view:boolean
    },
    project: {
      list: boolean
      view: boolean
      filter: boolean
      delete: boolean
      edit: boolean
      add: boolean
      editPrivate: boolean
      viewPrivate: boolean
      portfolio: boolean
      archive:boolean
    },
    attendance: {
      correction: boolean
      view: boolean
      add: boolean
      list: boolean
      editCorrection: boolean
      deleteCorrection: boolean
      viewCorrection: boolean
      taskCorrection: boolean
      taskEntry: boolean
      masterList: boolean
      deleteMasterList: boolean
      viewMasterList: boolean
      editMasterList: boolean
    },
    holiday: {
      holidayList: boolean
      addHoliday:boolean
      editHoliday: boolean
      deleteHoliday: boolean
    }
    performance: {
      list:boolean,
      billingWorkHours:boolean,
      filter: boolean
      billingWorkUser:boolean
    },
    profile: {
      view: boolean
      delete: boolean
      edit: boolean
    },
    task: {
      bulkOperation: boolean
      list: boolean
      view: boolean
      delete: boolean
      edit: boolean
      filter: boolean
      add: boolean
      backlogStage: boolean
    },
    ip: {
      view: boolean,
      delete: boolean,
      edit: boolean,
      add: boolean,
      list:boolean
    },
    leave: {
      add: boolean,
      addMaster: boolean,
      addUser: boolean,
      deleteMaster: boolean,
      deleteUser: boolean,
      editMater: boolean,
      editUser : boolean,
      filter: boolean,
      view: boolean,
      List: boolean,
      masterList: boolean,
      userCalender: boolean,
      userList: boolean,
      viewMaster: boolean,
      viewUser: boolean,
    }
}
