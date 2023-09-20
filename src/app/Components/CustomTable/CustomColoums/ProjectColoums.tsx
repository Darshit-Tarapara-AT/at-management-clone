import { HeaderProps } from 'react-table'
import { CustomHeader } from '../CustomHeader/CustomHeader'
import { CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import Logo from '../Logo/Logo'
import { Strings } from 'app/resource/Strings'
import { PropsWithChildren } from 'react'
import { FormikKeys } from 'app/Components/TextArea'
import { generateEditPagePath } from 'app/utils/helper'
import { PATHS } from 'config/paths/paths'
import { convertMinutesToHours } from './TaskColoum'

const ProjectColumns = [
  {
    Header: (props: any) => (
      <CustomHeader
        tableProps={props}
        title={Strings.logoName}
        className='p-0 pb-3 min-w-175px text-start'
      />
    ),
    accessor: 'logo',
    Cell: (props: any) => (
      <Logo
        src={props.data[props.row.index].image_url as string}
        name={props.data[props.row.index].name}
        path={PATHS.project.view.replace(":id", props.data[props.row.index]?.id)}
        technologies={convertKeyToLabel(props.data[props.row.index].technologies?.split(','))}
      />
    ),
  },
  {
    Header: (props: PropsWithChildren<HeaderProps<any>>) => (
      <CustomHeader
        tableProps={props}
        title={Strings.hours}
        className='p-0 pb-3 min-w-100px text-end'
      />
    ),
    id: 'estimationHours',
    Cell: ({ ...props }) => (
      <CustomRowTitle
        title={`${convertMinutesToHours(props.data[props.row.index]?.trackedTime?.toString() || '0')} / ${props.data[
          props.row.index]?.estimation_hours?.toString()} Hours`}
        className={setEstimationHoursBackground(
          props.data[props.row.index]?.trackedTime?.toString(),
          props.data[props.row.index]?.estimation_hours?.toString()
        )}

      />
    ),
  },
  {
    Header: (props: PropsWithChildren<HeaderProps<any>>) => (
      <CustomHeader
        tableProps={props}
        title={Strings.projectStatus}
        className='p-0 pb-3 min-w-175px text-end pe-12'
      />
    ),
    accessor: 'progressStatus',
    Cell: ({ ...props }) => (
      <CustomRowTitle
        title={convertKeyToLabel(props.data[props.row.index]?.progress_status)}
        className={setColumnBackground(props.data[props.row.index]?.progress_status)}
      />
    ),
  },

  {
    Header: (props: PropsWithChildren<HeaderProps<any>>) => (
      <CustomHeader
        tableProps={props}
        title='Actions'
        className='p-0 pb-3 text-end min-w-150px'
      />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      return  (
        <CustomActionCell  deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem}  id={props.data[props.row.index].id} path ={generateEditPagePath(props.data[props.row.index].id, Strings.projectPathKey)} />
      )
    }
  },
]

export const setEstimationHoursBackground = (billableHour: number = 0, totalHours: number = 0) => {
  totalHours = Number(totalHours * 60)
  if (Number(billableHour) < Number(totalHours)) {
    return ('badge-light-success')
  }
  return 'badge-light-danger '
 
}

export const setColumnBackground = (value: string) => {
  switch (value.toLocaleLowerCase().replaceAll(' ', '')) {
    case 'inprogress':
      return 'py-2 px-4 fs-7 badge-light-success'
    case 'onhold':
      return 'py-2 px-4 fs-7 badge-light-danger'
      case 'completed':
        return 'py-2 px-4 fs-7 badge-light-dark'
    case 'waitingtostart':
      return 'py-2 px-4 fs-7 badge-light-primary'
      case 'completedfromourside':
      return 'py-2 px-4 fs-7 badge-light-warning'
      case 'changesonlivesite':
        return 'py-2 px-4 fs-7 badge-light-info'
    default:
      return 'py-2 px-4 fs-7 badge-light-primary'
  }
}

export const convertKeyToLabel = (values: string[] | string) => {
  const strings: FormikKeys = { ...Strings }
  if (Array.isArray(values)) {
    const collectStatusLabel: string[] = values?.map((statusKey: string) => strings[statusKey])
    return collectStatusLabel?.join(', ')
  }
  return strings[values]
}
export { ProjectColumns }
