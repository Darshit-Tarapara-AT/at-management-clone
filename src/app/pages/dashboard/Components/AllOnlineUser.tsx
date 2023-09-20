import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import { useMemo } from 'react'
import React from 'react'
import { Card } from 'react-bootstrap'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import { AllOnlineUserColumns } from 'app/Components/CustomTable/CustomColoums/AllOnlineUserColumns'

const AllOnlineUser = () => {

  const {isLoading, allOnlineUser} = useSelector((state: IRootState) => state.DashboardStateDate)
  const rows = useMemo(() => {
    const newList = allOnlineUser?.map((item: any) => {
        return {
        ...item,
        }
    })
    return newList
    }, [allOnlineUser])

    const columns = React.useMemo(() => AllOnlineUserColumns, [])
    return (
    <>
      <div className='col-xl-6'>
        <Card>
        <ContentTitle title={Strings.allOnline}/>
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} />}
        </Card>
      </div>
    </>
  )
}
export default AllOnlineUser
