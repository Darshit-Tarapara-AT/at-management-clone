import { InputFormikProps } from "app/Modal/Modal"

export interface InputProps  {
placeHolder: string
name: string
formilk: InputFormikProps
className?: string
logoUrl?: string
col?: number
isPlusIconRequired?: boolean
labelCol?: number
min?: string
label?: string
onPlusButtonClick?:() => void
isProfileInput?: boolean
disabled?: boolean
hasEmojiValidationRequired?: boolean
isReadOnly?: boolean
value?: string | number | Date  | string[] 
type: string
setLogoURL?: React.Dispatch<React.SetStateAction<string>>
accept?: string
style?: React.CSSProperties
isRequired?: boolean
id?: string
onKeyPress?: (key:string) => void
onBlur?: (name:string) => void
max?: string 
}
