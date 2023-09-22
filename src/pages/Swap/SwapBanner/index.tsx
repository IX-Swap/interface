import React, { useState } from 'react'
import styled from 'styled-components'
import { TipCard } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CloseColor, CloseIcon } from 'components/AccountDetails/styleds'
import { Box } from 'rebass'
import { InfoIcon } from 'pages/Farming/styleds'

const TipWrapper = styled.span`
  max-width: 592px;
  width: 100%;
`

const DisclaimerHeader = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 0px;
`

const DisclaimerWrapper = styled.div`
  position: relative;
  margin: 20px;
`

const Icon = styled.i`
  position: absolute;
  top: 0px;
  left: -30px;
  cursor: pointer;
`

const CloseButton = styled.i`
  position: absolute;
  top: 0px;
  right: 10px;
  cursor: pointer;
`

const DisclaimerText = styled.p`
  margin-top: 3px;
`

const SwapBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleCloseClick = () => {
    setIsVisible(false)
  }

  return isVisible ? (
    <TipWrapper>
      <ColumnCenter>
        <TipCard style={{ marginBottom: '20px' }}>
          <DisclaimerWrapper>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Icon>
                <InfoIcon />
              </Icon>
              <DisclaimerHeader>Disclaimer:</DisclaimerHeader>
              <CloseButton onClick={handleCloseClick}>
                <CloseColor />
              </CloseButton>
            </Box>
            <DisclaimerText>Dear users,</DisclaimerText>
            <p>
              <br />
              Please be informed that the TAU Digital Token liquidity pool has been listed on the IXS DEX by Julian
              Thomas Tu Hai Kwan who is a Director of AMM (Bahamas) Ltd, which operates the IX Swap platform. Therefore,
              Julian Thomas Tu Hai Kwan may be deemed as having an interest in such listing of and/or any activity in
              connection with the TAU Digital Tokens on the IXS DEX.
              <br /> <br />
              Notwithstanding the foregoing, AMM (Bahamas) Ltd has established policies and procedures to manage,
              minimize and monitor any conflicts of interest, and will take reasonable steps to ensure that the
              interests of IX Swap platform users are not adversely affected.
              <br /> <br />
              If you decide to participate in swapping/trading and/or liquidity provision of TAU Digital Tokens on the
              IXS DEX, you hereby acknowledge that:
              <br /> <br />
              <Box style={{ marginLeft: '20px' }}>
                (a) The appropriate interest disclosures have been fairly made to you;
                <br />
                (b) Your interests shall not be adversely affected by participating in swapping/trading and/or liquidity
                provision of TAU Digital Tokens on the IXS DEX; and
                <br />
                (c) You hereby waive any right to make against AMM (Bahamas) Ltd and/or Julian Thomas Tu Hai Kwan
                regarding any conflict of interest in connection with and/or arising from the listing and/or
                swapping/trading of TAU Digital Tokens on the IXS DEX.
              </Box>
            </p>
          </DisclaimerWrapper>
        </TipCard>
      </ColumnCenter>
    </TipWrapper>
  ) : null
}

export default SwapBanner
