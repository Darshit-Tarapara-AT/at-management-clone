import {Strings} from 'app/resource/Strings'
import {PATHS} from 'config/paths/paths'
import React from 'react'

const AttendanceDetails = () => {
  return (
    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
      <div className='card card-flush h-md-50 mb-5 mb-xl-10'>
        <div className='card-header pt-5'>
          <div className='card-title d-flex flex-column'>
            <div className='d-flex align-items-center'>
              <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{Strings.attendance}</span>
              <span className='badge badge-light-success fs-base'>
                <i className='ki-solid ki-arrow-up fs-5 text-success ms-n1'></i>
                {Strings.good}
              </span>
            </div>
            <span className='text-gray-400 pt-1 fw-semibold fs-6'>{Strings.allPastAttendance}</span>
            <span className='badge badge-light-success fs-base'>
                <i className='ki-solid ki-arrow-up fs-5 text-success ms-n1'></i>
                Coming Soon
              </span>
          </div>
        </div>
        <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
          <div className='d-flex flex-center me-5 pt-2'>
            <div
              id='kt_card_widget_17_chart'
              style={{minWidth: '70px', minHeight: '70px'}}
              data-kt-size='70'
              data-kt-line='11'
            >
              <span></span>{' '}
              <img
                src='https://static.vecteezy.com/system/resources/previews/008/853/674/non_2x/3d-illustration-pie-chart-free-png.png'
                style={{width: '85px'}}
              />
            </div>
          </div>
          <div className='d-flex flex-column content-justify-center flex-row-fluid'>
            <div className='d-flex fw-semibold align-items-center'>
              <div className='bullet w-8px h-3px rounded-2 bg-success me-3'></div>
              <div className='text-gray-500 flex-grow-1 me-4'>{Strings.fullDay}</div>
              <div className='fw-bolder text-gray-700 text-xxl-end'>40%</div>
            </div>
            <div className='d-flex fw-semibold align-items-center my-3'>
              <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
              <div className='text-gray-500 flex-grow-1 me-4'>{Strings.earlyDay}</div>
              <div className='fw-bolder text-gray-700 text-xxl-end'>10%</div>
            </div>
            <div className='d-flex fw-semibold align-items-center '>
              <div className='bullet w-8px h-3px rounded-2 me-3'></div>
              <div className='text-gray-500 flex-grow-1 me-4'>{Strings.halfDay}</div>
              <div className=' fw-bolder text-gray-700 text-xxl-end'>50%</div>
            </div>
          </div>
        </div>
      </div>
      <div className='card card-flush h-md-50 mb-5 mb-xl-10'>
        <div className='card-header pt-5'>
          <div className='card-title d-flex flex-column'>
            <div className='d-flex align-items-center'>
              <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{Strings.leaves}</span>
              <span className='badge badge-light-success fs-base'>
                <i className='ki-solid ki-arrow-up fs-5 text-success ms-n1'></i>
                {Strings.good}
              </span>
            </div>
            <span className='text-gray-400 pt-1 fw-semibold fs-6'>{Strings.allPastLeaveTypes}</span>
            <span className='badge badge-light-success fs-base'>
                <i className='ki-solid ki-arrow-up fs-5 text-success ms-n1'></i>
                Coming Soon
              </span>
          </div>
        </div>
        <div className='card-body pt-2 pb-4 d-flex p-5 flex-wrap align-items-center'>
          <div className='d-flex flex-center me-2 pt-2'>
            <div
              id='kt_card_widget_17_chart'
              data-kt-size='70'
              data-kt-line='11'
              style={{minWidth: '70px', minHeight: '70px'}}
            >
              <img
                src='https://static.vecteezy.com/system/resources/previews/008/853/674/non_2x/3d-illustration-pie-chart-free-png.png'
                style={{width: '85px'}}
              />
            </div>
          </div>
          <div className='d-flex flex-column content-justify-center flex-row-fluid'>
            <div className='d-flex fw-semibold align-items-center'>
              <div className='bullet w-8px h-3px rounded-2 bg-success me-3'></div>
              <div className='text-gray-500 flex-grow-1 me-2'>{Strings.informed}</div>
              <div className='fw-bolder text-gray-700 text-xxl-end'>40%</div>
            </div>
            <div className='d-flex fw-semibold align-items-center my-3'>
              <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
              <div className='text-gray-500 flex-grow-1 me-2'>{Strings.uninformed}</div>
              <div className='fw-bolder text-gray-700 text-xxl-end'>10%</div>
            </div>
            <div className='d-flex fw-semibold align-items-center '>
              <div className='bullet w-8px h-3px rounded-2 me-3'></div>
              <div className='text-gray-500 flex-grow-1 me-2'>{Strings.sickLeave}</div>
              <div className=' fw-bolder text-gray-700 text-xxl-end'>50%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceDetails
