import { ErrorText } from 'components/LaunchpadMisc/styled'
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
      <FieldTextInput onChange={e => props.onChange?.(e.target.value)} />
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FieldContainer>
  )
}

export const TextAreaField: React.FC<FieldProps> = (props) => {
  return (
    <FieldContainer>
      <FieldLabel>{props.label}</FieldLabel>
      <FieldTextareaInput onChange={e => props.onChange?.(e.target.value)}/>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  alignt-items: flex-start;

  width: 100%;
`
const FieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  margin-bottom: 0.25rem;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const FieldTextInput = styled.input`
  width: 100%;
  height: 52px;

  padding: 0.5rem;

  background: #F7F7FA;
  border: 1px solid #E6E6FF;
  border-radius: 8px;

  outline: 0;
`
const FieldTextareaInput = styled.textarea`
  width: 100%;
  min-height: 160px;
  
  padding: 0.5rem;
  
  background: #F7F7FA;
  border: 1px solid #E6E6FF;
  border-radius: 8px;

  outline: 0;
`
