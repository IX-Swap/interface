import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Trans, t } from '@lingui/macro'

import { MEDIA_WIDTHS, TYPE } from 'theme'
import { ButtonGradientBorder, ButtonIXSGradient, ButtonIXSWide } from 'components/Button'

import { formatDate } from '../utils'

interface Props {
  withBackground?: boolean
  label: string
  date: any
  ended?: boolean
}

export const TimelineDate: FC<Props> = ({ date, label, withBackground = true, ended = false }) => {
  const isStartDate = label === 'Payment Start Date'
  return (
    <Container isStartDate={isStartDate}>
      {withBackground ? (
        <>
          <StyledButtonIXSWide ended={ended}>
            {formatDate(date)}
          </StyledButtonIXSWide>
          <TYPE.small>
            <Trans>{`${label}`}</Trans>
          </TYPE.small>
        </>
      ) : (
        <>
          <StyledButtonGradientBorder>
            {formatDate(date)}
          </StyledButtonGradientBorder>
          <TYPE.small>
            <Trans>{`${label}`}</Trans>
          </TYPE.small>
        </>
      )}
    </Container>
  )
}

const Container = styled.div<{ isStartDate: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
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
  color: ${({ theme }) => theme.text5};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 140px;
  }
`

const StyledButtonIXSWide = styled(ButtonIXSWide)<{ ended: boolean }>`
  ${buttonCommonStyles}
  font-weight: 600;
  min-height: 47px;
  background: ${({ theme }) => theme.bg0};
  border: 1px solid rgba(102, 102, 255, 0.5);
  ${({ ended }) =>
    ended &&
    css`
      background: ${({ theme }) => theme.blue3};
    `}
`

const StyledButtonGradientBorder = styled(ButtonGradientBorder)`
  background: ${({ theme }) => theme.bg0};
  ${buttonCommonStyles}
`
