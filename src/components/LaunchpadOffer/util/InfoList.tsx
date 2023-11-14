import React, { useCallback, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { Separator } from '../../LaunchpadMisc/styled'
import { Attachment } from './Attachment'

import { Asset } from 'state/launchpad/types'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { Info } from 'react-feather'
import { MEDIA_WIDTHS } from 'theme'

export interface InfoEntry {
  label: React.ReactNode
  value?: React.ReactNode
  file?: Asset | File
  hasAsset?: boolean
  isPreviewing?: boolean
  isDownloading?: boolean
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
  placeholderText = 'There is no information to display',
}) => {
  const getIsLast = useCallback((idx: number) => entries.length === idx + 1, [entries])
  const theme = useTheme()
  const [localTime, setLocalTime] = useState(new Date())

  const convertToLocalUTC = () => {
    const localTimestamp = localTime.getTime()
    const utcTimestamp = localTimestamp - localTime.getTimezoneOffset() * 60 * 1000
    const utcDate = new Date(utcTimestamp)
    const newString = utcDate.toString().split(' ')[5]
    return `${newString.slice(0, 6)}:${newString.slice(6, 8)}`
  }

  const utcTime = convertToLocalUTC()
  return (
    <Container>
      {title && (
        <Title fontWeight={titleFontWeight}>
          <StageLabel>
            <div>{title}</div>
            {title === 'Investment Stage' && (
              <Tooltip title={title} body={`The time provided is based on your local time at ${utcTime}`}>
                <Info size="14" color={theme.launchpad.colors.text.caption} />
              </Tooltip>
            )}
          </StageLabel>
        </Title>
      )}

      <Separator />

      {entries.length < 1 ? (
        <div>
          <Placeholder>{placeholderText}</Placeholder>
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
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding:  0px 20px;
   }
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

const Nowrap = styled.div`
  white-space: nowrap;
`

const StageLabel = styled(Nowrap)`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.25rem;
`
