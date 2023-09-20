/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react';
import './Form.scss';
import { ProjectFormValues } from '../Components/Modal/Modal'
import MainProjectDetails from '../Components/Steps/MainProjectDetails/MainProjectDetails';
import { Strings } from 'app/resource/Strings';
import { useNavigate, useParams } from 'react-router-dom';
import { PageLink, PageTitle } from '_metronic/layout/core';
import { ProjectFormValidation } from 'app/utils/ValidationSchema';
import { IRootState, useAppDispatch } from 'app/redux/store';
import { LeadActions } from 'app/redux/LeadSlice/LeadSlice';
import { Message } from 'app/utils/AlertMessage';
import { useSelector } from 'react-redux';
import project from 'app/assets/data/project.json';
import ExtraInformation from '../Components/Steps/ExtraInformation/ExtraInformation';
import { formatMultiSelectInput, setSelectInputOptions } from 'app/utils/helper';
import Button from 'app/Components/Button/Button';
import { getUserToken } from 'services/AuthServices';
import { addProjectAction, editProjectAction, getIndividualUProjectAction } from 'app/redux/ProjectSlice/ProjectAyscThunk';
import { editProjectActionPayload } from 'app/redux/ProjectSlice/ProjectTypes';
import moment from 'moment';
import { PATHS } from 'config/paths/paths';
import Style from 'config/colors/colors';
import { getAllClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk';
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission';
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload';
import constant from 'config/const/const';

const addProjectBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.project,
    path: '/projects',
    isSeparator: false,
    isActive: false,
  }
]

const Form = () => {
  const token = getUserToken()
  const { currentUserProfileDetails } = useSelector((state: IRootState) => state.UserStateData);
  const { list } = useSelector((state: IRootState) => state.ClientStateData);
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData);
  const clientPayload = useListingAPIPayload(payloadKeyList.clients, constant.page.maxSize)
  const statusOption = project["project.status"];
  const param = useParams();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [logoUrl, setLogoURL] = useState('');
  useFetchAPIBaseOnPermission(userPermissions?.client?.list, getAllClientAction, clientPayload,false, list, constant.page.size + 1);
  const defaultOption = [{
    label: 'Select',
    id: ""
  }]
  const currentProjectManager = [{
    label: currentUserProfileDetails?.name || '',
    id: currentUserProfileDetails?.id || ""
  }]

  const formik = useFormik<ProjectFormValues>({
    initialValues: {
      name: "",
      shortName: "",
      client: [],
      lastUpdatedDate: "",
      lastUpdatedBy: { image_url: "https://t4.ftcdn.net/jpg/05/47/97/81/360_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpg", name: "Naruto" },
      esimationHours: "",
      projectManager: currentProjectManager || defaultOption,
      team: [],
      progressStatus: [],
      type: [],
      status: [],
      slackUrl: "",
      startDate: [new Date()],
      tools: [],
      endDate: [new Date()],
      logo: "",
      industries: [],
      technologies: [],
      tags: [],
      projectType: [],
      tagInput: '',
      showInPortfolio: false,
      color: "rgb(255, 255, 255)",
      description: "",
      ftpDetails: "",
      demoSite: "",
      demoSiteCredentials: "",
      billingType: [],
      liveSiteUrl: "",
      liveSiteCredentials: "",
      attachment: "",
      updatedByUser: {id:0, name: "", image_url: ""},
      addedByUser: {id:0, name: "", image_url: ""},
    },
    validationSchema: ProjectFormValidation,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue);
      } else {
        addPageHandlerSubmit(formValue);
      }
    },
  });

const convetToSelectInput = (value: string | number) => {
  return [{
    id: value,
    label: value?.toString()
  }]
}

  useEffect(() => {
    if (param.id) {
      const id = Number(param?.id);
      dispatch(getIndividualUProjectAction({ token, id })).then((res) => {
        const data = res.payload as editProjectActionPayload
        if (data) {
          const logoURL = data.image_url as string
          setLogoURL(logoURL)
                    formik.resetForm({
            values: {
              ...formik.values,
              name: data.name,
              shortName: data.short_name,
              client: [{id:  data.client_id, label: data.client_id.toString()}],
              esimationHours: data.estimation_hours,
              projectManager: [{id: data.project_manager, label: data.project_manager.toString()}],
              team: formatMultiSelectInput(data.team),
              progressStatus: [{id: "Waiting To Start", label: Strings.waitingToStart}],
              type: convetToSelectInput(data.client_type),
              billingType: convetToSelectInput(data.billing_type),
              status: [{id: "active", label: Strings.statusActive}],
              slackUrl: data.slack_url,
              startDate: data.start_date ? data?.start_date : '',
              endDate:  data.start_date ? data?.end_date : '',
              showInPortfolio: data.show_in_portfolio ? false : true,
              industries: data.industries ? formatMultiSelectInput(data.industries as string) : [],
              technologies: data.technologies ? formatMultiSelectInput(data.technologies as string) : [],
              projectType: formatMultiSelectInput(data.project_type as string),
              color: data.color || '',
              description: data.description || '',
              lastUpdatedDate: data.updated_at ?  moment(data?.updated_at).format("DD-MM-YYYY hh-mm-ss A") : "",
              tools: data.tools ? formatMultiSelectInput(data.tools as string) : [],
              demoSite: data.demo_site || '',
              demoSiteCredentials: data.demo_site_credentials || "",
              liveSiteUrl: data.live_site_url || "",
              liveSiteCredentials: data.live_site_credentials || ''
            }
          })
        } else {
          navigator("*")
        }
      });
    }
    else {
      formik.resetForm({
        values: {
          ...formik.values,
          name: "",
          shortName: "",
          client: [],
          esimationHours: '',
          projectManager: currentProjectManager || defaultOption,
          team: [],
          progressStatus: [{id: "waitingToStart", label: Strings.waitingToStart}],
          type: [{id: "inHouse", label: Strings.inHouse}],
          status:[{id: "active", label: Strings.statusActive}],
          slackUrl: "",
          startDate: "",
          endDate: "",
          logo: "",
          industries: [],
          technologies: [],
          tags: [],
          projectType: [],
          tagInput: '',
          showInPortfolio: false,
          color: Style.colorPicker,
          description: "",
          ftpDetails: "",
          demoSite: "",
          demoSiteCredentials: "",
          liveSiteUrl: "",
          liveSiteCredentials: "",
          attachment: ""
        }
      });
    }
  }, [param.id]);

  const addPageHandlerSubmit = (formValue: ProjectFormValues) => {
    /**
     * Extracting values from formValue field
     * @param {{label:string, value:string}[]} technologiesValues
     * @param {{label:string, value:string}[]} projectTypeValues
     * @param {{label:string, value:string}[]} toolsValue
     * For API technology, projectType, tools field
     */
    const team = formValue.team.map((item) => {
      return item.id
    }).join(",")
    const projectType = formValue.projectType.map((item) => {
      return item.id
    }).join(",")

    /**
    * @description API call for add project
    * @param APIPayload
    * @returns {Promise}
    * This is use for future purpose
    * Future APIPayload Object structure
    */

    const APIPayload = {
      token,
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
        slack_url: formValue.slackUrl,
        start_date: formValue.startDate as string,
        end_date: formValue.endDate as string,
      }
    }
    dispatch(addProjectAction(APIPayload)).then((res) => {
      const data = res.payload as { status: boolean | undefined, message: string }
      if (data.status) {
        alertMessage("success", Strings.projectAddSuccessfully, '')
      }
      else {
        alertMessage("error", data.message, '')
      }
    })
  }
  const editPageHandlerSubmit = (formValue: ProjectFormValues) => {
    const team = formValue.team.map((item) => {
      return item.label
    }).join(",")
    const technologies = formValue.technologies.map((item) => {
      return item.id
    }).join(",")
    const projectType = formValue.projectType.map((item) => {
      return item.id
    }).join(",")
    const tools = formValue.tools.map((item) => {
      return item.id
    }).join(",")
    const APIPayload = {
      id: Number(param?.id),
      token,
      items: {
        name: formValue.name,
        short_name: formValue.shortName,
        client_id: formValue.client?.[0].id,
        estimation_hours: formValue.esimationHours,
        project_manager: formValue.projectManager?.[0]?.id,
        team: team,
        progress_status: formValue.progressStatus?.[0]?.id,
        client_type: formValue.type?.[0]?.id,
        billing_type: formValue.billingType?.[0]?.id,
        status: formValue.status?.[0]?.id,
        slack_url: formValue.slackUrl,
        start_date: formValue.startDate as string,
        end_date: formValue.endDate as string,
        show_in_portfolio: formValue.showInPortfolio,
        logo: formValue.logo as File,
        industries: formValue.industries.length > 0 ? formValue.industries?.[0].id : '',
        technologies: technologies,
        project_type: projectType,
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
        navigator('/projects')
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(LeadActions.resetErrorState());
      }
    })
  }

  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true);
  };

  return (
    <>
      <PageTitle path="/projects" breadcrumbs={addProjectBreadcrumbs}>{param.id ? Strings.editProject : Strings.addProject}</PageTitle>
      <form className='form' onSubmit={formik.handleSubmit}>
        <MainProjectDetails
          formik={formik}
          name="name"
          shortName="shortName"
          isTitleRequired ={false}
          handlerBlurEvent={handlerBlurEvent}
          client="client"
          esimationHours="esimationHours"
          projectManager="projectManager"
          statusOption={setSelectInputOptions(statusOption, true)}
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
        {param?.id && (
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
            statusOption={setSelectInputOptions(statusOption, true)}
          />
        )}
        <Button isValid={formik.isValid} disabled = {formik.isSubmitting} dirty={formik.dirty} type='submit'>{param.id ? Strings.updateProject : Strings.addProject} </Button>
      </form>
    </>
  )
}
export default Form;
