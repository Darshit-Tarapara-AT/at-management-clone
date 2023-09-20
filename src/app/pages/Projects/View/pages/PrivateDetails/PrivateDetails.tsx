/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { IRootState } from 'app/redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ShowDetails from 'app/Components/showDetails/ShowDetails';
import { Loader } from 'app/Components/Loader/Loader';
import { Strings } from 'app/resource/Strings';
import project from 'app/assets/data/project.json'
import { FormikKeys } from 'app/Components/TextArea';
import { PATHS } from 'config/paths/paths';
const ViewPrivateDetails = () => {
    const { list } = useSelector((state: IRootState) => state.UserStateData);
    const navigator = useNavigate();
    const {id} = useParams()
    const { isLoading, specificProject, isError } = useSelector((state: IRootState) => state.ProjectStateData);
    const [error, setError] = useState<string>('')
    useEffect(() => {
        setError("");
    }, [])

    const projectManager = useMemo(() => {
        const projectManagerName = list.find((item) => item.id === specificProject.project_manager);
        return projectManagerName?.name
    }, [list, specificProject.project_manager])
    useEffect(() => {
        if (isError) {
            navigator(PATHS.notFound)
        } else {
            setError("")
        }
    }, [id, specificProject, isError])


    const setProjectStatusLabel = (status: string, key: string) => {
        const duplicateProjets: FormikKeys = project
        const findCurrentProjectStatusObject: any = duplicateProjets[key].find((p: FormikKeys) => p[status]);
        return findCurrentProjectStatusObject ? findCurrentProjectStatusObject[status] : status
    }

    const alertErrorMessage = () => {
        return (
            <div className="card mb-5 mb-xl-10 form-container p-9 text-center">
                <h2>{error}</h2>
            </div>
        )
    }

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
            value: specificProject?.team !== "null" ? specificProject?.team?.replaceAll(",", ", ") : '',
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
            value: specificProject?.start_date !== "null" ? specificProject?.start_date : '',
        },
        {
            label: Strings.endDate,
            value: specificProject?.end_date !== "null" ? specificProject?.end_date : '',
        },
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
                <ShowDetails
                    title={Strings.privateDetails}
                    id=''
                    data={privateDetailsValues}
                />

            )}
        </>
    )

}

export default ViewPrivateDetails