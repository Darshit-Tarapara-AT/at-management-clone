const PATHS = {
    dashboard: {
        list:"/dashboard",
    },
    performance: {
        list:"/performance",
        billingWorkHours:"/billing-works",
        billingWorkUser:"/billing-work-users"
    },
    home: "/",
    auth: {
        login: "/login",
        unauthorizedAccess: "/unauthorized-access"
    },
    role: {
        list: "/roles",
        add: "/roles/add",
        edit: "/role/:id/edit",
    },
    credential: {
        list: "/credentials",
        add: "/credential/add",
        edit: "/credential/:id/edit",
        view: "/credential/:id/view"
    },
    permission: {
        list: "/permissions",
        add: "/permission/add",
        edit: "/permission/:id/edit",
    },
    user: {
        list: "/users",
        add: "/user/add",
        edit: "/user/:id/edit",
        view: '/user/:id/view'
    },
    leave: {
        myList: "/leaves/list/my",
        masterList: "/leaves/master/list",
        edit: "/leave/:id/edit",
        add: "/leave/add" ,
        view: "/leave/:id/view",
        userCalender: "/leave/:month/:year",
    },
    policy: {
        list: "/policy",
        add: "/policy/add",
        edit: "/policy/:id/edit",
        view: '/policy/:id/view',
        history: '/policy/history',
        viewHistory: "/policy/history/:id/view"
    },
    lead: {
        list: "/leads",
        add: "/lead/add",
        edit: "/lead/:id/edit",
        view: '/lead/:id/view',
    },
    client: {
        list: "/clients",
        add: "/client/add",
        edit: "/client/:id/edit",
        view: '/client/:id/view',
    },
    project: {
        list: "/projects",
        add: "/project/add",
        edit: "/project/:id/general-details",
        editPrivateDetails: "/project/:id/private-details",
        activity: "/project/:id/activity",
        users: "/project/:id/users",
        files: "/project/:id/files",
        view: '/project/:id/details',
        editViewLayoutPath: "/project/:id/*",
        portfolio: "/project/portfolio",
        archive:"project/archive"
    },
    task: {
        list: "/project/:id/task-list",
        add: "/project/:id/task-add",
        edit: "/project/:id/task/:taskId/edit",
        view: '/project/:id/task/:taskId/view',
    },
    attendance:{
        list: '/attendance/correction',
        attendance: "/attendance/:month/:year",
        taskEntry: '/attendance/task-entry/:date/:month/:year/view',
        correction: "/attendance/correction",
        masterList: '/attendance/master-list',
        edit: '/attendance/:id/edit',
        masterAttendanceCalender: '/attendance/user/:userId/date/:month/:year/view',
        masterTaskEntry: '/attendance/task-entry/user/:userId/date/:date/:month/:year/view',
        holiday: {
            list: "/attendance/holiday",
            edit: "/attendance/holiday/:id/edit",
            add:"/attendance/holiday/add"
        }
    },
    ip: {
        list: "/ip-address",
        add: "/ip-address/add",
        edit: "/ip/:id/edit",
    },
    profile: {
        view: "/my-profile"
    },
    notFound: "/not-found"
}
export {PATHS}