import React, { FC, useContext } from 'react'
import { Trans } from '@lingui/macro'
import styled, { ThemeContext, css } from 'styled-components'
import { MEDIA_WIDTHS, TYPE } from 'theme'

interface Props {
  offset?: string
  overlay: boolean
  isTodayStartDate: boolean
}

export const TodayIndicator: FC<Props> = ({ offset, overlay, isTodayStartDate }) => {
  const theme = useContext(ThemeContext)
  return (
    <Container offset={offset} overlay={overlay} isTodayStartDate={isTodayStartDate}>
      <Label overlay={overlay}>
        <TYPE.main1 sx={{ color: theme.bg26 }}>
          <Trans>{`Today`}</Trans>
        </TYPE.main1>
      </Label>
      <Indicator overlay={overlay} isTodayStartDate={isTodayStartDate}>
        <Bullet overlay={overlay} isTodayStartDate={isTodayStartDate} />
      </Indicator>
    </Container>
  )
}

const Label = styled.div<{ overlay?: boolean }>`
  ${({ overlay }) =>
    overlay &&
    css`
      @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        display: block;
      }
    `}
`

const Indicator = styled.div<{ overlay?: boolean; isTodayStartDate: boolean }>`
  display: flex;
  flex-direction: ${({ overlay }) => (overlay ? 'column-reverse' : 'column')};
  align-items: center;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: ${({ isTodayStartDate }) => (isTodayStartDate ? 'row-reverse' : 'row')};
  }
  ${({ overlay, isTodayStartDate }) =>
    overlay &&
    css`
      flex-direction: column-reverse;
      @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        flex-direction: ${isTodayStartDate ? 'row-reverse' : 'row'};
      }
    `};
`

const Container = styled.div<{ offset?: string; overlay?: boolean; isTodayStartDate: boolean }>`
  position: absolute;
  left: ${({ offset }) => offset};
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -22px;
  gap: 12px;
  height: 48px;
  transform: translateX(-50%);
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
    left: 0;
    width: 100%;
    gap: 14px;
    height: 24px;
    top: -12px;
    margin-bottom: 6px;
    transform: ${({ isTodayStartDate }) => `translateX(${isTodayStartDate ? '-100%' : '0px'})`};
  }
`

const Bullet = styled.div<{ overlay?: boolean; isTodayStartDate: boolean }>`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.bg26};
  border-radius: 100%;
  transform: ${({ overlay }) => (overlay ? 'unset' : 'translate(0px,-50%)')};
`
