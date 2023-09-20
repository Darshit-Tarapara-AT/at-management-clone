import { Strings } from 'app/resource/Strings'
import React from 'react'

const ProjectDropDown = () => {
    return (
        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3"
            data-kt-menu="true">
            <div className="menu-item px-3">
                <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">
                    {Strings.payments}
                </div>
            </div>
            <div className="menu-item px-3">
                <a href="/" className="menu-link px-3">
                  {Strings.createPayment}
                </a>
            </div>
            <div className="menu-item px-3">
                <a href="/" className="menu-link flex-stack px-3">
                    
                    <span className="ms-2" data-bs-toggle="tooltip"
                        aria-label="Specify a target name for future usage and reference"
                        data-bs-original-title="Specify a target name for future usage and reference"
                        data-kt-initialized="1">
                        <i className="ki-duotone ki-information fs-6"><span className="path1"></span><span
                            className="path2"></span><span className="path3"></span></i> </span>
                </a>
            </div>
            <div className="menu-item px-3">
                <a href="/" className="menu-link px-3">
                {Strings.generateBill}
                </a>
            </div>
            <div className="menu-item px-3" data-kt-menu-trigger="hover"
                data-kt-menu-placement="right-end">
                <a href="/" className="menu-link px-3">
                    <span className="menu-title"> {Strings.subscription}</span>
                    <span className="menu-arrow"></span>
                </a>
                <div className="menu-sub menu-sub-dropdown w-175px py-4">
                    <div className="menu-item px-3">
                        <a href="/" className="menu-link px-3">
                        {Strings.plans}
                        </a>
                    </div>
                    <div className="menu-item px-3">
                        <a href="/" className="menu-link px-3">
                        {Strings.biling}
                        </a>
                    </div>
                    <div className="menu-item px-3">
                        <a href="/" className="menu-link px-3">
                        {Strings.statements}
                        </a>
                    </div>
                    <div className="separator my-2"></div>
                    <div className="menu-item px-3">
                        <div className="menu-content px-3">
                            <label
                                className="form-check form-switch form-check-custom form-check-solid">
                                <input className="form-check-input w-30px h-20px" type="checkbox"
                                    value="1" checked={false} name="notifications" wfd-id="id21" />
                                <span className="form-check-label text-muted fs-6">
                                {Strings.recuring}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-item px-3 my-1">
                <a href="/" className="menu-link px-3">
                {Strings.settings}
                </a>
            </div>
        </div>
    )
}

export default ProjectDropDown

