import {useTimeTracker} from 'app/context/TimeTrackerContext'
import {Strings} from 'app/resource/Strings'
import Style from 'config/colors/colors'
import React from 'react'

const TimeTracker = () => {
  const {width, processContainerBackground, onRefresh} = useTimeTracker()
  const progressBar = Number(width?.replace('%', ''))
  return (
    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
      <div
        className='card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10'
        style={{
          backgroundColor: processContainerBackground,
          backgroundImage: `url('/metronic8/demo1/assets/media/patterns/vector-1.png')`,
        }}
      >
        <div className='card-header pt-5'>
          <div className='card-title d-flex flex-column'>
            <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>Time Tracked</span>
            <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>
              {Strings.todayTimeTracking}
            </span>
          </div>
        </div>

        <div className='card-body d-flex align-items-end pt-0'>
          <div className='d-flex align-items-center flex-column mt-3 w-100'>
            <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
              <span
                className='text-hover-light'
                style={{cursor: 'pointer'}}
                onClick={() => {
                  if (width !== '100%') {
                    onRefresh()
                  }
                }}
              >
                {Strings.refreshNow}
              </span>
              <span>{width}</span>
            </div>

            <div className='h-8px mx-3 w-100 bg-white bg-opacity-50 rounded'>
              <div
                className='bg-white rounded h-8px'
                role='progressbar'
                aria-valuenow={progressBar}
                aria-valuemin={0}
                style={{width: width}}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className='card card-flush h-md-50 mb-5 mb-xl-10'>
        <div className='card-header pt-5'>
          <div className='card-title d-flex flex-column'>
            <div className='d-flex align-items-center'>
              <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>
                {Strings.productiveness}
              </span>
            </div>
            <span className='text-gray-400 pt-1 fw-semibold fs-6'>
              {Strings.lastMonthProductiveness}
            </span>
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
              <div className='bullet w-8px h-3px rounded-2 bg-success me-1'></div>
              <div className='text-gray-500 flex-grow-1 me-0'>{Strings.billableHours}</div>
              <div className='fw-bolder text-gray-700 text-xxl-end'>80%</div>
            </div>
            <div className='d-flex fw-semibold align-items-center'>
              <div className='bullet w-8px h-3px rounded-2 bg-primary me-1'></div>
              <div className='text-gray-500 flex-grow-1 me-0'>{Strings.unbillableHours}</div>
              <div className='fw-bolder text-gray-700 text-xxl-end'>20%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTracker
