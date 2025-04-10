import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components/macro'
import Column from 'components/Column'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import SideBar from './SideBar'
import QuantitiesAndWeight from './QuantitiesAndWeight'
import { Line } from 'components/Line'
import DetailsChart from './PublicChart'
import StatisticData from './StatisticData'
import TradeHistory from './HistoryTable'
import AdditionalDocuments from './DocumentSec'
import ComingSoon from './ComingSoon'
import EndedSideBar from './Ended'
import { LbpFormValues, MarketData, LbpStatus } from '../types'
import Links from './Links'
import RedeemedSideBar from './RedeemedSideBar'
import { useTokenContract } from 'hooks/useContract'
import SideBarPaused from './SideBarPaused'
import { isMobile } from 'react-device-detect'
import { checkWrongChain } from 'utils/chains'
import { useWeb3React } from 'hooks/useWeb3React'

interface MiddleSectionProps {
  lbpData: LbpFormValues | null
  statsData?: MarketData
}

const MiddleSectionWrapper = styled.div`
  background: #ffffff;
  padding: 0px 80px;
  margin: 0px 200px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0px 20px;
    margin: 0px;
    width: -webkit-fill-available;
  }
`

const MiddleSectionContainer = styled.div`
  margin-top: 80px;
  background: #ffffff;
  display: flex;
  gap: 50px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    gap: 20px;
  }
`

const MoreText = styled.span`
  color: blue;
  cursor: pointer;
`

const MiddleSection: React.FC<MiddleSectionProps> = ({ lbpData, statsData }) => {
  const shareTokenContract = useTokenContract(lbpData?.shareAddress ?? '')
  const { chainId } = useWeb3React()

  const [showMore, setShowMore] = useState(false)
  const [shareSymbol, setShareSymbol] = useState<string>('')

  const sampleText = useMemo(() => `${lbpData?.description}`, [lbpData])
  const isTextLong = useMemo(() => sampleText.length > 300, [sampleText])
  const network = lbpData?.network ?? ''
  const { isWrongChain } = checkWrongChain(chainId, network)

  const SideBarByStatus = useMemo(() => {
    switch (lbpData?.status) {
      case LbpStatus.pending:
        return <ComingSoon lbpData={lbpData} />
      case LbpStatus.live:
        return <SideBar lbpData={lbpData} />
      case LbpStatus.ended:
        return (
          <EndedSideBar
            shareLogo={lbpData?.logo}
            shareName={shareSymbol}
            contractAddress={lbpData?.contractAddress || ''}
          />
        )
      case LbpStatus.paused:
        return <SideBarPaused lbpData={lbpData} shareLogo={lbpData?.logo} shareName={shareSymbol} />
      case LbpStatus.closed:
        return (
          <RedeemedSideBar
            shareLogo={lbpData?.logo}
            shareName={shareSymbol}
            contractAddress={lbpData?.contractAddress || ''}
          />
        )
    }
  }, [lbpData, shareSymbol])

  useEffect(() => {
    async function fetchShareSymbol() {
      if (shareTokenContract) {
        const symbol = await shareTokenContract.symbol()
        setShareSymbol(symbol)
      }
    }

    if (!isWrongChain) {
      fetchShareSymbol()
    }
  }, [lbpData?.shareAddress, isWrongChain])

  return (
    <MiddleSectionWrapper>
      <MiddleSectionContainer>
        {isMobile && (
          <Column>
            {SideBarByStatus}
            <AdditionalDocuments uploadDocs={lbpData?.uploadDocs || []} />
          </Column>
        )}
        <Column>
          <TYPE.body1 color={'#666680'}>
            {showMore || !isTextLong ? sampleText : sampleText.slice(0, 300) + '...'}
            {isTextLong && !showMore && <MoreText onClick={() => setShowMore(true)}>Read More</MoreText>}
            {showMore && <MoreText onClick={() => setShowMore(false)}>Read Less</MoreText>}
          </TYPE.body1>
          <Links lbpData={lbpData} />
          <Line style={{ margin: '40px 0px' }} />
          <QuantitiesAndWeight statsData={statsData} lbpData={lbpData} shareSymbol={shareSymbol} />
          <DetailsChart
            contractAddress={lbpData?.contractAddress}
            startDate={lbpData?.startDate}
            endDate={lbpData?.endDate}
            startWeight={lbpData?.startWeight}
            endWeight={lbpData?.endWeight}
            shareAmount={lbpData?.shareAmount}
            assetAmount={lbpData?.assetTokenAmount}
            currentShareReserve={statsData?.currentShareReserve}
            currentAssetReserve={statsData?.currentAssetReserve}
          />
          <StatisticData statsData={statsData} lbpData={lbpData} />
        </Column>
        {!isMobile && (
          <Column>
            {SideBarByStatus}
            <AdditionalDocuments uploadDocs={lbpData?.uploadDocs || []} />
          </Column>
        )}
      </MiddleSectionContainer>
      <TradeHistory
        contractAddress={lbpData?.contractAddress}
        assetTokenAddress={lbpData?.assetTokenAddress}
        shareToken={lbpData?.logo}
      />
    </MiddleSectionWrapper>
  )
}

export default MiddleSection
