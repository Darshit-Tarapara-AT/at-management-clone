import { InputFormikProps, LeaveFormValues, PermissionFormValues, PolicyFormValues, RolesFormValues } from "app/Modal/Modal"
import { ClientFormValues } from "app/pages/Client/Components/Modal/Modal"
import { LeadFormValues } from "app/pages/Lead/Components/Modal/Modal"
import { ProjectFormValues } from "app/pages/Projects/Components/Modal/Modal"
import { TaskFormValues } from "app/pages/Tasks/Components/Modal/Modal"
import { IProfileDetails } from "app/pages/Users/Components/Modal/Modal"
import { FormikProps } from "formik"

export interface ISelectInputProps  {
name : string,
formik : InputFormikProps
className ?: string,
onChange?:(leadStatus:any[]) => void
isRequired?: boolean
isClearable?: boolean
onBlur:(name:string) => void
label : string
optionTitle : string
optionValue : string
options : any[],
isMulti ?: boolean,
}
