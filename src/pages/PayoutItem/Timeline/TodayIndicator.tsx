import React, { FC } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

interface Props {
  top?: boolean
  left?: string
}

export const TodayIndicator: FC<Props> = ({ left, top }) => {
  return (
    <Container left={left} top={top}>
      {!top && t`Today`}
      <Bullet top={top} />
      <Line />
    </Container>
  )
}

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
`

const Line = styled.div`
  margin-top: 4px;
  height: 28px;
  width: 4px;
  background-color: ${({ theme }) => theme.text2};
  border-radius: 4px;
`

const Bullet = styled.div<{ top?: boolean }>`
  width: 13px;
  height: 13px;
  background: ${({ theme }) => theme.borderG1};
  border-radius: 100%;
  position: absolute;
  ${({ top }) => (top ? `top: 0` : `bottom: 0`)};
`
