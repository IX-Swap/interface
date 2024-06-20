import React, { useEffect, useState } from 'react'
import Column, { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import _get from 'lodash/get'

import { TYPE } from 'theme'
import { LbpFormValues, LbpStatus, MarketData } from 'components/LBP/types'
import { useFormatNumberWithDecimal } from 'state/lbp/hooks'
import { useCurrency } from 'hooks/Tokens'
import Copy from 'components/AccountDetails/Copy'
import { getTokenOption } from 'pages/LBP/components/Tokenomics'
import { useTokenContract } from 'hooks/useContract'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'

interface SummaryFieldsProps {
  noOfParticipants: number
  lbpData: LbpFormValues | null
  statsData?: MarketData
}

const SummaryFields: React.FC<SummaryFieldsProps> = ({ lbpData, noOfParticipants, statsData }) => {
  const shareTokenContract = useTokenContract(lbpData?.shareAddress ?? '')
  const [remainingTime, setRemainingTime] = useState(28 * 24 * 60 * 60)
  const tokenCurrency = useCurrency(lbpData?.assetTokenAddress || '')

  const [shareSymbol, setShareSymbol] = useState<string>('')

  const tokenOption = getTokenOption(
    lbpData?.assetTokenAddress || '',
    tokenCurrency?.chainId || ENV_SUPPORTED_TGE_CHAINS?.[0] || 1
  )
  const status = _get(lbpData, 'status', '')
  const currentSharePriceUSD = statsData?.currentSharePriceUSD

  const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60))
  const remainingHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60))

  const calculateSharedWeight = (assetWeight: number): number => {
    return 100 - assetWeight
  }

  const isClosed = React.useMemo(
    () => !!lbpData?.status && [LbpStatus.closed, LbpStatus.ended, LbpStatus.pending].includes(lbpData?.status),
    [lbpData?.status]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const calculateRemainingTime = () => {
      if (lbpData && lbpData.startDate && lbpData.endDate) {
        const endDate = new Date(lbpData.endDate).getTime()
        const currentTime = new Date().getTime()
        const remainingTimeInSeconds = Math.max(0, endDate - currentTime) / 1000
        setRemainingTime(remainingTimeInSeconds)
      }
    }
    calculateRemainingTime()
    const interval = setInterval(() => {
      calculateRemainingTime()
    }, 1000)

    return () => clearInterval(interval)
  }, [lbpData])

  useEffect(() => {
    async function fetchShareSymbol() {
      if (shareTokenContract) {
        const symbol = await shareTokenContract.symbol()
        setShareSymbol(symbol)
      }
    }
    fetchShareSymbol()
  }, [shareTokenContract])

  return (
    <Column>
      <AutoColumn style={{ marginBottom: '20px' }} justify="center" gap="md">
        <RowBetween>
          <TopBox style={{ background: '#F7F7FA' }}>
            <TYPE.subHeader1 color={'#8F8FB2'}>Token Address</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'} marginTop={9}>
                  <Copy toCopy={lbpData?.shareAddress ?? ''}>
                    {lbpData?.shareAddress
                      ? `${lbpData?.shareAddress.substring(0, 7)}...${lbpData?.shareAddress.substring(
                          lbpData?.shareAddress.length - 10
                        )}`
                      : null}
                  </Copy>
                </TYPE.body3>
              </>
            </TokenWrapper>
          </TopBox>

          <TopBox>
            <TYPE.subHeader1 color={'#555566'}>LBP closes in</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'} marginTop={9}>
                {remainingDays > 0 ? `${remainingDays} Days` : `${remainingHours} Hours`}
              </TYPE.label>
            </TokenWrapper>
          </TopBox>

          <TopBox>
            <TYPE.subHeader1 color={'#555566'}>No. of Participants</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'} marginTop={9}>
                {noOfParticipants}
              </TYPE.label>
            </TokenWrapper>
          </TopBox>

          <TopBox>
            <TYPE.subHeader1 color={'#555566'}>Current Price</TYPE.subHeader1>
            <TokenWrapper>
              <TYPE.label fontSize={'14px'} marginTop={9}>
                ${useFormatNumberWithDecimal(currentSharePriceUSD || 0, 3)}
              </TYPE.label>
            </TokenWrapper>
          </TopBox>
        </RowBetween>
      </AutoColumn>
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
  height: 25px;
  width: 25px;
  border-radius: 50%;
`

export default SummaryFields

const TopBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 300px;
`

const WeightBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 410px;
`

const QuantitiesBox = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 600px;
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
