import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Paperclip } from 'react-feather'
import { Column, ErrorText, Spacer } from 'components/LaunchpadMisc/styled'

interface Props {
  label: string
  hint?: React.ReactNode

  error?: string

  field: string
  setter: (field: string, value: string) => void
}

export const FileField: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <Column gap="1rem">
      <Column gap="0.25rem">
        <FieldLabel>{props.label}</FieldLabel>

        {props.hint && <FieldHint>{props.hint}</FieldHint>}
      </Column>

      <FieldWrapper>
        <Paperclip color={theme.launchpad.colors.text.bodyAlt} size="15" />
        <Prompt>Uploader File</Prompt>

        <Spacer />

        <BrowseButton>Browse</BrowseButton>
      </FieldWrapper>

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}

const FieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
const FieldHint = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldWrapper = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;
  padding: 1.5rem 2rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const Prompt = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`
const BrowseButton = styled.button`
  border: none;
  background: none;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.primary};
`