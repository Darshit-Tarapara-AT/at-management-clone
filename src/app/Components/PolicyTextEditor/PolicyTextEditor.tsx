import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { PolicyTextEditorProps } from 'app/Modal/Modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FormikKeys } from '../TextArea'
import './PolicyTextEditor.scss';
const PolicyTextEditor: React.FC<PolicyTextEditorProps> = ({ formik, label, name }) => {
  const value: FormikKeys = formik.values;
  const isTouched: FormikKeys = formik.touched;
  const error: FormikKeys = formik.errors
  return (
      <div className='row mb-6'>
        <label htmlFor={name} className='col-lg-4 col-form-label required fw-bold fs-6' style={{cursor:"default"}}>
          {label}
        </label>
        <div className='col-lg-10 col-xl-8 col-sm-10 fv-row' onBlur = {() => formik.setFieldTouched(name)}>
        <CKEditor
            editor={ClassicEditor}
            data={value[name]!}
            id = {name + " ckeditor"}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'blockQuote',
                'link',
                'numberedList',
                'bulletedList',
                'insertTable',
                'imageUpload',
                'insertTable',
                'uploadImage',
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'mediaEmbed',
                '|',
                'undo',
                'redo',
              ],
            }}
            onChange={(event, editor: any) => {
              const data = editor.getData();
              formik.setFieldValue(name, data)
            }}
          />
          {isTouched[name] && error[name] && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{error[name]}</div>
            </div>
          )}
        </div>
      </div>
      
  )
}

export default PolicyTextEditor
