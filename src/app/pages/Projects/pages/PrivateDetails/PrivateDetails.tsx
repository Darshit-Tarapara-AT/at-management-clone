/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {  PrivateDetailsPageFormValue } from '../../Components/Modal/Modal'
import { IRootState, useAppDispatch } from 'app/redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import project from 'app/assets/data/project.json';
import { editProjectActionPayload } from 'app/redux/ProjectSlice/ProjectTypes';
import { getUserToken } from 'services/AuthServices';
import { useFormik } from 'formik';
import { editProjectAction, getIndividualUProjectAction } from 'app/redux/ProjectSlice/ProjectAyscThunk';
import { Strings } from 'app/resource/Strings';
import { Message } from 'app/utils/AlertMessage';
import Button from 'app/Components/Button/Button';
import { ProjectFormValidation } from 'app/utils/ValidationSchema';
import { useSelector } from 'react-redux';
import { convertDateObjectToString, formatMultiSelectInput, setSelectInputOptions } from 'app/utils/helper';
import MainProjectDetails from '../../Components/Steps/MainProjectDetails/MainProjectDetails';
import { Loader } from 'app/Components/Loader/Loader';
import { PATHS } from 'config/paths/paths';
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload';
import { getAllClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk';
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission';
import constant from 'config/const/const';
const PrivateDetails = () => {
    const { currentUserProfileDetails } = useSelector((state: IRootState) => state.UserStateData);
    const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData);
    const { isLoading, specificProject, isError, currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData)
    const {list} = useSelector((state: IRootState) => state.ClientStateData)
    const clientPayload = useListingAPIPayload(payloadKeyList.clients, constant.page.maxSize)
    useFetchAPIBaseOnPermission(userPermissions?.client?.list, getAllClientAction, clientPayload,false, list, constant.page.size + 1);
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const {id} = useParams()
    const [initialFormState, setInitialFormState] = useState({} as editProjectActionPayload)
    const token = getUserToken()
    const defaultOption = [{
        label: 'Select',
        id: ""
    }]
    const currentProjectManager = [{
        label: currentUserProfileDetails?.name || '',
        id: currentUserProfileDetails?.id || ""
    }]

    const formik = useFormik<PrivateDetailsPageFormValue>({
        initialValues: {
            name: "",
            shortName: "",
            client: [],
            billingType: [],
            projectType: [],
            esimationHours: "",
            projectManager: currentProjectManager || defaultOption,
            team: [],
            progressStatus: [],
            type: [],
            status: [],
            slackUrl: "",
            startDate: [],
            endDate: [],
            addedByUser: {id: 0, name: "", image_url: "",},
            updatedByUser: {id: 0, name: "", image_url: "",},
        },
        validationSchema: ProjectFormValidation,
        onSubmit: (formValue) => {
            editPageHandlerSubmit(formValue)
        }
    })
    const convetToSelectInput = (value: string | number) => {
        return [{
            id: value,
            label: value?.toString()
        }]
    }
    const resetFormValues = (formValues: any) => {
        formik.resetForm({
            values: {
                ...formik.values,
                name: formValues.name,
                shortName: formValues.short_name,
                projectType: formatMultiSelectInput(formValues.project_type as string),
                client: [{ id: formValues.client_id, label: formValues.client_id.toString() }],
                esimationHours: formValues.estimation_hours,
                projectManager: [{ id: formValues.project_manager, label: formValues.project_manager.toString() }],
                team: formatMultiSelectInput(formValues.team),
                progressStatus: [{ id: formValues.progress_status, label: formValues.progress_status.toString() }],
                type: convetToSelectInput(formValues.client_type),
                billingType: convetToSelectInput(formValues.billing_type),
                status: convetToSelectInput(formValues.status),
                slackUrl: formValues.slack_url || '',
                startDate: formValues.start_date ? formValues?.start_date : '',
                endDate: formValues.end_date ? formValues?.end_date : '',
            }
        })
    }

    useEffect(() => {
        if (id) {
            if (isError) {
                navigator(PATHS.notFound)
            } else {
                setInitialFormState(specificProject)
                resetFormValues(specificProject)
            }
        }
        else {
            navigator(PATHS.notFound)
        }
    }, [id, specificProject, isError])
    const handlerBlurEvent = (name: string) => {
        formik.setFieldTouched(name, true);
    };
    const isEmpty = (name: string) => {
        return name === "null" ? '' : name
    }
    const editPageHandlerSubmit = (formValue: PrivateDetailsPageFormValue) => {
        const team = formValue.team.map((item) => {
            return item.id
        }).join(",")
        const projectType = formValue.projectType.map((item) => {
            return item.id
        }).join(",")

        const APIPayload = {
            token,
            id: Number(id),
            items: {
                name: formValue.name,
                short_name: formValue.shortName,
                client_id: formValue.client?.[0].id,
                estimation_hours: formValue.esimationHours,
                project_manager: formValue.projectManager?.[0]?.id,
                team: team,
                project_type: projectType,
                progress_status: formValue.progressStatus?.[0]?.id,
                client_type: formValue.type?.[0]?.id,
                billing_type: formValue.billingType?.[0]?.id,
                status: formValue.status?.[0]?.id,
                slack_url: formValue.slackUrl || '',
                start_date: formValue.startDate ? convertDateObjectToString(formValue.startDate) : '',
                end_date: formValue.endDate ? convertDateObjectToString(formValue.endDate) : '',
                show_in_portfolio: initialFormState.show_in_portfolio,
                logo: isEmpty(initialFormState.logo as string),
                industries: isEmpty(initialFormState.industries as string),
                technologies: isEmpty(initialFormState.technologies as string),
                color: isEmpty(initialFormState.color as string),
                tag: isEmpty(initialFormState.tag as string),
                description: isEmpty(initialFormState.description as string),
                tools: isEmpty(initialFormState.tools as string),
                demo_site: isEmpty(initialFormState.demo_site as string),
                demo_site_credentials: isEmpty(initialFormState.demo_site_credentials as string),
                live_site_url: isEmpty(initialFormState.live_site_url as string),
                live_site_credentials: isEmpty(initialFormState.live_site_credentials as string),
                added_by_user: formValue.addedByUser,
                updated_by_user: formValue.updatedByUser
            }
        }

        dispatch(editProjectAction(APIPayload)).then((res) => {
            const formValues = res.payload as { status: boolean | undefined, message: string }
            if (formValues.status) {
                alertMessage("success", Strings.projectUpdateSuccessfully, '')
            }
            else {
                alertMessage("error", formValues.message, '')
            }
        })
    }

    const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
        Message(title, icon, text).then((result) => {
            if (result.isConfirmed) {
                dispatch(getIndividualUProjectAction({ token: token, id: Number(currentProjectId) }))
            }
        })
    }
    return (
        <form className='form' onSubmit={formik.handleSubmit}>
            {isLoading ? <Loader /> : <>
                <MainProjectDetails
                    formik={formik}
                    name="name"
                    shortName="shortName"
                    handlerBlurEvent={handlerBlurEvent}
                    client="client"
                    esimationHours="esimationHours"
                    projectManager="projectManager"
                    statusOption={setSelectInputOptions(project["project.status"], true)}
                    team="team"
                    progressStatusOptions={setSelectInputOptions(project["project.projectStatus"], true)}
                    progressStatus="progressStatus"
                    type="type"
                    status="status"
                    slackUrl="slackUrl"
                    clientTypeOption={setSelectInputOptions(project["project.clientType"], true)}
                    startDate="startDate"
                    endDate="endDate"
                    projectType="projectType"
                    projectTypeOptions={setSelectInputOptions(project["project.projectType"], true)}
                />
                <Button disabled = {formik.isSubmitting} onReset={() => resetFormValues(initialFormState)} isCancelButtonRequired={true} isValid={formik.isValid} dirty={formik.dirty} type='submit'>{Strings.updateProject}</Button>
            </>}

        </form>
    )

}

export default PrivateDetails