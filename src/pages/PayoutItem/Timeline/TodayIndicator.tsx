import React, { FC } from 'react'
import { Trans } from '@lingui/macro'
import styled, { css } from 'styled-components'
import { MEDIA_WIDTHS, TYPE } from 'theme'

interface Props {
  offset?: string
  overlay: boolean
  isTodayStartDate: boolean
}

export const TodayIndicator: FC<Props> = ({ offset, overlay, isTodayStartDate }) => {
  return (
    <Container offset={offset} overlay={overlay} isTodayStartDate={isTodayStartDate}>
      <Label overlay={overlay}>
        <TYPE.main1>
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
      display: none;
      @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        display: block;
      }
    `}
`

const Indicator = styled.div<{ overlay?: boolean; isTodayStartDate: boolean }>`
  display: flex;
  flex-direction: ${({ overlay }) => (overlay ? 'column-reverse' : 'column')};
  align-items: center;
  transform: translateY(5.5px);

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
  bottom: ${({ overlay }) => (overlay ? '11px' : '41px')};
  gap: 20px;
  transform: translateX(-50%);
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
    width: 100%;
    gap: 14px;
    bottom: 0;
    margin-bottom: 6px;
    transform: ${({ isTodayStartDate }) => `translateX(${isTodayStartDate ? '-100%' : '0px'})`};
  }
`

const Bullet = styled.div<{ overlay?: boolean; isTodayStartDate: boolean }>`
  width: 13px;
  height: 13px;
  background: ${({ theme }) => theme.bg26};
  border-radius: 100%;
  transform: ${({ overlay }) => (overlay ? 'translate(0px,50%)' : 'translate(0px,-50%)')};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 8px;
    height: 8px;
  }
`
