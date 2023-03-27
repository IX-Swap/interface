import React, { useCallback } from 'react'
import styled from 'styled-components'

import { Separator } from '../../LaunchpadMisc/styled'
import { Attachment } from './Attachment'

import { Asset } from 'state/launchpad/types'

export interface InfoEntry {
  label: React.ReactNode
  value?: React.ReactNode
  file?: Asset | File
  hasAsset?: boolean
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
  const getIsLast = useCallback((idx: number) => entries.length === idx + 1, [entries])

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
          <Attachment
            key={idx}
            entry={entry}
            idx={idx}
            fontSize={fontSize}
            lineHeight={lineHeight}
            isLast={getIsLast(idx)}
          />
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
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.03em;
  margin-bottom: 16px;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Placeholder = styled.div`
  font-size: 14px;
  padding: 8px 0;
`
