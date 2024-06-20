import React from 'react'
import styled, { css } from 'styled-components'
import backgroundImg from '../../../assets/images/background.jpg'
// import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { ReactComponent as ArrowUp } from '../../../assets/images/varyArrow.svg'
import { TYPE } from 'theme'
import { LbpFormValues } from '../types'
import { useFormatNumberWithDecimal } from 'state/lbp/hooks'

interface BackgroundProps {
  lbpData: LbpFormValues | null
  currentSharePriceUSD?: string
}

const FullWidthContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 400px;
  overflow: hidden;
`

const FullWidthImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LogoIcon = styled.img`
  position: absolute;
  bottom: 21%;
  left: 11%;
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Description = styled(TYPE.description7)`
  position: absolute;
  bottom: 22%;
  left: 15.5%;
  color: #ffffff;
`

const Amount = styled(TYPE.description7)`
  position: absolute;
  bottom: 22%;
  right: 10%;
  color: #ffffff;
`

const Vary = styled.div<{ positive: boolean }>`
  position: absolute;
  bottom: 23%;
  right: 18.5%;
  color: #ffffff;
  padding: 8px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  ${({ positive }) =>
    positive
      ? `
    background: #1FBA66;
  `
      : `
    background: #FF6161;
  `}
`

const Arrow = styled.div<{ rotateArrow?: boolean }>`
  margin-right: 5px;
  ${({ rotateArrow }) =>
    rotateArrow &&
    css`
      transform: rotate(180deg);
    `}
`

const Background: React.FC<BackgroundProps> = ({ lbpData, currentSharePriceUSD }) => {
  const varyValue = 3.28
  const isPositive = varyValue > 0

  return (
    <FullWidthContainer>
        <FullWidthImage src={lbpData?.banner.public} alt="Background" />
        {lbpData && lbpData.logo && (
        <LogoIcon as="img" src={lbpData.logo.public} alt="Serenity Logo" />
      )}
      <Description fontSize={'48px'}>{lbpData?.title}</Description>
      <Amount fontSize={'40px'}>${useFormatNumberWithDecimal(currentSharePriceUSD || 0, 3)}</Amount>
      {/* <Vary positive={isPositive}>
        <Arrow rotateArrow={!isPositive}>
          <ArrowUp />
        </Arrow>
        {Math.abs(varyValue)}%
      </Vary> */}
    </FullWidthContainer>
  )
}
export default Background
