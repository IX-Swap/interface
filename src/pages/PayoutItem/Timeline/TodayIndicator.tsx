import React, { FC } from 'react'
import { Trans, t } from '@lingui/macro'
import styled, { css } from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  offset?: string
  overlay: boolean
  isTodayStartDate: boolean
}

export const TodayIndicator: FC<Props> = ({ offset, overlay, isTodayStartDate }) => {
  return (
    <Container offset={offset} overlay={overlay} isTodayStartDate={isTodayStartDate}>
      <Label overlay={overlay}>
        <Trans>{`Today`}</Trans>
      </Label>
      <Indicator overlay={overlay} isTodayStartDate={isTodayStartDate}>
        <Line />
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
    transform: translate(2px, 0px);
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
  bottom: ${({ overlay }) => (overlay ? '11px' : '-5.5px')};
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  gap: 4px;
  width: 140px;
  transform: translateX(-50%);
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: 52px;
    top: ${({ offset }) => `calc(${offset} - ${offset === '100%' ? '58px' : '34px'})`};
    left: 0px;
    width: auto;
    transform: ${({ isTodayStartDate }) => `translateX(${isTodayStartDate ? '-100%' : '0px'})`};
    flex-direction: ${({ isTodayStartDate }) => (isTodayStartDate ? 'row' : 'row-reverse')};
  }
`

const Line = styled.div`
  height: 28px;
  width: 4px;
  background-color: ${({ theme }) => theme.text2};
  border-radius: 4px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: row;
    width: 28px;
    height: 4px;
  }
`

const Bullet = styled.div<{ overlay?: boolean; isTodayStartDate: boolean }>`
  width: 13px;
  height: 13px;
  background: ${({ theme }) => theme.borderG1};
  border-radius: 100%;
  transform: ${({ overlay }) => (overlay ? 'translate(0px,50%)' : 'translate(0px,-50%)')};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    transform: ${({ isTodayStartDate }) => (isTodayStartDate ? 'translate(50%,0px)' : 'translate(-50%,0px)')};
  }
`
