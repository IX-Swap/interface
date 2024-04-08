import React, { useState, useMemo } from 'react'
import styled from 'styled-components/macro'
import Column, { AutoColumn, ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import SideBar from './SideBar'
import { Links } from './Links'
import QuantitiesAndWeight from './QuantitiesAndWeight'
import { Line } from 'components/Line'
import DetailsChart from './PublicChart'
import VolumeData from './VolumeData'
import { EmptyTable } from '../Dashboard/EmptyTable'
import { LbpsFull } from '../Dashboard/LbpsFull'
import TradeHistory from './HistoryTable'

const MiddleSectionWrapper = styled.div`
  background: #ffffff;
  padding: 0 80px;
  width: 100vw;

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

export default function MiddleSection() {
  const [showMore, setShowMore] = useState(false)

  const sampleText = useMemo(
    () =>
      `Serenity is a blockchain-based project aimed at revolutionizing the digital asset management landscape. With its innovative platform, Serenity offers users a seamless and secure environment to engage in decentralized finance (DeFi) activities, including trading, lending, and staking. Built on cutting-edge technology, Serenity prioritizes user privacy and security, ensuring that transactions are executed swiftly and transparently. Whether you're a seasoned investor or new to the world of cryptocurrencies, Serenity provides a user-friendly interface and robust tools to empower individuals to maximize their financial potential. Join the Serenity ecosystem today and experience the future of decentralized finance firsthand.`,
    []
  )

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
          <Links links={undefined} />
          <Line style={{ margin: '40px 0px' }} />
          <QuantitiesAndWeight />
          <DetailsChart />
          <VolumeData />
        </Column>
        <Column>
          <SideBar />
        </Column>
      </MiddleSectionContainer>
      <TradeHistory/>
    </MiddleSectionWrapper>
  )
}
