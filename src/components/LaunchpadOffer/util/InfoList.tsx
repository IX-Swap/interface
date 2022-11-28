import React from 'react'
import styled from "styled-components"

import { Separator } from '../styled'

interface InfoEntry {
  label: React.ReactNode
  value?: React.ReactNode
}

interface Props {
  title?: React.ReactNode
  entries: InfoEntry[]
}

export const InfoList: React.FC<Props> = (props) => {
  return (
    <Container>
      {props.title && <Title>{props.title}</Title>}

      <Separator />

      {props.entries.map((entry, idx) => (
        <>
          <Entry key={`entry-${idx}`}>
            <Label>{entry.label}</Label>
            {entry.value && <Value>{entry.value}</Value>}
          </Entry>

          <Separator key={`separator-${idx}`}/>
        </>
      ))}
    </Container>
  )
}

const Container = styled.div``
const Title = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;

  line-height: 120%;
  letter-spacing: -0.03em;

  margin-bottom: 1rem;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const Entry = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  max-width: 100%;
  contain: content;
`

const Label = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`
const Value = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;
  
  text-align: right;

  color: ${props => props.theme.launchpad.colors.text.title};
`

