import { InputFormikProps } from "app/Modal/Modal"
export interface ItextAreaProps  {
name : string,
formik : InputFormikProps
className ?: string,
onBlur?:(name:string) => void
label : string
isReadOnly ?: boolean
col?: number
labelCol?: number
value?: string
isRequired?: boolean
placeholder?: string
rows?: number
title?: string
}

export interface FormikKeys {
    [index: string]: any
}