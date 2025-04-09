import React, { useEffect, useState } from 'react'
import Column from 'components/Column'
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
import Countdown, { renderer } from 'components/Countdown'
import { TokenLogo } from 'components/TokenLogo'

interface SummaryFieldsProps {
  noOfParticipants: number
  lbpData: LbpFormValues | null
  statsData?: MarketData
}

const SummaryFields: React.FC<SummaryFieldsProps> = ({ lbpData, noOfParticipants, statsData }) => {
  const shareTokenContract = useTokenContract(lbpData?.shareAddress ?? '')
  const tokenCurrency = useCurrency(lbpData?.assetTokenAddress || '')

  const [shareSymbol, setShareSymbol] = useState<string>('')

  const tokenOption = getTokenOption(
    lbpData?.assetTokenAddress || '',
    tokenCurrency?.chainId || ENV_SUPPORTED_TGE_CHAINS?.[0] || 1
  )
  const status = _get(lbpData, 'status', '')
  const currentSharePriceUSD = statsData?.currentSharePriceUSD
  const endDate = lbpData?.endDate ? new Date(lbpData?.endDate) : new Date()

  const calculateSharedWeight = (assetWeight: number): number => {
    return 100 - assetWeight
  }

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
      <GridContainer4Columns>
        <GridItem4Columns style={{ background: '#F7F7FA' }}>
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
        </GridItem4Columns>

        <GridItem4Columns>
          <TYPE.subHeader1 color={'#555566'}>LBP closes in</TYPE.subHeader1>
          <TokenWrapper>
            <TYPE.label fontSize={'14px'} marginTop={9}>
              <Countdown date={endDate} renderer={renderer} />
            </TYPE.label>
          </TokenWrapper>
        </GridItem4Columns>

        <GridItem4Columns>
          <TYPE.subHeader1 color={'#555566'}>No. of Participants</TYPE.subHeader1>
          <TokenWrapper>
            <TYPE.label fontSize={'14px'} marginTop={9}>
              {noOfParticipants}
            </TYPE.label>
          </TokenWrapper>
        </GridItem4Columns>

        <GridItem4Columns>
          <TYPE.subHeader1 color={'#555566'}>Current Price</TYPE.subHeader1>
          <TokenWrapper>
            <TYPE.label fontSize={'14px'} marginTop={9}>
              ${useFormatNumberWithDecimal(currentSharePriceUSD || 0, 3)}
            </TYPE.label>
          </TokenWrapper>
        </GridItem4Columns>
      </GridContainer4Columns>

      <GridContainer2Columns>
        <GridItem2Columns>
          <TYPE.subHeader1 color={'#555566'}>Start Quantities</TYPE.subHeader1>
          <TokenWrapper>
            <>
              <TokenLogo logo={lbpData?.logo} width="25px" height="25px" />
              <TYPE.label fontSize={'14px'}>{lbpData?.shareAmount}</TYPE.label>
              <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                {shareSymbol || lbpData?.title}
              </TYPE.body3>
            </>
            <VerticalLine />
            <>
              <TokenLogo logo={tokenOption?.logo} width="25px" height="25px" />
              <TYPE.label fontSize={'14px'}>{lbpData?.assetTokenAmount}</TYPE.label>
              <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                {lbpData?.assetTokenSymbol}
              </TYPE.body3>
            </>
          </TokenWrapper>
        </GridItem2Columns>

        {status && ![LbpStatus.ended, LbpStatus.closed, LbpStatus.pending].includes(status as any) ? (
          <GridItem2Columns>
            <TYPE.subHeader1 color={'#555566'}>Current Quantities</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <TokenLogo logo={lbpData?.logo} width="25px" height="25px" />
                <TYPE.label fontSize={'14px'}>
                  {useFormatNumberWithDecimal(statsData?.currentShareReserve || '', 2)}{' '}
                </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  {shareSymbol || lbpData?.title}
                </TYPE.body3>
              </>
              <VerticalLine />
              <>
                <TokenLogo logo={tokenOption?.logo} width="25px" height="25px" />
                <TYPE.label fontSize={'14px'}>
                  {useFormatNumberWithDecimal(statsData?.currentAssetReserve || '', 2)}{' '}
                </TYPE.label>
                <TYPE.body3 color={'#8F8FB2'} fontWeight={'700'}>
                  {lbpData?.assetTokenSymbol}
                </TYPE.body3>
              </>
            </TokenWrapper>
          </GridItem2Columns>
        ) : null}
      </GridContainer2Columns>

      <GridContainer3Columns>
        <GridItem3Columns>
          <TYPE.subHeader1 color={'#555566'}>Start Weight</TYPE.subHeader1>
          <TokenWrapper>
            <>
              <TokenLogo logo={lbpData?.logo} width="25px" height="25px" />
              <TYPE.label fontSize={'14px'}>{lbpData?.startWeight}% </TYPE.label>
            </>
            <VerticalLine />
            <>
              <TokenLogo logo={tokenOption?.logo} width="25px" height="25px" />
              <TYPE.label fontSize={'14px'}>{calculateSharedWeight(lbpData?.startWeight || 0)}% </TYPE.label>
            </>
          </TokenWrapper>
        </GridItem3Columns>

        {status && ![LbpStatus.ended, LbpStatus.closed, LbpStatus.pending].includes(status as any) ? (
          <GridItem3Columns>
            <TYPE.subHeader1 color={'#555566'}>Current Weight</TYPE.subHeader1>
            <TokenWrapper>
              <>
                <TokenLogo logo={lbpData?.logo} width="25px" height="25px" />
                <TYPE.label fontSize={'14px'}>
                  {useFormatNumberWithDecimal(statsData?.currentShareWeight || '', 2)}%{' '}
                </TYPE.label>
              </>
              <VerticalLine />
              <>
                <TokenLogo logo={tokenOption?.logo} width="25px" height="25px" />
                <TYPE.label fontSize={'14px'}>
                  {useFormatNumberWithDecimal(statsData?.currentAssetWeight || '', 2)}%{' '}
                </TYPE.label>
              </>
            </TokenWrapper>
          </GridItem3Columns>
        ) : null}

        <GridItem3Columns>
          <TYPE.subHeader1 color={'#555566'}>End Weight</TYPE.subHeader1>
          <TokenWrapper>
            <>
              <TokenLogo logo={lbpData?.logo} width="25px" height="25px" />
              <TYPE.label fontSize={'14px'}>{lbpData?.endWeight}% </TYPE.label>
            </>
            <VerticalLine />
            <>
              <TokenLogo logo={tokenOption?.logo} width="25px" height="25px" />
              <TYPE.label fontSize={'14px'}>{calculateSharedWeight(lbpData?.endWeight || 0)}% </TYPE.label>
            </>
          </TokenWrapper>
        </GridItem3Columns>
      </GridContainer3Columns>
    </Column>
  )
}

export default SummaryFields

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

const GridContainer2Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 20px;
`

const GridItem2Columns = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 410px;

  &:only-child {
    grid-column: 1 / -1; /* Makes the only child span all columns */
  }
`

const GridContainer3Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
`

const GridItem3Columns = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 250px;

  &:only-child {
    grid-column: 1 / -1; /* Makes the only child span all columns */
  }
`

const GridContainer4Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 18px;
  margin-bottom: 20px;
`

const GridItem4Columns = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  width: auto;
  height: 80px;
  gap: 20px;
  padding: 16px;
  min-width: 300px;

  &:only-child {
    grid-column: 1 / -1; /* Makes the only child span all columns */
  }
`
