import React, { useEffect, useState } from 'react'
import Column, { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import _get from 'lodash/get'

import { TYPE } from 'theme'
import { LbpFormValues, LbpStatus, MarketData } from '../types'
import { useFormatNumberWithDecimal } from 'state/lbp/hooks'
import { useCurrency } from 'hooks/Tokens'
import { getTokenOption } from 'pages/LBP/components/Tokenomics'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'

interface QuantitiesAndWeightProps {
  lbpData: LbpFormValues | null
  statsData?: MarketData
  shareSymbol: string
}

const QuantitiesAndWeight: React.FC<QuantitiesAndWeightProps> = ({ lbpData, statsData, shareSymbol }) => {
  const tokenCurrency = useCurrency(lbpData?.assetTokenAddress || '')

  const tokenOption = getTokenOption(
    lbpData?.assetTokenAddress || '',
    tokenCurrency?.chainId || ENV_SUPPORTED_TGE_CHAINS?.[0] || 1
  )
  const status = _get(lbpData, 'status', '')

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
                  {shareSymbol || lbpData?.title}
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

          {status && ![LbpStatus.ended, LbpStatus.closed, LbpStatus.pending].includes(status as any) ? (
            <QuantitiesBox>
              <TYPE.subHeader1 color={'#555566'}>Current Quantities</TYPE.subHeader1>
              <TokenWrapper>
                <>
                  <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                  <TYPE.label fontSize={'14px'}>
                    {useFormatNumberWithDecimal(statsData?.currentShareReserve || '', 2)}{' '}
                  </TYPE.label>
                  <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                    {shareSymbol || lbpData?.title}
                  </TYPE.body3>
                </>
                <VerticalLine />
                <>
                  <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                  <TYPE.label fontSize={'14px'}>
                    {useFormatNumberWithDecimal(statsData?.currentAssetReserve || '', 2)}{' '}
                  </TYPE.label>
                  <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                    {lbpData?.assetTokenSymbol}
                  </TYPE.body3>
                </>
              </TokenWrapper>
            </QuantitiesBox>
          ) : null}
        </RowBetween>
      </AutoColumn>

      <AutoColumn justify="center" gap="md">
        <RowBetween style={{ gap: '25px' }}>
          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>Start Weight</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>{lbpData?.startWeight}% </TYPE.label>
              </>
              <VerticalLine />
              <>
                <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>{calculateSharedWeight(lbpData?.startWeight || 0)}% </TYPE.label>
              </>
            </TokenWrapper>
          </WeightBox>

          {status && ![LbpStatus.ended, LbpStatus.closed, LbpStatus.pending].includes(status as any) ? (
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
          ) : null}

          <WeightBox>
            <TYPE.subHeader1 color={'#555566'}>End Weight</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <LogoIcon as="img" src={lbpData?.logo?.public} alt="Serenity Logo" />
                <TYPE.label fontSize={'14px'}>{lbpData?.endWeight}% </TYPE.label>
              </>
              <VerticalLine />
              <>
                <LogoIcon as="img" src={tokenOption?.logo} alt="Asset Logo" />
                <TYPE.label fontSize={'14px'}>{calculateSharedWeight(lbpData?.endWeight || 0)}% </TYPE.label>
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
