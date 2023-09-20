import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import { useMemo } from 'react'
import React from 'react'
import { Card } from 'react-bootstrap'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import { UpcomingWorkAnniversaryColumns } from 'app/Components/CustomTable/CustomColoums/UpcomingWorkAnniversaryColumns'

const UpcomingWorkAnniversary = () => {

  const {isLoading} = useSelector((state: IRootState) => state.DashboardStateDate)
  const UpcomingWorkAnniversaryData = useSelector(
    (state: IRootState) => state.DashboardStateDate.upcomingWorkAnniversary
  )

  const rows = useMemo(() => {
    const newList = UpcomingWorkAnniversaryData?.map((item: any) => {
        return {
        ...item,
        }
    })
    return newList
    }, [UpcomingWorkAnniversaryData])

    const columns = React.useMemo(() => UpcomingWorkAnniversaryColumns, [])
    return (
    <>
      <div className='col-xl-6'>
        <Card>
        <ContentTitle title={Strings.upcomingWorkAnniversary}/>
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} />}
        </Card>
      </div>
    </>
  )
}
export default UpcomingWorkAnniversary
