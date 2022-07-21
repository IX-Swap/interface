import React, { FC } from 'react'
import { t } from '@lingui/macro'
import styled, { css } from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  offset?: string
  overlay: boolean
}

export const TodayIndicator: FC<Props> = ({ offset, overlay }) => {
  return (
    <Container offset={offset} overlay={overlay}>
      <Label overlay={overlay}>{t`Today`}</Label>
      <Indicator overlay={overlay}>
        <Line />
        <Bullet overlay={overlay} />
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

const Indicator = styled.div<{ overlay?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(5.5px);

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    transform: translateY(0px);
    transform: translateX(2px);
    flex-direction: row-reverse;
  }
  ${({ overlay }) =>
    overlay &&
    css`
      flex-direction: column-reverse;
      @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        flex-direction: row;
      }
    `};
`

const Container = styled.div<{ offset?: string; overlay?: boolean }>`
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
    top: ${({ offset }) => `calc(${offset} - 11px)`};
    left: 0px;
    right: ${({ overlay }) => (overlay ? '0px' : '-100%')};
    transform: translateX(0%);
    flex-direction: ${({ overlay }) => (overlay ? 'row' : 'row-reverse')};
    height: 21px;
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

const Bullet = styled.div<{ overlay?: boolean }>`
  width: 13px;
  height: 13px;
  background: ${({ theme }) => theme.borderG1};
  border-radius: 100%;
  transform: ${({ overlay }) => (overlay ? 'translateY(50%)' : 'translateY(-50%)')};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    transform: translate(50%, 0px);
  }
`
