export interface DashboardResponsePayload {}

export interface RecentTasks {
  task?: string
  image?: string
  action?: string
  technology?: string
}
export interface upcomingBirthday {
  name?: string
  image?: string
  date?: string
}
export interface upcomingWorkAnniversary {
  name?: string
  image?: string
  date?: string
}

export interface todayOnLeave {
  name?: string
  image?: string
}

export interface allOnlineUser {
  name?: string
  image?: string
  time?: string
}

export interface lastOfflineUsers {
  name?: string
  image?: string
  date?: string
}

export interface InitialDashboardState {
  dashboard: any
  recentTask: RecentTasks[]
  upcomingBirthday: upcomingBirthday[]
  upcomingWorkAnniversary: upcomingWorkAnniversary[]
  todayOnLeave:todayOnLeave[]
  allOnlineUser: allOnlineUser[]
  lastOfflineUsers:lastOfflineUsers[]
  isLoading: boolean
}

export interface DashboardResponseFields {
  recentTask: RecentTasks
  upcomingBirthday: upcomingBirthday
  upComingWorkAnniversary: upcomingWorkAnniversary
  todayOnLeave:todayOnLeave
  allOnlineUser: allOnlineUser
  lastOfflineUsers:lastOfflineUsers
}
