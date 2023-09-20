import constant from 'config/const/const'
import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'

export async function getAllRecentTasks(
    userToken: string,
    limit= constant.page.dashboardPageSize.recentTask,
    )
    {
        try {
            const payload = {size: limit}
            const response = await appClient.post(
                apiConfig.dashboard.recentTasks, payload,
                {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
            )
            return hasSuccess(response.data)
        } catch (error) {
            return hasError(error)
        }
    }
    export async function getAllUpcomingBirthday(
        userToken: string,
        limit= constant.page.dashboardPageSize.upcomingBirthdays,
        )
        {
            try {
                const payload = {size: limit}
                const response = await appClient.post(
                    apiConfig.dashboard.upcomingBirthday, payload,
                    {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
                )
                return hasSuccess(response.data)
            } catch (error) {
                return hasError(error)
            }
        }
        export async function getAllUpcomingWorkAnniversary(
            userToken: string,
            limit= constant.page.dashboardPageSize.upcomingAnniversary,
            )
            {
                try {
                    const payload = {size: limit}
                    const response = await appClient.post(
                        apiConfig.dashboard.upcomingWorkAnniversary, payload,
                        {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                    )
                    return hasSuccess(response.data)
                } catch (error) {
                    return hasError(error)
                }
            }

            export async function getAllTodayOnLeave(
                userToken: string,
                limit= constant.page.dashboardPageSize.todayOnLeave,
                )
                {
                    try {
                        const payload = {size: limit}
                        const response = await appClient.post(
                            apiConfig.dashboard.todayOnLeave, payload,
                            {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                        )
                        return hasSuccess(response.data)
                    } catch (error) {
                        return hasError(error)
                    }
                }
            export async function getAllOnlineUser(
                userToken: string,
                limit= constant.page.dashboardPageSize.allOnline,
                )
                {
                    try {
                        const payload = {size: limit}
                        const response = await appClient.post(
                            apiConfig.dashboard.allOnlineUser, payload,
                            {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                        )
                        return hasSuccess(response.data)
                    } catch (error) {
                        return hasError(error)
                    }
                }
            export async function getAllLastOfflineUsers(
                userToken: string,
                limit= constant.page.dashboardPageSize.lastOffline,
                )
                {
                    try {
                        const payload = {size: limit}
                        const response = await appClient.post(
                            apiConfig.dashboard.lastOfflineUsers, payload,
                            {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                        )
                        return hasSuccess(response.data)
                    } catch (error) {
                        return hasError(error)
                    }
                }