import React from 'react'
import Column, { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'
import { LbpFormValues, MarketData } from '../types'
import { useFormatNumberWithDecimal } from 'state/lbp/hooks'
import { useCurrency } from 'hooks/Tokens'
import { getTokenOption } from 'pages/LBP/components/Tokenomics'

interface MiddleSectionProps {
  lbpData: LbpFormValues | null
  statsData?: MarketData
}



const QuantitiesAndWeight: React.FC<MiddleSectionProps> = ({ lbpData, statsData }) => {
  const tokenCurrency = useCurrency(lbpData?.assetTokenAddress || '')
  const tokenOption = getTokenOption(lbpData?.assetTokenAddress || '', tokenCurrency?.chainId || 1)

  const calculateSharedWeight = (assetWeight: number): number => {
    return 100 - assetWeight
  }

  return (
    <Column>
      <AutoColumn style={{ marginBottom: '20px' }} justify="center" gap="md">
        <RowBetween>
          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>{lbpData?.shareAmount}</TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  {lbpData?.name}
                </TYPE.body3>
              </>
              <VerticalLine />
              <>
              <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>{lbpData?.assetTokenAmount}</TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  {lbpData?.assetTokenSymbol}
                </TYPE.body3>
              </>
            </TokenWrapper>
          </QuantitiesBox>

          <QuantitiesBox>
            <TYPE.subHeader1 color={'#555566'}>Current Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>500.00 </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  {lbpData?.name}
                </TYPE.body3>
              </>
              <VerticalLine />
              <>
              <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>500.00 </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  {lbpData?.assetTokenSymbol}
                </TYPE.body3>
              </>
            </TokenWrapper>
          </QuantitiesBox>
        </RowBetween>
      </AutoColumn>

      <AutoColumn justify="center" gap="md">
        <RowBetween style={{ gap: '25px' }}>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>Start Weight</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>{calculateSharedWeight(lbpData?.startWeight || 0)}% </TYPE.label>
              </>
              <VerticalLine />
              <>
              <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>{lbpData?.startWeight}% </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>Current Weight</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>
                  {useFormatNumberWithDecimal(statsData?.currentShareWeight || '', 2)}%{' '}
                </TYPE.label>
              </>
              <VerticalLine />
              <>
              <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>
                  {useFormatNumberWithDecimal(statsData?.currentAssetWeight || '', 2)}%{' '}
                </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>End Weight</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>{calculateSharedWeight(lbpData?.endWeight || 0)}% </TYPE.label>
              </>
              <VerticalLine />
              <>
              <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>{lbpData?.endWeight}% </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>
        </RowBetween>
      </AutoColumn>
    </Column>
  )
}

const LogoIcon = styled.img`
  // position: absolute;
  // bottom: 21%;
  // left: 11%;
  height: 25px;
  width: 25px;
  border-radius: 50%;
`

export default QuantitiesAndWeight

const WeightBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 250px;
`

const QuantitiesBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 410px;
`

const TokenWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: #e5e5ff;
  margin: 7px 10px;
`
