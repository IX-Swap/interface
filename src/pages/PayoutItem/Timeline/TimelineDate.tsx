import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Trans } from '@lingui/macro'

import { MEDIA_WIDTHS, TYPE } from 'theme'
import { ButtonIXSWide } from 'components/Button'

import { formatDate } from '../utils'
import { PAYOUT_STATUS } from 'constants/enums'
import useTheme from 'hooks/useTheme'

interface Props {
  status?: string
  label: string
  date: any
}

export const TimelineDate: FC<Props> = ({ status, date, label }) => {
  const theme = useTheme()

  const isRecordDate = label === 'Record Date'
  const isStartDate = label === 'Payment Start Date'
  const isDeadlineDate = label === 'Payment Deadline'

  let borderColor = undefined
  let bgColor = undefined
  let color = undefined

  if (isStartDate && (status === PAYOUT_STATUS.DELAYED || status === PAYOUT_STATUS.STARTED)) {
    borderColor = theme.orange2
    color = theme.orange2
    bgColor = theme.orange25
  } else if (isRecordDate || (isStartDate && status === PAYOUT_STATUS.ENDED)) {
    borderColor = theme.bg26
    color = theme.bg26
    bgColor = theme.bg27
  } else if (isDeadlineDate && status === PAYOUT_STATUS.ENDED) {
    borderColor = theme.red4
    color = theme.red4
    bgColor = theme.red41
  }

  return (
    <Container isStartDate={isStartDate}>
      <StyledButtonIXSWide borderColor={borderColor} bgColor={bgColor} color={color}>
        {formatDate(date)}
      </StyledButtonIXSWide>
      <TYPE.small>
        <Trans>{`${label}`}</Trans>
      </TYPE.small>
    </Container>
  )
}

const Container = styled.div<{ isStartDate: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-top: 0px;
    > div:last-child {
      font-size: 12px !important;
      line-height: 18px !important;
    }
  }
`

const buttonCommonStyles = css`
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  position: relative;
  width: 100%;
  margin: 0 0 12px 0;
  min-height: 45px;
  width: 180px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 180px;
  }
`

const StyledButtonIXSWide = styled(ButtonIXSWide)<{ borderColor?: string; bgColor?: string; color?: string }>`
  ${buttonCommonStyles}
  font-weight: 600;
  border: 1px solid;
  text-align: center;
  background: ${({ theme, bgColor }) => bgColor ?? theme.bg0};
  border-color: ${({ borderColor }) => borderColor ?? 'rgba(102, 102, 255, 0.5)'};
  color: ${({ theme, color }) => color ?? theme.text5};
`
