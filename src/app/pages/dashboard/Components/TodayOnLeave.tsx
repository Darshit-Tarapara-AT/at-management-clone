import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import { useMemo } from 'react'
import React from 'react'
import { Card } from 'react-bootstrap'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import { TodayOnLeaveColumns } from 'app/Components/CustomTable/CustomColoums/TodayOnLeaveColumns'

const TodayOnLeave = () => {

  const {isLoading, todayOnLeave} = useSelector((state: IRootState) => state.DashboardStateDate)

  const rows = useMemo(() => {
    const newList = todayOnLeave?.map((item: any) => {
        return {
        ...item,
        }
    })
    return newList
    }, [todayOnLeave])

    const columns = React.useMemo(() => TodayOnLeaveColumns, [])
    return (
    <>
      <div className='col-xl-6'>
        <Card>
        <ContentTitle title={Strings.todayOnLeave}/>
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} />}
        </Card>
      </div>
    </>
  )
}
export default TodayOnLeave
