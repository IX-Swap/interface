import React from 'react'
import styled from 'styled-components'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'

interface Props {
  label: string
  placeholder?: string

  optional?: boolean

  error?: string

  field: string
  setter: (field: string, value: string) => void
}

export const FormField: React.FC<Props> = (props) => {
  return (
    <Column gap="0.5rem">
      <IssuanceTextField 
        label={<>{props.label} {props.optional && <OptionalLabel>Optional</OptionalLabel>}</>} 
        placeholder={props.placeholder}
        onChange={value => props.setter(props.field, value)}
      />

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}

const OptionalLabel = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 8px;

  line-height: 150%;
  letter-spacing: -0.02em;

  text-transform: uppercase;

  color: ${props => props.theme.launchpad.colors.text.caption};
`