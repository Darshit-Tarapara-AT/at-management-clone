import React from 'react'

import SectionHeader from '../SectionHeader/SectionHeader'
import { BaseUIPaginationProps, SectionHeaderProps } from 'app/Modal/Modal'
import { CustomTable } from '../CustomTable/CustomTable'
import BaseUIPagination from '../BaseUIPagination/BaseUIPagination'
import { setTotalPageCount } from 'app/utils/helper'
import { Loader } from '../Loader/Loader'
import { Card } from '../Card/Card'

interface ListProps extends SectionHeaderProps, BaseUIPaginationProps {
    path: string
    title: string
    row: any[]
    columns: any[]
    total: number
    error: string
    limit: number
    searchTitle: string
    isLoading: boolean
}
const List: React.FC<ListProps> = ({
    path,
    searchTitle,
    title,
    isFilterPermissionAllow,
    onFilterSubmit,
    onFilterChange,
    searchValue,
    onSearchValueChange,
    filtersOptions,
    buttonText,
    total,
    onAddButtonClick,
    list,
    isAddPermissionAllow,
    onChange,
    row,
    columns,
    error,
    isLoading,
    page,
    onPageChangeHandler,
    limit,
    onPageSizeChangeHandler
}) => {
    const totalPage = setTotalPageCount(total, limit)
    return (
        <>
           {isLoading ? <Loader /> : (
            <Card className='card card-flush mt-6 mt-xl-9 p-9'>
            <SectionHeader
                path={path}
                searchTitle ={searchTitle}
                title={title}
                checkedList={[]}
                isFilterPermissionAllow={isFilterPermissionAllow}
                onFilterSubmit={onFilterSubmit}
                onFilterChange={onFilterChange}
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
                filtersOptions={filtersOptions}
                buttonText={buttonText}
                onAddButtonClick={onAddButtonClick}
                list={list}
                isAddPermissionAllow={isAddPermissionAllow}
                className='user-section-header'
                onChange={onChange}
            />
            <CustomTable data={row || []} columns={columns} error={error} />
            <BaseUIPagination
                numPages={totalPage > 0 ? totalPage : 1}
                page={page}
                searchInput={searchValue}
                onPageChangeHandler={onPageChangeHandler}
                pageSizeValue={[{ label: limit.toString(), id: limit }]}
                onPageSizeChangeHandler={onPageSizeChangeHandler}
            />
        </Card>
        )}
        </>
    )
}

export default List