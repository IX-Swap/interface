import React from 'react'

import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'
import { FormFieldWrapper } from '../styled'

interface Props {
  label?: string
  placeholder?: string

  trailing?: React.ReactNode

  className?: string

  value?: string
  optional?: boolean
  disabled?: boolean
  borderless?: boolean

  span?: number

  error?: string

  field: string
  setter: (field: string, value: string) => void

  inputFilter?: (value?: string) => string
}

export const FormField: React.FC<Props> = (props) => {
  return (
    <FormFieldWrapper gap="0.5rem" span={props.span} className={props.className}>
      <IssuanceTextField 
        optional={props.optional}
        value={props.value}
        disabled={props.disabled}
        label={props.label} 
        error={props.error}
        trailing={props.trailing}
        borderless={props.borderless}
        placeholder={props.placeholder}
        onChange={value => props.setter(props.field, value)}
        inputFilter={props.inputFilter} 
      />
    </FormFieldWrapper>
  )
}
