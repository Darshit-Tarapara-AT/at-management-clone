import { InputFormikProps } from 'app/Modal/Modal'
import { Checkbox } from 'baseui/checkbox'
import React from 'react'
import { FormikKeys } from '../TextArea'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import Style from 'config/colors/colors'

interface MultiSelectCheckBoxProps {
  label: string
  list: any
  formik: InputFormikProps
  isAllChecked: boolean
  onSelectAllCheckbox: (isChecked: boolean) => void
  name: string
  allSelectedLabel: string
  labelTitle?: string
}
const MultiSelectCheckBox: React.FC<MultiSelectCheckBoxProps> = ({
  label,
  list,
  formik,
  name,
  allSelectedLabel,
  labelTitle = '',
  isAllChecked,
  onSelectAllCheckbox,
}) => {
  let marginValue = "2rem"
  const { currentTheme } = useSelector((state: IRootState) => state.UIStateData)
  const isTouched: FormikKeys = formik.touched
  const error: FormikKeys = formik.errors
  const values: FormikKeys = formik.values
  const multiSelectCheckBoxContainer = (permissionKey: string, permissionId: number,isLastIndexRole: boolean) => {

    return (
      <div className="form-check form-check-sm form-check-custom form-check-solid col-sm-6 col-md-4 col-12" style={{ marginTop: marginValue, marginBottom: "0px"  }}>
        <Checkbox
          value={permissionId + ""}
          name={name}
          onBlur={formik.handleBlur}
          onChange={(e) => formik.setFieldValue(
            name,
            e.target.checked
              ? [...values[name], permissionId]
              : values[name].filter((id: number) => id !== permissionId)
          )}
          checked={values[name].includes(permissionId)}
          overrides={{
            Checkmark: {
              style: ({ $isIndeterminate, $checked }) => ({
                backgroundColor: $checked ? Style.lightTheme.checkBox.checked.background : currentTheme ===  Strings.light  ? Style.lightTheme.selectInput.focus.background : Style.darkTheme.checkBox.background,
                borderColor: $checked ?Style.lightTheme.checkBox.checked.border : currentTheme === Strings.light ? Style.lightTheme.selectInput.focus.background : Style.darkTheme.checkBox.background,
                borderRadius: "5px"
              })
            }
          }}
        >
          <span className="form-check-label">
            {(permissionKey)}
          </span>
        </Checkbox>
      </div>
    )
  }

  return (
    <div className='row mb-6'>
      <label
        className='col-lg-4 col-form-label  fw-bold fs-6 mt-5 required'
        style={{ cursor: 'default' }}
      >
        {label}
      </label>
      <div className='col-lg-8 fv-row'>
        <div className='row mt-8 ml-2'>
          <div className='col-lg-12 mb-2 m-auto' style={{ marginLeft: "2px" }}>
            <Checkbox
              onChange={(e) => {
                const target = e.target as HTMLInputElement
                onSelectAllCheckbox(target.checked)
              }}
              overrides={{
                Root: {
                  style: () => ({
                    width: "110px"
                  })
                },
                Checkmark: {
                  style: ({ $isIndeterminate, $checked }) => ({
                    backgroundColor: $checked ? Style.lightTheme.checkBox.checked.background : currentTheme ===  Strings.light  ? Style.lightTheme.selectInput.focus.background : Style.darkTheme.checkBox.background,
                    borderColor: $checked ?Style.lightTheme.checkBox.checked.border : currentTheme === Strings.light ? Style.lightTheme.selectInput.focus.background : Style.darkTheme.checkBox.background,
                    borderRadius: "5px"
                  })
                }
              }}
              checked={isAllChecked}
            >
              <span className="form-check-label" >
                {allSelectedLabel}
              </span>
            </Checkbox>
          </div>
        </div>
      </div>
      {list && (
        Object.entries(list)?.map(([key, value]) => {
          return (
            <div className='row mb-6'>
              <label
                className='col-lg-4 col-form-label fw-semibold fs-6'
                style={{ cursor: 'default', margin: `${marginValue} 0px`, overflow: "hidden" }}
              >
                {key && !key?.includes(Strings.allRoles) && <span>{(key)}</span>}
              </label>
              <div className='col-lg-8 fv-row'>
                <div className='table-responsive'>
                  <table className='table align-middle table-row-dashed fs-6 gy-5'>
                    <tbody className='text-gray-600 fw-semibold'>
                      <tr>
                        <div className='d-flex flex-wrap' style={{ padding: "1.25rem, 0px" }} >
                          {value ? Object.entries(value as any)?.map(([permisionKey, permissionId], index, array) => {
                            const isLastIndexRole = index === array.length - 1
                            return multiSelectCheckBoxContainer(permisionKey, Number(permissionId), isLastIndexRole)
                          }) : <></>}
                        </div>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        })
      )}
      <div className='row mb-10 mt-auto'>
        <label
          className='col-lg-4 col-form-label  fw-bold fs-6 mt-5'
          style={{ cursor: 'default' }}
        ></label>
        <div className='col-lg-8 fv-row'>
          {isTouched[name] && error[name] && (
            <div className='fv-plugins-message-container' style={{marginLeft: "15px", marginTop: "-15px"}}>
              <div className='fv-help-block'>{error[name]}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}

export default MultiSelectCheckBox
