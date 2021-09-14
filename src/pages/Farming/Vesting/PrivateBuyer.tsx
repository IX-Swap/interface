import { Trans } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as PrivateSaleIcon } from '../../../assets/images/private-sale.svg'

export const PrivateBuyer = () => {
  return (
    <Container>
      <Icon />
      <Info>
        <Trans>
          Hi! Сurrently you have <b>128,000</b> of unvested IXS that will be vested over the next <b>23 months</b>. Your
          next IXS payment will be available on <b>8 October</b> and vesting balances will be updated here.
        </Trans>
      </Info>
    </Container>
  )
}

const Container = styled.div`
  background: ${({ theme: { bgG15 } }) => bgG15};
  border-radius: 30px;
  backdrop-filter: blur(20px);
  min-height: 265px;
  display: grid;
  grid-template-columns: 214px auto;
  grid-gap: 78px;
  align-items: center;
  padding: 0px 138px 0 77px;
  margin: 0px 15px;
  @media (max-width: 1024px) {
    padding: 0px 50px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    min-height: fit-content;
    padding: 32px;
  }
`

const Icon = styled(PrivateSaleIcon)`
  @media (max-width: 768px) {
    display: none;
  }
`

const Info = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  font-size: 20px;
  line-height: 30px;
  > b {
    color: white;
  }
`
