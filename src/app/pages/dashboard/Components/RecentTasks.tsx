import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import { useMemo } from 'react'
import React from 'react'
import { Card } from 'react-bootstrap'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import { RecentTasksColumns } from 'app/Components/CustomTable/CustomColoums/RecentTasksColumns'

const RecentTasks = () => {
  const RecentTasksData = useSelector((state: IRootState) => state.DashboardStateDate.recentTask)
  const rows = useMemo(() => {
    const newList = RecentTasksData?.map((item: any) => {
      return {
        ...item,
      }
    })
    return newList
  }, [RecentTasksData])

  const columns = React.useMemo(() => RecentTasksColumns, [])
  return (
    <>
      <div className='col-xl-6'>
        <Card>
      <ContentTitle title={Strings.recentTask}/>
        {<CustomTable data={rows || []} columns={columns} />}
        </Card>
      </div>
    </>
  )
}
export default RecentTasks
