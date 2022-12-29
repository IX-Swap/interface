import React from 'react'

import { ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'
import { FormFieldWrapper, OptionalLabel } from '../styled'

interface Props {
  label: string
  placeholder?: string

  optional?: boolean
  disabled?: boolean

  span?: number

  error?: string

  field: string
  setter: (field: string, value: string) => void

  inputFilter?: (value: string) => string
}

export const FormField: React.FC<Props> = (props) => {
  return (
    <FormFieldWrapper gap="0.5rem" span={props.span}>
      <IssuanceTextField 
        disabled={props.disabled}
        label={<>{props.label} {props.optional && <OptionalLabel>Optional</OptionalLabel>}</>} 
        placeholder={props.placeholder}
        onChange={value => props.setter(props.field, value)}
        inputFilter={props.inputFilter} 
      />

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FormFieldWrapper>
  )
}
