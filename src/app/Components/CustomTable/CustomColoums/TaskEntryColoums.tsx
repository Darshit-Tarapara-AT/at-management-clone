import {Column} from 'react-table'
import {CustomHeader} from '../CustomHeader/CustomHeader'
import {SingleTaskEntryResponsePayload} from 'app/redux/TaskSlice/TaskType'
import {CustomDefaultTitle} from '../CustomRowTitle/CustomRowTitle'
import {Strings} from 'app/resource/Strings'
import moment from 'moment'
import Style from 'config/colors/colors'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {TimePicker} from 'baseui/timepicker'
import {FILTER_SELECT_INPUT, INPUT_KEY, SELECT_INPUT_KEY, TEXT_AREA_KEY, TIMER_PICKER_INPUT, allInputsStyles} from 'config/InputStyles/InputStyles'
import {store} from 'app/redux/store'
import {Select} from 'baseui/select'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import { Fragment } from 'react'

const convertToTimeFormat = (data: string) => {
  const isNumber = /[0-9]/gi.test(data)
  if (!isNumber) {
    return data
  }
  if (!data || !isNumber) {
    return '  '
  }
  return moment(new Date(data))?.format('LT')
}

const capitalizeEndLabel = (data: string) => {
  const splitData = data?.split(' ')
  const firstLetter = splitData[1]?.charAt(0)
  return splitData[0] + splitData[1]?.replace(firstLetter, firstLetter.includes('m') ? ' M' : ' H')
}

const hasCurrentIndexNumberOne = (indexNumber: number, currentIndexNumber: number) => {
return currentIndexNumber === indexNumber
}
const getTaskEntryColumn = (
  projectOptions: SelectInputValue[],
  taskOptions: SelectInputValue[],
  hasCorrectUIShow: boolean,
  currentTheme: string,
  onEditTaskEntryClick: (indexNumber: number) => void,
) => {

  return  (
    [
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title={Strings.no} className='min-w-40px' />
        ),
        accessor: 'index',
      },
      {
        Header: (props: any) => (
          <CustomHeader
            tableProps={props}
            title={Strings.startTime}
            className='min-w-150px'
          />
        ),
        accessor: 'start_time',
        Cell: ({...props}) => {
          return (
            <>
              <div className='d-flex align-items-center'>
                <div className='d-flex justify-content-start flex-column'>
                  <CustomDefaultTitle
                    isCapitalizeFirstLetterRequired={false}
                    title={convertToTimeFormat(props.data[props.row.index]?.start_time)}
                  />
                </div>
              </div>
            </>
          )
        },
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title={Strings.endTime} className='min-w-125px' />
        ),
        accessor: 'end_time',
        Cell: ({...props}) => {
          return (
            <>
              <div className='d-flex align-items-center'>
                <div className='d-flex justify-content-start flex-column'>
                  <CustomDefaultTitle
                    isCapitalizeFirstLetterRequired={false}
                    title={convertToTimeFormat(props.data[props.row.index]?.end_time)}
                  />
                </div>
              </div>
            </>
          )
        },
      },
  
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title={Strings.project} className='min-w-125px' />
        ),
        accessor: 'project_name',
        Cell: ({...props}) => {
          return (
            <>
              <div className='d-flex align-items-center'>
                <div className='d-flex justify-content-start flex-column'>
                  <CustomDefaultTitle title={props.data[props.row.index]?.project_name} />
                </div>
              </div>
            </>
          )
        },
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title={Strings.task} className='min-w-125px' />
        ),
        accessor: 'task_name',
        Cell: ({...props}) => {
          return (
            <>
              <div className='d-flex align-items-center'>
                <div className='d-flex justify-content-start flex-column'>
                  <CustomDefaultTitle title={props.data[props.row.index]?.task_name} />
                </div>
              </div>
            </>
          )
        },
      },
      {
        Header: (props: any) => (
          <CustomHeader
            tableProps={props}
            title={Strings.time}
            className='min-w-125px '
          />
        ),
        accessor: 'trackedTime',
        Cell: ({...props}) => (
          <>
            <CustomDefaultTitle
              isCapitalizeFirstLetterRequired={false}
              title={`${
                !props.data[props.row.index]?.start_time
                  ? capitalizeEndLabel(props.data[props.row.index]?.trackedTime.toString())
                  : `${props.data[props.row.index]?.trackedTime} ${Strings.minutes}`
              }`}
            />
          </>
        ),
      },
      // {
      //   Header: (props: any) => (
      //     <CustomHeader tableProps={props} title={""} colspan={5}/>
      //   ),
      //   accessor: 'task_status',
      //   Cell: ({...props}) => {
      //     return <div className="col-12" >
      //     <textarea className="form-control form-control-lg form-control-solid" placeholder="Description" style={{height: "62px"}}></textarea>
      // </div>
      //   },
      // },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title={Strings.actions} className='min-w-155px' />
        ),
        accessor: 'id',
        Cell: ({...props}) => {
          return props.data[props.row.index]?.start_time ? (
            <button
              type='button'
              className='btn btn-sm btn-light m-0 w-150px'
              style={{color: Style.darkTheme.selectInput.pagination.color}}
              onClick={() => onEditTaskEntryClick( props.data[props.row.index]?.index)}
            >
              <FontAwesomeIcon icon={faPen} className='button-icon' />
              {/* {Strings.editTaskEntry} */}
            </button>
          ) : (
            <></>
          )
        },
      }
    ]
  )

  
}

export {getTaskEntryColumn}
