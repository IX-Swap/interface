import React from 'react'
import styled from 'styled-components'

import { Separator } from '../../LaunchpadMisc/styled'
import { Attachment } from './Attachment'

import { Asset } from 'state/launchpad/types'

interface InfoEntry {
  label: React.ReactNode
  value?: React.ReactNode
  file?: Asset
}

interface Props {
  title?: React.ReactNode

  fontSize?: string
  lineHeight?: string
  titleFontWeight?: string

  entries: InfoEntry[]
}

export const InfoList: React.FC<Props> = (props) => {
  console.log({ entries: props.entries })
  return (
    <Container>
      {props.title && <Title fontWeight={props.titleFontWeight}>{props.title}</Title>}

      <Separator />

      {props.entries.map((entry, idx) => (
        <Attachment key={idx} entry={entry} idx={idx} fontSize={props.fontSize} lineHeight={props.lineHeight} />
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

const Title = styled.div<{ fontWeight?: string }>`
  font-style: normal;
  font-weight: ${(props) => props.fontWeight ?? '800'};
  font-size: 16px;

  line-height: 120%;
  letter-spacing: -0.03em;

  margin-bottom: 0.5rem;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
