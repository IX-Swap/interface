import React from 'react'
import styled from 'styled-components'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'

interface Props {
  label: string
  placeholder?: string

  error?: string

  field: string
  setter: (field: string, value: string) => void
}

export const TextareaField: React.FC<Props> = (props) => {
  return (
    <Column gap="0.5rem" >
      <FieldLabel>{props.label}</FieldLabel>
      <FieldPlaceholder>{props.placeholder}</FieldPlaceholder>

      <Textarea />

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  gap: 0.25rem;

  flex-grow: 1;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const FieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const FieldPlaceholder = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.02em;
  
  color: ${props => props.theme.launchpad.colors.text.caption};
`

const Textarea = styled.textarea`
  min-height: 160px;
  max-width: 100%;

  padding: 1rem;

  outline: none;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`
