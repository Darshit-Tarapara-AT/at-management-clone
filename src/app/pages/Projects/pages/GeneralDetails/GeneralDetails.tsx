/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { GeneralDetailsPageFormValue } from '../../Components/Modal/Modal'
import { useFormik } from 'formik';
import { formatMultiSelectInput, setSelectInputOptions } from 'app/utils/helper';
import ExtraInformation from '../../Components/Steps/ExtraInformation/ExtraInformation';
import project from 'app/assets/data/project.json';
import { editProjectActionPayload } from 'app/redux/ProjectSlice/ProjectTypes';
import {  editProjectAction, getIndividualUProjectAction } from 'app/redux/ProjectSlice/ProjectAyscThunk';
import moment from 'moment';
import { getUserToken } from 'services/AuthServices';
import { IRootState, useAppDispatch } from 'app/redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'app/Components/Button/Button';
import { Strings } from 'app/resource/Strings';
import { Message } from 'app/utils/AlertMessage';
import { Loader } from 'app/Components/Loader/Loader';
import UpdateDetailsSection from 'app/Components/UpadateDetailSection';
import { PATHS } from 'config/paths/paths';
import Style from 'config/colors/colors';
const GeneralDetails = () => {
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const {id} = useParams()
    const { isLoading, specificProject, isError, currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData)
    const [initialFormState, setInitialFormState] = useState({} as editProjectActionPayload)
    const token = getUserToken()
    const [logoUrl, setLogoURL] = useState('');
    const formik = useFormik<GeneralDetailsPageFormValue>({
        initialValues: {
            tools: [],
            logo: "",
            industries: [],
            technologies: [],
            tags: [],
            projectType: [],
            tagInput: '',
            showInPortfolio: false,
            color: Style.colorPicker,
            description: "",
            demoSite: "",
            lastUpdatedBy: { image_url: "", name: "" },
            lastUpdatedDate: '',
            demoSiteCredentials: "",
            liveSiteUrl: "",
            liveSiteCredentials: "",
            addedByUser: {id: 0, name: '', image_url: '',},
            updatedByUser: {id: 0, name: '', image_url: '',},
        },
        onSubmit: (formValue) => {
            editPageHandlerSubmit(formValue)
        }
    })

    const resetFormValues = (formValues: any) => {
        const logoURL = formValues.image_url as string
        setLogoURL(logoURL)
        formik.resetForm({
            values: {
                ...formik.values,
                logo: logoURL,
                showInPortfolio: formValues.show_in_portfolio === "true" ? true : false,
                industries: formValues.industries ? formatMultiSelectInput(formValues.industries as string) : [],
                technologies: formValues.technologies ? formatMultiSelectInput(formValues.technologies as string) : [],
                projectType: formatMultiSelectInput(formValues.project_type as string),
                color: formValues.color || '',
                description: formValues.description || '',
                lastUpdatedDate: formValues.updated_at ? moment(formValues?.updated_at).format("DD-MM-YYYY hh-mm-ss A") : "",
                tools: formValues.tools ? formatMultiSelectInput(formValues.tools as string) : [],
                demoSite: formValues.demo_site || '',
                tags: formValues.tag ? formValues.tag.split(",") :  [],
                demoSiteCredentials: formValues.demo_site_credentials || "",
                liveSiteUrl: formValues.live_site_url || "",
                liveSiteCredentials: formValues.live_site_credentials || ''
            }
        })
    }

    useEffect(() => {
        if (id) {
            if (!isError) {
                setInitialFormState(specificProject)
                resetFormValues(specificProject)
            } else {
                navigator(PATHS.notFound)
            }
        }
        else {
            navigator(PATHS.notFound)
        }
    }, [id, specificProject, isError])
    const handlerBlurEvent = (name: string) => {
        formik.setFieldTouched(name, true);
    };

    const editPageHandlerSubmit = (formValue: GeneralDetailsPageFormValue) => {
        const technologies = formValue.technologies.map((item) => {
            return item.id
        }).join(",")

        const tools = formValue.tools.map((item) => {
            return item.id
        }).join(",")
        const APIPayload = {
            id: Number(id),
            token,
            items: {
                name: initialFormState.name,
                short_name: initialFormState.short_name,
                client_id: initialFormState.client_id,
                estimation_hours: initialFormState.estimation_hours,
                project_manager: initialFormState.project_manager,
                team: initialFormState.team,
                progress_status: initialFormState.progress_status,
                client_type: initialFormState.client_type,
                billing_type: initialFormState.billing_type,
                status: initialFormState.status,
                slack_url: initialFormState.slack_url || '',
                start_date: initialFormState.start_date ? initialFormState.start_date : "",
                end_date: initialFormState.end_date ? initialFormState.end_date : "",
                show_in_portfolio: formValue.showInPortfolio,
                logo: formValue.logo ?  formValue.logo : "",
                industries: formValue.industries.length > 0 ? formValue.industries?.[0].id : '',
                technologies: technologies,
                project_type: initialFormState.project_type,
                color: formValue.color,
                tag: formValue.tags.length > 0 ? formValue.tags.join(",") : "",
                description: formValue.description,
                tools: tools,
                demo_site: formValue.demoSite,
                demo_site_credentials: formValue.demoSiteCredentials,
                live_site_url: formValue.liveSiteUrl,
                live_site_credentials: formValue.liveSiteCredentials,
                added_by_user: formValue.addedByUser,
                updated_by_user: formValue.updatedByUser
            }
        }

        dispatch(editProjectAction(APIPayload)).then((res) => {
            const data = res.payload as { status: boolean | undefined, message: string }
            if (data.status) {
                alertMessage("success", Strings.projectUpdateSuccessfully, '')
            }
            else {
                alertMessage("error", data.message, '')
            }
        })
    }

    const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
        Message(title, icon, text).then((result) => {
            if (result.isConfirmed && icon === 'success') {
                dispatch(getIndividualUProjectAction({ token: token, id: Number(currentProjectId) }))
            }
        })
    }

    return (
        <>
            <form className='form' onSubmit={formik.handleSubmit}>
                {isLoading ? <Loader /> : (
                    <>
                        <ExtraInformation
                            formik={formik}
                            logo="logo"
                            setLogoURL={setLogoURL}
                            industries="industries"
                            technologies="technologies"
                            toolsOptions={setSelectInputOptions(project["project.tools"], true)}
                            industriesOptions={setSelectInputOptions(project["project.industries"], true)}
                            technologiesOptions={setSelectInputOptions(project["project.technologies"], true)}
                            logoUrl={logoUrl}
                            handlerBlurEvent={handlerBlurEvent}
                            showInPortfolio="showInPortfolio"
                            color="color"
                            tagInput="tagInput"
                            description="description"
                            ftpDetails="ftpDetails"
                            demoSite="demoSite"
                            demoSiteCredentials="demoSiteCredentials"
                            liveSiteUrl="liveSiteUrl"
                            liveSiteCredentials="liveSiteCredentials"
                            attachment="attachment"
                            tools="tools"
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
                        <Button disabled = {formik.isSubmitting} onReset={() => resetFormValues(initialFormState)} isCancelButtonRequired={true} isValid={formik.isValid} dirty={formik.dirty} type='submit'>{Strings.updateProject}</Button>
                    </>
                )}
            </form>
        </>
    )
}

export default GeneralDetails