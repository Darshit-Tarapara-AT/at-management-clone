import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import React, {useMemo} from 'react'
import { Card } from 'react-bootstrap'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import { UpcomingBirthdayColumns } from 'app/Components/CustomTable/CustomColoums/UpcomingBirthdayColumns'


const UpcomingBirthday = () => {
  const {isLoading} = useSelector((state: IRootState) => state.DashboardStateDate)
  const UpcomingBirthdayData = useSelector(
    (state: IRootState) => state.DashboardStateDate.upcomingBirthday
  )

  const rows = useMemo(() => {
    const newList = UpcomingBirthdayData?.map((item: any) => {
      return {
        ...item,
      }
    })
    return newList
  }, [UpcomingBirthdayData])

  const columns = React.useMemo(() => UpcomingBirthdayColumns, [])
  return (
    <>
      <div className='col-xl-6'>
        <Card>
        <ContentTitle title={Strings.upcomingBirthday}/>
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} />}
        </Card>
      </div>
    </>
  )
}
export default UpcomingBirthday
