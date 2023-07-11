import { ErrorText } from 'components/LaunchpadMisc/styled'
import { text8 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'

interface FieldProps {
  label: string
  error?: string
  onChange: (text: string) => void
}

export const TextField: React.FC<FieldProps> = (props) => {
  return (
    <FieldContainer>
      <FieldLabel>{props.label}</FieldLabel>
      <FieldTextInput onChange={(e) => props.onChange?.(e.target.value)} />
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FieldContainer>
  )
}

export const TextAreaField: React.FC<FieldProps> = (props) => {
  return (
    <FieldContainer>
      <FieldLabel>{props.label}</FieldLabel>
      <FieldTextareaInput onChange={(e) => props.onChange?.(e.target.value)} />
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`
const FieldLabel = styled.div`
  ${text8}

  margin-bottom: 0.25rem;

  color: ${(props) => props.theme.launchpad.colors.text.caption};
`

const FieldTextInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0.5rem;
  background: #f7f7fa;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  outline: 0;
`
const FieldTextareaInput = styled.textarea`
  width: 100%;
  min-height: 160px;
  padding: 0.5rem;
  background: #f7f7fa;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  outline: 0;
`
