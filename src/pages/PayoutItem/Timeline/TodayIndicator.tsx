import React, { FC, useContext } from 'react'
import { Trans } from '@lingui/macro'
import styled, { ThemeContext, css } from 'styled-components'
import { MEDIA_WIDTHS, TYPE } from 'theme'

interface Props {
  offset?: string
  isTodayStartDate: boolean
}

export const TodayIndicator: FC<Props> = ({ offset, isTodayStartDate }) => {
  const theme = useContext(ThemeContext)
  return (
    <Container offset={offset} isTodayStartDate={isTodayStartDate}>
      <Label>
        <TYPE.main1 sx={{ color: theme.bg26 }}>
          <Trans>{`Today`}</Trans>
        </TYPE.main1>
      </Label>
      <BulletWrapper>
        <Bullet />
      </BulletWrapper>
    </Container>
  )
}

const Label = styled.div``

const Container = styled.div<{ offset?: string; isTodayStartDate: boolean }>`
  z-index: 1;
  position: absolute;
  left: ${({ offset }) => offset};
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -23px;
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

const BulletWrapper = styled.div``

const Bullet = styled.div`
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.bg26};
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.bg1};
`
