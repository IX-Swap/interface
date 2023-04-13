import React from 'react'

import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'
import { FormFieldWrapper } from '../styled'

interface StylingProps {
  padding?: string
  height?: string

  fontSize?: string
  lineHeight?: string

  borderless?: boolean
}

interface Props extends StylingProps {
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
  touch?: (field: string, touched: boolean) => void

  inputFilter?: (value?: string) => string
}

export const FormField: React.FC<Props> = (props) => {
  const onChange = React.useCallback(
    (value: string) => {
      props.setter(props.field, value)
      if (props.touch) {
        setTimeout(() => {
          if (props.touch) props.touch(props.field, true)
        })
      }
    },
    [props.setter, props.touch, props.field]
  )

  return (
    <FormFieldWrapper gap="0.5rem" span={props.span} className={props.className}>
      <IssuanceTextField
        name={props.field}
        optional={props.optional}
        value={props.value}
        disabled={props.disabled}
        label={props.label}
        error={props.error}
        trailing={props.trailing}
        borderless={props.borderless}
        placeholder={props.placeholder}
        onChange={onChange}
        inputFilter={props.inputFilter}
        padding={props.padding}
        height={props.height}
        fontSize={props.fontSize}
        lineHeight={props.lineHeight}
      />
    </FormFieldWrapper>
  )
}
