import React, { FC } from 'react'
import { t } from '@lingui/macro'
import styled, { css } from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  top?: boolean
  left?: string
}

export const TodayIndicator: FC<Props> = ({ left, top }) => {
  return (
    <Container left={left} top={top}>
      {!top && t`Today`}
      <Indicator>
        <Line />
        <Bullet top={top} />
      </Indicator>
    </Container>
  )
}

const Indicator = styled.div<{ top?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(5.5px);

  ${({ top }) =>
    top &&
    css`
      flex-direction: column-reverse;
    `};

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    transform: translateY(0px);
    transform: translateX(11px);
    flex-direction: row;
  }
`

const Container = styled.div<{ left?: string; top?: boolean }>`
  position: absolute;
  left: ${({ left, top }) => (top ? '50%' : `calc(${left} - 22px)`)};
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: ${({ top }) => (top ? '25px' : '-5.5px')};
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: ${({ left, top }) => (top ? '50%' : `calc(${left} - 22px)`)};
    left: 0px;
    transform: translateX(-100%);
    flex-direction: row;
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

const Bullet = styled.div<{ top?: boolean }>`
  width: 13px;
  height: 13px;
  background: ${({ theme }) => theme.borderG1};
  border-radius: 100%;
  transform: translateY(-50%);
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    transform: translateY(-0px);
    transform: translateX(-50%);
  }
`
