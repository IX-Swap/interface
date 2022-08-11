import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { t } from '@lingui/macro'

import { MEDIA_WIDTHS, TYPE } from 'theme'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

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
          <StyledButtonIXSGradient ended={ended}>
            {formatDate(date)}
            {/* {isSameDay && <TodayIndicator overlay />} */}
          </StyledButtonIXSGradient>
          <TYPE.buttonMuted>{t`${label}`}</TYPE.buttonMuted>
        </>
      ) : (
        <>
          <StyledButtonGradientBorder>
            {formatDate(date)}
            {/* {isSameDay && <TodayIndicator overlay />} */}
          </StyledButtonGradientBorder>
          <TYPE.body3 color={'text1'}>{t`${label}`}</TYPE.body3>
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
  margin-top: 20px;
  width: 140px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-top: 0px;
    transform: ${({ isStartDate }) => `translateX(${isStartDate ? '' : '-'}50%)`};
    > div:last-child {
      font-size: 12px !important;
      line-height: 18px !important;
    }
    > button {
      border-radius: ${({ isStartDate }) => (isStartDate ? '0px 32px 32px 0px' : '32px 0px 0px 32px')};
      :before {
        border-radius: ${({ isStartDate }) => (isStartDate ? '0px 32px 32px 0px' : '32px 0px 0px 32px')};
      }
    }
  }
`

const buttonCommonStyles = css`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  max-height: 34px;
  min-height: 34px;
  border-radius: 32px;
  padding: 5px 10px;
  position: relative;
  width: 100%;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 140px;
  }
`

const StyledButtonIXSGradient = styled(ButtonIXSGradient)<{ ended: boolean }>`
  ${buttonCommonStyles}
  font-weight: 600;
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
