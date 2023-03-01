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
  placeholderText?: string

  entries: InfoEntry[]
}

export const InfoList: React.FC<Props> = ({
  title,
  fontSize,
  lineHeight,
  titleFontWeight,
  entries,
  placeholderText = 'There are no information to display',
}) => {
  return (
    <Container>
      {title && <Title fontWeight={titleFontWeight}>{title}</Title>}

      <Separator />

      {entries.length < 1 ? (
        <div>
          <Placeholder>{placeholderText}</Placeholder>
          <Separator />
        </div>
      ) : (
        entries.map((entry, idx) => (
          <Attachment key={idx} entry={entry} idx={idx} fontSize={fontSize} lineHeight={lineHeight} />
        ))
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  color: ${(props) => props.theme.launchpad.colors.text.body};
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

const Placeholder = styled.div`
  font-size: 14px;
  padding: 8px 0;
`
