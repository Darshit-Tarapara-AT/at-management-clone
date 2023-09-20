const constant = {
    page: {
        defaultNumber: 1,
        size: 20,
        defaultTotal: 0,
        maxSize: 200,
        defaultCurrentPaginationNumber: 1,
        dashboardPageSize: {
            recentTask: 5,
            todayOnLeave: 0,
            lastOffline: 0,
            allOnline: 0,
            upcomingBirthdays: 5,
            upcomingAnniversary: 5
        },
     role: {
        allRolePageSize: 0,
        defaultRole: 0,
        selectRoleOption: 1
     }
    },
    timer: {
        defaultSearchTimer: 500,
        steps: 60,
        defaultTimeFormat: "12"
    },
    defaultPaginationOption: [
        {label: 20 , id: 20},
        {label: 40 , id: 40},
        {label: 80 , id: 80},
        {label: 100 , id: 100},
    ],
    roles: {
        admin: "admin",
        qa: "qa",
        manager: "manager",
        developer: "developer",
        bde: "bde",
        hr: "hr",
    },
    policy: {
        defaultUserReadPolicyValue: 1,
        userReadPolicyValue: 0
    },
    APIResponse: {
        defaultStratusCode: 200,
        errorStatusCode: 401
    },
    defaultUserId: 0,
    taskPathEndPoints: {
        taskId: ":taskId",
        view: "/view",
        taskAdd: "task-add",
        taskEdit: "/edit",
        taskList: "/task-list"
    },
    task: {
        defaultPercentageValue: "0"
    },
    localStorageKey: {
        email: "EMAIL",
        loginToken: "login_token"
    }
}

export default constant