import React, { useEffect } from 'react'
import placeHolderLogo from 'app/assets/image/Placeholder_view_vector.svg.png'
import { useNavigate } from 'react-router-dom'
interface LogoProps {
    src: string
    name: string
    technologies: string
    splitName?: string
    path?: string;
    hasTooltipNeed?: boolean;
    project?: string;
    taskName?: string;
}
const Logo: React.FC<LogoProps> = ({
    src,
    name,
    technologies,
    path,
    hasTooltipNeed,
    project,
    taskName

}) => {
    const navigator = useNavigate();


    const hoverTaskName = (taskSplitName = "") => {
        if(taskSplitName) {
            const spanTag = document.querySelector(`#${taskSplitName}`);
            spanTag?.setAttribute("data-bs-toggle", "tooltip")
            spanTag?.setAttribute("title", name)
        }
    }

    const renderTooltipTag = () => {
        const splitName = name.split("").length > 50 ? "..." : ""
        if(path) {
            return <span className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6" data-bs-toggle = "tooltip" title={name} onClick={() => navigator(path)} style={{cursor: "pointer"}}>{name.slice(0,50) + splitName}</span>
        }
    }
    return (
        <div className="d-flex align-items-center" >
            <div className="symbol symbol-50px me-3">
                <img src={src || placeHolderLogo} className="" alt="" />
            </div>
            <div className="d-flex justify-content-start flex-column">
                {path ? hasTooltipNeed ? renderTooltipTag() : <span  className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6" onClick={() => navigator(path)} style={{cursor: "pointer"}}>{name}</span> : (
                    <span className="text-gray-800 fw-bold  mb-1 fs-6">{name}</span>
                )}
                {/* {<span className="text-gray-400 fw-semibold d-block fs-7">{technologies}</span>} */}
                <div className='d-flex gap-1'>
                {<span className="text-gray-400 fw-semibold d-block fs-7">{project}</span>}
                <span className="text-gray-400 fw-semibold d-block fs-7">{taskName}</span>
                </div>
            </div>
        </div>
    )
}

export default Logo