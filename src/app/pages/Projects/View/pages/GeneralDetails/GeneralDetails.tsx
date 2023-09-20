/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { IRootState, useAppDispatch } from 'app/redux/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Strings } from 'app/resource/Strings';
import { Loader } from 'app/Components/Loader/Loader';
import ShowDetails from 'app/Components/showDetails/ShowDetails';
import { FormikKeys } from 'app/Components/TextArea';
import project from 'app/assets/data/project.json'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection';
import { PATHS } from 'config/paths/paths';
import { convertToIndianDateFormat } from 'app/utils/helper';
import { getUserToken } from 'services/AuthServices';
const ViewGeneralDetails = () => {
    const { list } = useSelector((state: IRootState) => state.UserStateData);
    const navigator = useNavigate();
    const { isLoading, specificProject, isError, currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData);
    const dispatch = useAppDispatch()
    const token = getUserToken()
    const [error, setError] = useState<string>('')
    useEffect(() => {
        setError("");
    }, [])

    useEffect(() => {
        if (isError) {
            navigator(PATHS.notFound)
        } else {
            setError("")
        }
    }, [specificProject, isError])
    const alertErrorMessage = () => {
        return (
            <div className="card mb-5 mb-xl-10 form-container p-9 text-center">
                <h2>{error}</h2>
            </div>
        )
    }

    const projectManager = useMemo(() => {
        const projectManagerName = list.find((item) => item.id === specificProject.project_manager);
        return projectManagerName?.name
    }, [list, specificProject.project_manager])

    const setProjectStatusLabel = (status: string, key: string) => {
        const duplicateProjets: FormikKeys = project
        const findCurrentProjectStatusObject: any = duplicateProjets[key].find((p: FormikKeys) => p[status]);
        return findCurrentProjectStatusObject ? findCurrentProjectStatusObject[status] : status
    }
    const teamMembers = specificProject?.team_members?.map((item) => item?.label)?.join(", ");
    const privateDetailsValues = [
        {
            label: Strings.name,
            value: specificProject?.name || ""
        },
        {
            label: Strings.shortName,
            value: specificProject?.short_name || '',
        },
        {
            label: Strings.client,
            value: specificProject?.client?.name || '',
        },
        {
            label: Strings.esimationHours,
            value: specificProject?.estimation_hours || specificProject?.estimation_hours
        },
        {
            label: Strings.projectManager,
            value: specificProject.project_manager ? projectManager : "",
        },
        {
            label: Strings.team,
            value: specificProject?.team !== "null" ? teamMembers : '',
        },
        {
            label: Strings.clientType,
            value: specificProject?.client_type !== "null" ? specificProject?.client_type : '',
        },
        {
            label: Strings.billingType,
            value: specificProject?.billing_type !== "null" ? specificProject?.billing_type : '',
        },
        {
            label: Strings.projectType,
            value: specificProject?.project_type !== "null" ? setProjectStatusLabel(specificProject?.project_type as string, "project.projectType") : '',
        },
        {
            label: Strings.status,
            value: specificProject?.status !== "null" ? specificProject?.status : '',
        },
        {
            label: Strings.slackUrl,
            value: specificProject?.slack_url !== "null" ? specificProject?.slack_url : '',
        },
        {
            label: Strings.startDate,
            value: specificProject?.start_date ? convertToIndianDateFormat(specificProject?.start_date) : '',
        },
        {
            label: Strings.endDate,
            value: specificProject?.end_date ? convertToIndianDateFormat(specificProject?.end_date) : '',
        },
    ]

    const generalDetailsValues = [
        {
            label: Strings.showInPortfolio,
            value: specificProject?.show_in_portfolio ? true?.toString() : false.toString(),
        },
        {
            label: Strings.logo,
            value: specificProject?.image_url || '',
        },
        {
            label: Strings.industries,
            value: specificProject?.industries !== "null" ? specificProject?.industries : '',
        },
        {
            label: Strings.technologies,
            value: specificProject?.technologies !== "null" ? specificProject?.technologies : '',
        },
        {
            label: Strings.tags,
            value: specificProject?.tag !== "null" ? specificProject?.tag?.replaceAll(",", ", ") : '',
        },
        {
            label: Strings.tools,
            value: specificProject?.tools !== "null" ? specificProject?.tools?.toString()?.replaceAll(",", ", ") : '',
        },
        {
            label: Strings.description,
            value: specificProject?.description !== "null" ? specificProject?.description : '',
        },
        {
            label: Strings.demoSiteURL,
            value: specificProject?.demo_site !== "null" ? specificProject?.demo_site : '',
        },
        {
            label: Strings.demoSiteCredentials,
            value: specificProject?.demo_site_credentials !== "null" ? specificProject?.demo_site_credentials : '',
        },
        {
            label: Strings.liveSiteURL,
            value: specificProject?.live_site_url !== "null" ? specificProject?.live_site_url : '',
        }
    ]

    if (error) {
        return (
            <>
                {alertErrorMessage()}
            </>
        )
    }

    return (
        <>

            {isLoading ? <Loader /> : (
                <>
                    <ShowDetails
                        title={Strings.privateDetails}
                        id=''
                        data={privateDetailsValues}
                    />
                    <ShowDetails
                        title={Strings.generalDetails}
                        id=''
                        data={generalDetailsValues}
                    />
                    {(specificProject?.last_updated_by || specificProject?.created_by) && (
                        <UpdateDetailsSection
                            title={Strings.updateDetails}
                            id={specificProject?.last_updated_by || null}
                            lastUpdateDate={specificProject?.updated_at || ''}
                            createdById={specificProject?.created_by}
                            lastCreateDate={specificProject?.created_at}
                            createDetails={specificProject?.added_by_user}
                            updateDetails={specificProject?.updated_by_user}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default React.memo(ViewGeneralDetails)