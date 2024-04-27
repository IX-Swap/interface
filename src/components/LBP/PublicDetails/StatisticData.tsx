import React, { useMemo } from 'react'
import Column, { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { LbpFormValues, MarketData } from '../types'
import { useFormatNumberWithDecimal } from 'state/lbp/hooks'

interface MiddleSectionProps {
  lbpData: LbpFormValues | null
  statsData?: MarketData
  isAdmin?: boolean
}

const StatisticData: React.FC<MiddleSectionProps> = ({ statsData, lbpData, isAdmin }) => {
  const calculateFundsRaised = () => {
    if (!statsData || !lbpData) return 0
    const { currentAssetReserve, currentAssetPriceUSD } = statsData
    const { assetTokenAmount } = lbpData
    const reserve = parseFloat(currentAssetReserve) || 0
    const tokenAmount = parseFloat(assetTokenAmount?.toString()) || 0
    const priceUSD = parseFloat(currentAssetPriceUSD) || 0
    return (reserve - tokenAmount) * priceUSD
  }

  function calculatePercentage(currentShareReserve: string | undefined, shareAmount: number | undefined) {
    const currentShareReserveValue = parseFloat(currentShareReserve || '0')
    const shareAmountValue = parseFloat(shareAmount?.toString() || '0')

    if (isNaN(currentShareReserveValue) || isNaN(shareAmountValue) || shareAmountValue <= 0) {
      return 0
    }

    const released = shareAmountValue - currentShareReserveValue
    if (released <= 0) {
      return 0
    }

    const percentage = (released / shareAmountValue) * 100
    return Math.min(percentage, 100)
  }

  const formatValueWithSuffix = (value: number): string => {
    const suffixes = ['', 'K', 'M', 'B']
    const magnitude = Math.floor(Math.log10(Math.abs(value)) / 3)
    const scaledValue = value / Math.pow(10, magnitude * 3)
    return `${scaledValue.toFixed(2)}${suffixes[magnitude]}`
  }

  function calculateTokensReleased(lbpData: LbpFormValues | null, statsData: MarketData | undefined): string {
    if (!lbpData || !statsData) return '0'

    const shareAmount = parseFloat(lbpData?.shareAmount?.toString() || '0')
    const currentShareReserve = parseFloat(statsData?.currentShareReserve?.toString() || '0')
    const tokensReleased = shareAmount - currentShareReserve
    if (!tokensReleased || tokensReleased < 0) return 'N/A'

    return formatValueWithSuffix(tokensReleased)
  }

  const tokensReleased = useMemo(() => calculateTokensReleased(lbpData, statsData), [lbpData, statsData])

  return (
    <Column style={{ display: isAdmin ? '-webkit-box' : '' }}>
      <AutoColumn style={{ marginBottom: '20px' }} justify="center" gap="md">
        <RowBetween>
          <QuantitiesBox isAdmin={isAdmin}>
            <TYPE.subHeader1 color={'#555566'}>Volume</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>$248,050.00</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>

          <QuantitiesBox isAdmin={isAdmin}>
            <TYPE.subHeader1 color={'#555566'}>Liquidity</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>${useFormatNumberWithDecimal(statsData?.liquidityUSD || '', 2)}</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
          <QuantitiesBox isAdmin={isAdmin}>
            <TYPE.subHeader1 color={'#555566'}>Funds Raised</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>${useFormatNumberWithDecimal(calculateFundsRaised(), 2)}</TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
        </RowBetween>
      </AutoColumn>

      <AutoColumn style={{ marginBottom: '30px' }} justify="center" gap="md">
        <RowBetween>
          <QuantitiesBox isAdmin={isAdmin}>
            <TYPE.subHeader1 color={'#555566'}>Circ. Marketcap</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>
                ${useFormatNumberWithDecimal(statsData?.circMarketCapUSD || '', 2)}
              </TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>

          <QuantitiesBox isAdmin={isAdmin}>
            <TYPE.subHeader1 color={'#555566'}>FDV Marketcap</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'}>
                ${useFormatNumberWithDecimal(statsData?.fdvMarketCapUSD || '', 2)}
              </TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
          <QuantitiesBox isAdmin={isAdmin}>
            <TYPE.subHeader1 color={'#555566'}>Tokens Released</TYPE.subHeader1>
            <TokenWrapper style={{ placeContent: 'space-between' }}>
              <TYPE.label fontSize={'14px'}>
                {tokensReleased}/{formatValueWithSuffix(parseFloat(lbpData?.shareAmount?.toString() || '0'))}
              </TYPE.label>

              <TYPE.label color={'#6666FF'} fontSize={'14px'}>
                {`${calculatePercentage(statsData?.currentShareReserve, lbpData?.shareAmount).toFixed(2)}%`}
              </TYPE.label>
            </TokenWrapper>
          </QuantitiesBox>
        </RowBetween>
      </AutoColumn>
    </Column>
  )
}

const QuantitiesBox = styled.div<{ isAdmin?: boolean }>`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: ${(props) => (props.isAdmin ? '190px' : '270px')};
  margin-right: ${(props) => (props.isAdmin ? '20px' : '0')};
`

const TokenWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

export default StatisticData
