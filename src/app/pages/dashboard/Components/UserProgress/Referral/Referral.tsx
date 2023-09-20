import React from 'react';
import { Strings } from 'app/resource/Strings'

const Referral = () => {

return (
    <div className="col-xxl-6">
<div className="card border-0 h-md-100" data-bs-theme="light" style={{background: "linear-gradient(112.14deg, #00D2FF 0%, #3A7BD5 100%)"}}>
    <div className="card-body">
        <div className="row align-items-center h-100">
            <div className="col-7 ps-xl-13">

                <div className="text-white mb-6 pt-6">
                    <span className="fs-2qx fw-bold">{Strings.getRewardedForReferral}</span>
                </div>
                <span className="fw-semibold text-white fs-6 mb-8 d-block opacity-75">Refer your friends, previous colleagues and even your neighbours.
We have many job opportunities waiting</span>
                <div className="d-flex align-items-center flex-wrap d-grid gap-2 mb-10 mb-xl-20">
                    <div className="d-flex align-items-center">
                        <div className="symbol symbol-30px symbol-circle me-3">
                            <span className="symbol-label" style={{background: "#35C7FF"}}>
                                <i className="ki-duotone ki-abstract-26 fs-5 text-white"><span className="path1"></span><span className="path2"></span></i>                            </span>                
                        </div>
                        <div className="text-white">
                            <span className="fw-semibold opacity-75 d-block fs-8">Bonus Release Time</span>
                            <span className="fw-bold fs-7">{Strings.afterCompleting3Months}</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row d-grid gap-2">
                    <a href="https://management-production.vercel.app/policy" className="btn btn-success flex-shrink-0 me-lg-2" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">View Policy</a>
                    <a href="https://agreemtech.com/career/" className="btn btn-primary flex-shrink-0" style={{background: "rgba(255, 255, 255, 0.2)"}} data-bs-toggle="modal" data-bs-target="#kt_modal_create_app">Current Openings</a>
                </div>
            </div>
            <div className="col-5 pt-10">
                <div className="bgi-no-repeat bgi-size-contain bgi-position-x-end h-225px" style={{backgroundImage: 'URL("https://preview.keenthemes.com/metronic8/demo1/assets/media/illustrations/sigma-1/17-dark.png")'}}>
                </div>
            </div>
        </div>
    </div>
</div>

     </div>
    )
}

export default Referral