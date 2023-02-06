import React from 'react'
import styled from 'styled-components'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { FormFieldWrapper } from '../styled'

interface Props {
  label: string
  placeholder?: string

  span?: number
  value?: string
  error?: string

  field: string
  setter: (field: string, value: string) => void
  touch?: (field: string, touched: boolean) => void 
}

export const TextareaField: React.FC<Props> = (props) => {
  const onChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setter(props.field, event.target.value)

    if (props.touch) {
      props.touch(props.field, true)
    }
  }, [])

  return (
    <FormFieldWrapper gap="0.5rem" span={props.span}>
      <FieldLabel>{props.label}</FieldLabel>
      <FieldPlaceholder>{props.placeholder}</FieldPlaceholder>

      <Textarea value={props.value} onChange={onChange} />

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FormFieldWrapper>
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
  
  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const Textarea = styled.textarea`
  min-height: 160px;
  max-width: 100%;

  padding: 1rem;

  outline: none;
  resize: none;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`
