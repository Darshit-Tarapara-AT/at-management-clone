import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { Strings } from 'app/resource/Strings'
import { CustomDefaultTitle } from '../CustomRowTitle/CustomRowTitle'
import moment from 'moment'
import { PATHS } from 'config/paths/paths'

const getCurrentAndYear = () => {
  const date = new Date()
  date?.setMonth(date.getMonth() - 1);
  return `${moment(date)?.format("MMMM yyyy")} ${Strings.salary}`
}
  const masterAttandanceColumns = [
    {
      Header: (props: any) => <CustomHeader tableProps={props} title='No' className='min-w-125px' />,
      accessor: 'index',
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.users} className='min-w-125px' />,
      accessor: 'name',
      Cell: ({...props}) => (
        <CustomDefaultTitle
          title={props.data[props.row.index]?.user_name}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={getCurrentAndYear()} className='min-w-125px' />
      ),
      accessor: 'day',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.salary + " %"}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.actions}className='text-end min-w-100px' />
      ),
      id: 'actions',
      Cell: ({...props}) => {
        const {deleteItem, editItem, viewItem} = props.data[props.row.index]
        const currentDate = new Date()
        currentDate?.setMonth(currentDate.getMonth() - 1);
        const viewAttendancePath = PATHS.attendance.masterAttendanceCalender.replace(":month", `${currentDate.getMonth() + 1}`).replace(":year", `${currentDate.getFullYear()}`).replace(":userId", `${props.data[props.row.index].user_id}`)

        return  ( <CustomActionCell
          deleteItem = {deleteItem} editItem = {editItem} viewItem={viewItem} id={props.data[props.row.index].id} path={viewAttendancePath} />)
      }
    },
  ]

export {masterAttandanceColumns}