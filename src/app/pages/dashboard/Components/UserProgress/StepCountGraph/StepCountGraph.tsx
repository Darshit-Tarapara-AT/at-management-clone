const StepCountGraph = () => {
    return (

            
      <div className='col-xl-7'>
        <div className='card'>
          <div
            className='card-header border-0'
            aria-expanded='true'
            aria-controls='kt_account_profile_details'
          >
            <div className='card-title m-0 flex-column' style={{cursor: 'pointer'}}>
              <h3 className='fw-bolder m-0'>Step Challenge's Current Status.</h3>
            </div>
          </div>
          <div className='card-body pt-0 p-0 pb-9'>
            {' '}
            <iframe
              width='693'
              height='371'
              src='https://docs.google.com/spreadsheets/d/e/2PACX-1vTZ1l3m1oiUyyc24sgclf6h4xqkYFldvWiaQOlmilY_TKST9xYOG7cdSR_FDzIUdfhrZUFiBn3nHFXi/pubchart?oid=7403021&amp;format=interactive'
            ></iframe>
          </div>
        </div>
      </div>
        
    )
}

export default StepCountGraph
