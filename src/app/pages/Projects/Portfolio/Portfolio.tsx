import {PortfolioColumns} from 'app/Components/CustomTable/CustomColoums/PortfolioColumns'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import {Loader} from 'app/Components/Loader/Loader'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {getAllProjectsAction,} from 'app/redux/ProjectSlice/ProjectAyscThunk'
import {UserActions} from 'app/redux/UserSlice/UserSlice'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Strings} from 'app/resource/Strings'
import {setColumnBasedOnPermission, setFilterListSelectInputOptions, setTotalPageCount} from 'app/utils/helper'
import {useMemo, useEffect,useState} from 'react'
import {Card} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {getUserToken} from 'services/AuthServices'
import filterUser from 'app/assets/data/project.json'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {SelectInputValue} from '../Components/Modal/Modal'
import { PATHS } from 'config/paths/paths'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import constant from 'config/const/const'
import { getPortfolio, getSearchPortfolioAction } from 'app/redux/PortfolioSlice/PortfolioAyscThunk'
import { portfolioActions } from 'app/redux/PortfolioSlice/PortfolioSlice'



const initialState = {
  technology: [{id: '', label: Strings.technology}],
  industry: [{id: '', label: Strings.industry}],
  projectTypes: [{id: '', label: Strings.projectType}],
  tools: [{id: '', label: Strings.tools}],
  tags: [{id: '', label: Strings.tags}],
}


const portfolioBreadCrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.project,
    path: PATHS.project.list,
    isSeparator: false,
    isActive: false,
  },
]

const Portfolio = () => {
  const dispatch = useAppDispatch()
  const token = getUserToken()
  const [filterAttr, setFilterAttr] = useState(initialState)
  const {error, isLoading, list,limit,page,total, portfolioListProperties} = useSelector((state: IRootState) => state.portfolioStateData)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const data = [...PortfolioColumns]
  const filterActionsPortfolioColumns = setColumnBasedOnPermission(
    'Actions',
    data,
    userPermissions?.project
  )

  useEffect(() => {
    if (token) {
      dispatch(portfolioActions.resetState())
      dispatch(getPortfolio({
        token: token,
        page: constant.page.defaultNumber,
        size: constant.page.size,
        technologies: '',
        industries: '',
        projectType: '',
        tools:'',
        tags: '',
      }))
    }
    return () => {
      dispatch(getPortfolio({
        token: token,
        page: constant.page.defaultNumber,
        size: constant.page.role.allRolePageSize,
        technologies: '',
        industries: '',
        projectType: '',
        tools:'',
        tags: '',
      }))
    }
  }, [dispatch, token])



  const columns = useMemo(() => filterActionsPortfolioColumns, [filterActionsPortfolioColumns])
  const {portfolio} = userPermissions?.project
  const rows = useMemo(() => {
    const newList =
    portfolioListProperties &&
    portfolioListProperties?.map((item, index) => {
          const currentIndex = limit * (page - 1) + (index + 1)
          return {
            ...item,
            index: currentIndex,
            viewItem: portfolio
          }
        })
    return newList
  }, [portfolioListProperties, portfolio, limit, page])
  
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey);
    dispatch(getPortfolio({
      token: token,
      page: page,
      size: limit,
      technologies: '',
      industries: '',
      projectType: '',
      tools: '',
      tags: ''
    }));
  }

  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      size,
      query: '',
      technology: filterAttr.technology?.[0].id,
      industry:filterAttr.industry?.[0].id,
      projectType:filterAttr.projectTypes?.[0].id,
      tools: filterAttr.tools?.[0].id,
      tag: filterAttr.tags?.[0].id,
    }
    dispatch(getSearchPortfolioAction(payload))
    dispatch(portfolioActions.setCurrentPageSize(size))
  }

  const filtersOptions = [
    {
      title: 'technologies',
      options: setFilterListSelectInputOptions(filterUser['project.technologies']),
      filterKey: 'technology',
      value: filterAttr,
    },
    {
      title: 'Industries',
      options: setFilterListSelectInputOptions(filterUser['project.industries']),
      filterKey: 'industry',
      value: filterAttr,
    },
    {
      title: 'Project Types',
      options: setFilterListSelectInputOptions(filterUser['project.projectType']),
      filterKey: 'projectTypes',
      value: filterAttr,
    },
    {
      title: 'Tools',
      options: setFilterListSelectInputOptions(filterUser['project.tools']),
      filterKey: 'tools',
      value: filterAttr,
    },
    {
      title: 'Tags',
      options: setFilterListSelectInputOptions(filterUser['project.tags']),
      filterKey: 'tags',
      value: filterAttr,
    },
  ]
  const totalPage = setTotalPageCount(total, limit)
  const searchListHandler = (searchValue: string) => {
    if (searchValue) {
      dispatch(getSearchPortfolioAction({
        token,
        query: '',
        page: 0,
        technology: filterAttr.technology?.[0].id,
        industries: filterAttr.industry?.[0].id,
        projectType: filterAttr.projectTypes?.[0].id,
        tools: filterAttr.tools?.[0].id,
        tag: filterAttr.tags?.[0].id,
      }))
      return
    }
    dispatch(UserActions.resetState())
  }

  const submitFilterHandler = () => {
    const payload = {
      token: token,
      page: constant.page.defaultNumber,
      size: limit,
      technologies: filterAttr.technology?.[0].id || "",
      industries:filterAttr.industry?.[0].id || "",
    projectType:filterAttr?.projectTypes?.[0]?.id || "",
    tools: filterAttr.tools?.[0].id || "",
    tags: filterAttr.tags?.[0].id || "",

    }
  dispatch(getPortfolio(payload))
  }
  const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
    setFilterAttr((prevState) => {
      return {
        ...prevState,
        [filterKey]: filterValue,
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={portfolioBreadCrumbs}>{Strings.portfolioListing}</PageTitle>
      <Card className='user-card-container list-contain-card'>
        <SectionHeader
          path='/project'
          filtersOptions={filtersOptions}
          onFilterChange={handlerFilterOptions}
          isFilterRequired={true}
          isFilterPermissionAllow={userPermissions.project.portfolio}
          onFilterSubmit={submitFilterHandler}
          setFilterAttr={setFilterAttr}
          checkedList={[]}
          list={list}
          isAddPermissionAllow={false}
          className='user-section-header'
          onChange={searchListHandler}
        />
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} error={error} />}
        <BaseUIPagination
          onPageSizeChangeHandler={pageSizeChangeHandler}
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{id: limit.toString(), label: limit.toString()}]}
        />
      </Card>
    </>
  )
}

export default Portfolio
