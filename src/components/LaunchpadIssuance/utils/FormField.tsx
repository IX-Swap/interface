import React from 'react'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceTextField } from '../utils/TextField'

interface Props {
  label: string
  placeholder?: string

  error?: string

  field: string
  setter: (field: string, value: string) => void
}

export const FormField: React.FC<Props> = (props) => {
  return (
    <Column gap="0.5rem">
      <IssuanceTextField 
        label={props.label} 
        placeholder={props.placeholder}
        onChange={value => props.setter(props.field, value)}
      />

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}