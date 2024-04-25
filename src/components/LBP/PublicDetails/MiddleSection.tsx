import React, { useState, useMemo } from 'react'
import styled from 'styled-components/macro'
import Column, { AutoColumn, ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import SideBar from './SideBar'
import QuantitiesAndWeight from './QuantitiesAndWeight'
import { Line } from 'components/Line'
import DetailsChart from './PublicChart'
import VolumeData from './VolumeData'
import { EmptyTable } from '../Dashboard/EmptyTable'
import { LbpsFull } from '../Dashboard/LbpsFull'
import TradeHistory from './HistoryTable'
import AdditionalDocuments from './DocumentSec'
import ComingSoon from './ComingSoon'
import EndedSideBar from './Ended'
import CloseSideBar from './ClosedSideBar'
import { LbpFormValues, MarketData } from '../types'
import Links from './Links'
import RedeemedSideBar from './RedeemedSideBar'

interface MiddleSectionProps {
  lbpData: LbpFormValues | null
  statsData?: MarketData
}

const MiddleSectionWrapper = styled.div`
  background: #ffffff;
  padding: 0px 80px;
  margin: 0px 200px;
`

const MiddleSectionContainer = styled.div`
  margin-top: 80px;
  background: #ffffff;
  display: flex;
  gap: 50px;
`

const ContentColumn = styled(ColumnCenter)`
  width: 100%;
  align-items: baseline;
  @media (min-width: 768px) {
    & + & {
      margin-left: 80px;
    }
  }
  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`

const MoreText = styled.span`
  color: blue;
  cursor: pointer;
`

const MiddleSection: React.FC<MiddleSectionProps> = ({ lbpData, statsData }) => {
  const [showMore, setShowMore] = useState(false)

  const sampleText = useMemo(() => `${lbpData?.description}`, [lbpData])

  const isTextLong = useMemo(() => sampleText.length > 300, [sampleText])

  return (
    <MiddleSectionWrapper>
      <MiddleSectionContainer>
        <Column>
          <TYPE.body1 color={'#666680'}>
            {showMore || !isTextLong ? sampleText : sampleText.slice(0, 300) + '...'}
            {isTextLong && !showMore && <MoreText onClick={() => setShowMore(true)}>Read More</MoreText>}
            {showMore && <MoreText onClick={() => setShowMore(false)}>Read Less</MoreText>}
          </TYPE.body1>
          <Links lbpData={lbpData} />
          <Line style={{ margin: '40px 0px' }} />
          <QuantitiesAndWeight statsData={statsData} lbpData={lbpData} />
          <DetailsChart />
          <VolumeData statsData={statsData}  lbpData={lbpData} />
        </Column>
        <Column>
          <SideBar lbpData={lbpData} />
          {/* <ComingSoon/> */}
          {/* <EndedSideBar/> */}
          {/* <CloseSideBar/> */}
          {/* <RedeemedSideBar/> */}
          <AdditionalDocuments />
        </Column>
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
