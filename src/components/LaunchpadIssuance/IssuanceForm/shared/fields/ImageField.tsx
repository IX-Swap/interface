import React from 'react'
import styled from 'styled-components'

import { ReactComponent as ImageIcon } from 'assets/launchpad/svg/image-icon.svg'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'

interface Props {
  label: string
  placeholder?: string

  error?: string

  field: string
  setter: (field: string, value: string) => void
}

export const ImageField: React.FC<Props> = (props) => {
  return (
    <Column gap="0.5rem">
      <FieldContainer>
        <FieldIcon><ImageIcon /></FieldIcon>
        <FieldLabel>{props.label}</FieldLabel>
        <FieldPlaceholder>{props.placeholder ?? 'PNG, JPG, and SVG files only.'}</FieldPlaceholder>
        <BrowseButton>Browse</BrowseButton>
      </FieldContainer>

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

const FieldIcon = styled.div`
  margin-bottom: 2rem;
`

const FieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.01em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const FieldPlaceholder = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const BrowseButton = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.primary};

  cursor: pointer;

  padding: 0.5rem;

  border: none;
  border-radius: 6px;
  
  background: none;
  transition: background 0.3s;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`