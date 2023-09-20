import { FilterListProps } from 'app/Modal/Modal'
import { Strings } from 'app/resource/Strings'
import { useEffect } from 'react'
import { MenuComponent } from '_metronic/assets/ts/components'
import './FilterLIst.scss'
import { Select, SIZE, TYPE } from 'baseui/select'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import { useLocation } from 'react-router-dom'
import Style from 'config/colors/colors'
import { useSelector } from 'react-redux';
import { IRootState } from 'app/redux/store';
import { PATHS } from 'config/paths/paths'
import { allInputsStyles, FILTER_SELECT_INPUT, SELECT_INPUT_KEY } from 'config/InputStyles/InputStyles'

const FilterList: React.FC<FilterListProps> = ({
  filtersOptions,
  onFilterChange,
  onFilterSubmit,
  hasResetButtonRequired,
  isFilterLoading,
  buttonText = Strings.filter
}) => {
  const location = useLocation()
  const { currentTheme } = useSelector((state: IRootState) => state.UIStateData);
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const filterData = () => {
    if (onFilterSubmit) {
      onFilterSubmit()
    }
  }

  return (
    <>
      {location.pathname.includes(PATHS.leave.masterList) && (
        <>
          <div className='me-4 my-1'>
            <input
              type='date'
              className='form-control form-control-solid form-select-sm w-150px'
              style={{ backgroundColor: Style.lightTheme.selectInput.background,textTransform: "uppercase" }}
              onChange={(event) => {
                onFilterChange && onFilterChange('startDate', event.target.value)
              }}
            />
          </div>
          <div className='me-4 my-1'>
            <input
              type='date'
              style={{ backgroundColor: Style.lightTheme.selectInput.background, textTransform: "uppercase" }}
              id='end'
              className='form-control form-control-solid form-select-sm w-150px'
              onChange={(event) => {
                onFilterChange && onFilterChange('endDate', event.target.value)
              }}
            />
          </div>
        </>
      )}
      {filtersOptions && filtersOptions.map((item, index) => {
        return (
          <div className='me-4 my-1' key={`${index}`}>
            {item.options.length   === 0 ? (
              <input
                type='date'
                style={{ backgroundColor: Style.lightTheme.selectInput.background,textTransform: "uppercase" }}
                id='end'
                className='form-control form-control-solid form-select-sm w-150px'
                onChange={(event) => {
                  onFilterChange && onFilterChange(item.filterKey, event.target.value)
                }}
              />
            ) : (
              <Select
                data-kt-select2='true'
                options={item.options}
                placeholder={`${Strings.select} ${item.title}`}
                clearable={true}
                size={SIZE.mini}
                type={item.isAutoFill ? TYPE.search : "select"}
                data-allow-clear='true'
                data-kt-user-table-filter={item.filterKey}
                data-hide-search='true'
                id="kt_filter_added"
                onChange={(params) => {
                  const selectedValue = [...params.value] as SelectInputValue[]
                  onFilterChange && onFilterChange(item.filterKey, selectedValue)
                }}
                overrides={{
                  ...allInputsStyles(currentTheme, FILTER_SELECT_INPUT)
                }}
                value={item.value[item.filterKey]}
              />
            )}
          </div>
        )
      })}
      <div className='me-0 my-1'>
        <button
          type='button'
          disabled={isFilterLoading}
          onClick={filterData}
          className='btn btn-sm btn-primary'
          data-kt-menu-dismiss='true'
          data-kt-user-table-filter='filter'
        >
          {buttonText}
        </button>
      </div>
      {hasResetButtonRequired && (
        <div className='me-0 my-1 mx-2'>
        <button
          type='button'
          disabled={isFilterLoading}
          onClick={filterData}
          className='btn btn-sm btn-primary'
          data-kt-menu-dismiss='true'
          data-kt-user-table-filter='filter'
        >
          {Strings.reset}
        </button>
        </div>
        )}
    </>
  )
}

export { FilterList }
