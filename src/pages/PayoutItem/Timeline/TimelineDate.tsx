import React, { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { Flex } from 'rebass'
import { t } from '@lingui/macro'

import { TYPE } from 'theme'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

import { TodayIndicator } from './TodayIndicator'
import { momentFormatDate, isSameDay as sameDay } from '../utils'

interface Props {
  withBackground?: boolean
  label: string
  date: any
}

export const TimelineDate: FC<Props> = ({ date, label, withBackground = true }) => {
  const isSameDay = useMemo(() => sameDay(date), [date])

  return (
    <Flex style={{ position: 'relative' }} flexDirection="column" alignItems="center" justifyContent="center">
      {withBackground ? (
        <>
          <StyledButtonIXSGradient>
            {momentFormatDate(date)}
            {isSameDay && <TodayIndicator top />}
          </StyledButtonIXSGradient>
          <TYPE.buttonMuted>{t`${label}`}</TYPE.buttonMuted>
        </>
      ) : (
        <>
          <StyledButtonGradientBorder>
            {momentFormatDate(date)}
            {isSameDay && <TodayIndicator top />}
          </StyledButtonGradientBorder>
          <TYPE.body3 color={'text1'}>{t`${label}`}</TYPE.body3>
        </>
      )}
    </Flex>
  )
}

const buttonCommonStyles = css`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  max-height: 34px;
  min-height: 34px;
  border-radius: 32px;
  padding: 5px 10px;
  position: relative;
  margin-top: 20px;
`

const StyledButtonIXSGradient = styled(ButtonIXSGradient)`
  ${buttonCommonStyles}
  font-weight: 600;
`

const StyledButtonGradientBorder = styled(ButtonGradientBorder)`
  background: ${({ theme }) => theme.bg0};
  ${buttonCommonStyles}
`
