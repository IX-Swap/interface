import React from 'react'
import { Field } from 'formik'
import { TextField, TextFieldProps } from 'formik-material-ui'

interface FormikTextFieldProps extends Partial<TextFieldProps> {
  fieldKey: string
}

const FormikTextField = ({ fieldKey, ...props }: FormikTextFieldProps) => (
  <Field
    {...props}
    id={fieldKey}
    name={fieldKey}
    component={TextField}
    margin='normal'
    fullWidth
  />
)

export default FormikTextField
