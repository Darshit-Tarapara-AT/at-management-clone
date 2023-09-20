import React from 'react'
import { Outlet } from 'react-router-dom'
import ProjectHeader from '../Components/ProjectHeader/ProjectHeader'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import project from 'app/assets/data/project.json'
import { FormikKeys } from 'app/Components/TextArea'
import { NavLinksProps } from '../Components/Modal/Modal'
interface ProjectWrapperProps {
  editId: number
  navLinks: NavLinksProps[]
}
const ProjectWrapper: React.FC<ProjectWrapperProps> = ({
  editId,
  navLinks
}) => {
  const { specificProject } = useSelector((state: IRootState) => state.ProjectStateData);
  const projectStatus: FormikKeys = project["project.projectStatus"]
  const findProjectStatusLabel = projectStatus?.find((status: any) => status[specificProject?.progress_status])
  const allTemmMemers = specificProject?.team?.replaceAll(" ", "")?.toLocaleLowerCase()?.split(",");
  const estimateHour = `${specificProject?.taken_hours || "0"} / ${specificProject?.estimation_hours}`;
  const estimateHourArrowIcon = (specificProject?.taken_hours || "0") > specificProject?.estimation_hours ? '/media/icons/duotune/arrows/arr068.svg' : '/media/icons/duotune/arrows/arr066.svg'
  return (
    <div>
      <ProjectHeader
        estimateHour={estimateHour}
        team={allTemmMemers}
        arrowColor={''}
        dueDate={specificProject?.end_date}
        editId={editId}
        navLinks={navLinks}
        estimateHourArrowIcon={estimateHourArrowIcon}
        projectStatus={findProjectStatusLabel && findProjectStatusLabel[specificProject?.progress_status]}
        projectName={specificProject?.name} logo={specificProject?.image_url as string}
        tags={specificProject?.tag?.split(",")} />
      <Outlet />
    </div>
  )
}

export default ProjectWrapper