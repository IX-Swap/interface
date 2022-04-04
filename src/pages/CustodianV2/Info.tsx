import React from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

export const Info = () => {
  return (
    <Container>
      <div>
        <Trans>
          To trade/swap Security Tokens make sure that you have passed issuer accreditation. To do this, click on the
          desired Security Token below.
        </Trans>
      </div>
      <div>
        <Trans>
          You need to complete this process for each Security Tokens you would like to trade. The Accreditation is being
          verified by the Custodian and can take up to 1-3 days.
        </Trans>
      </div>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 32px;
  margin-bottom: 40px;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.text2};
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`
