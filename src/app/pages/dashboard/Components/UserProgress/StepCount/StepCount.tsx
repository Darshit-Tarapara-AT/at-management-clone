import React from 'react'
import {Strings} from 'app/resource/Strings'

const StepCount = () => {
  return (
    <div className='col-xxl-5'>
      <div className='card card-flush h-xl-100'>
        <div className='card-body py-7'>
          <div className='row gx-9 h-100'>
            <div className='col-sm-12'>
              <div
                className='bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px'
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: `url("https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/2_InLine_WearOS_FaceDisplay_BlogPost.gif")`,
                }}
              ></div>
            </div>
            <div className='col-sm-12'>
              <div className='d-flex flex-column h-100'>
                <div className='mb-3'>
                  <div className='d-flex flex-stack mb-0 mt-5'>
                    <div className='flex-shrink-0 me-5'>
                      <span className='text-gray-800 fs-1 fw-bold'>Step Challenges March 2024</span>
                    </div>
                  </div>
                </div>
                <div className='mb-0'>
                  <span className='fw-semibold text-gray-600 fs-6 mb-5 d-block'>
                    It's not too late to participate in our Office Step Count Challenge! Track your
                    steps starting today and compete for the top spot to win a state-of-the-art
                    Smart Watch. Get moving and embrace a healthier, more active lifestyle now!
                  </span>
                  <div className='d-flex'>
                    <div className='border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6 mb-3'>
                      <span className='fs-6 text-gray-700 fw-bold'>March 31, 2024</span>
                      <div className='fw-semibold text-gray-400'>Due Date</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default StepCount
