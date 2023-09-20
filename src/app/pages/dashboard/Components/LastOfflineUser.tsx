import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import React, {useMemo} from 'react'
import { Card } from 'react-bootstrap'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import { LastOfflineUserColumns } from 'app/Components/CustomTable/CustomColoums/LastOfflineUserColumns'


const LastOfflineUsers = () => {
  const {isLoading, lastOfflineUsers} = useSelector((state: IRootState) => state.DashboardStateDate)
  const rows = useMemo(() => {
    const newList = lastOfflineUsers?.map((item: any) => {
      return {
        ...item,
      }
    })
    return newList
  }, [lastOfflineUsers])

  const columns = React.useMemo(() => LastOfflineUserColumns, [])
  return (
    <>
      <div className='col-xl-6'>
        <Card>
        <ContentTitle title={Strings.lastOffline}/>
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} />}
        </Card>
      </div>
    </>
  )
}
export default LastOfflineUsers
