import React from 'react'
import styled from "styled-components"

import { Separator } from '../styled'

interface InfoEntry {
  label: React.ReactNode
  value?: React.ReactNode
}

interface Props {
  title?: React.ReactNode
  fontSize?: string;
  lineHeight?: string
  entries: InfoEntry[]
}

export const InfoList: React.FC<Props> = (props) => {
  return (
    <Container>
      {props.title && <Title>{props.title}</Title>}

      <Separator />

      {props.entries.map((entry, idx) => (
        <>
          <Entry key={`entry-${idx}`} fontSize={props.fontSize} lineHeight={props.lineHeight}>
            <Label>{entry.label}</Label>
            {entry.value && <Value>{entry.value}</Value>}
          </Entry>

          <Separator key={`separator-${idx}`}/>
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;

  line-height: 120%;
  letter-spacing: -0.03em;

  margin-bottom: 0.5rem;

  color: ${props => props.theme.launchpad.colors.text.title};
`

interface TextProps {
  fontSize?: string
  lineHeight?: string
}

const Entry = styled.div<TextProps>`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  max-width: 100%;
  contain: content;
  
  font-style: normal;
  font-size: ${props => props.fontSize ?? '14px'};

  line-height: ${props => props.lineHeight ?? '40px'};
  letter-spacing: -0.02em;
`


const Label = styled.div`
  font-weight: 400;

  color: ${props => props.theme.launchpad.colors.text.body};
`
const Value = styled.div`
  font-weight: 600;
  
  text-align: right;

  color: ${props => props.theme.launchpad.colors.text.title};
`

