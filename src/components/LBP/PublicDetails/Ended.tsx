import React from 'react'
import styled from 'styled-components'
import { ColumnCenter } from 'components/Column'
import { ReactComponent as ComingSoonIcon } from '../../../assets/images/ended.svg'
import { TYPE } from 'theme'
import { Line } from 'components/Line'
import { PinnedContentButton } from 'components/Button'

export default function EndedSideBar() {
  return (
    <SideBarContainer>
      <MiddleSection>
        <ComingSoonIcon />
        <TYPE.body5 margin={'12px 0px'} color={'#292933'}>
          Ended
        </TYPE.body5>
        <TimeContainer>
          <TimeItem>
            <TYPE.description7 color={'#FFA800'}>00</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Days</TYPE.description3>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TYPE.description7 color={'#FFA800'}>00</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Hours</TYPE.description3>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TYPE.description7 color={'#FFA800'}>00</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Mins</TYPE.description3>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TYPE.description7 color={'#FFA800'}>00</TYPE.description7>
            <TYPE.description3 color={'#8F8FB2'}>Secs</TYPE.description3>
          </TimeItem>
        </TimeContainer>
        <DesContainer>
          <TYPE.description3>
            Tokens purchased with and without vesting in a LBP, must be redeem by clicking the “Redeem” button below at
            the end of the LBP. If the LBP you participated in has vested tokens, you can view the token stream using
            the link below.
          </TYPE.description3>
        </DesContainer>
        <Line style={{margin: '20px 8px'}}/>
        <ShareWrapper>
            <TYPE.description2 color={'#8F8FB2'}>Purchased Shares:</TYPE.description2>
            <TYPE.subHeader1>3,800.00</TYPE.subHeader1>
        </ShareWrapper>
        <Line style={{margin: '20px 8px'}}/>
        <PinnedContentButton margin={'0px 15px'} disabled>Claim</PinnedContentButton>
      </MiddleSection>
    </SideBarContainer>
  )
}

const ShareWrapper = styled.div`
display: flex;
justify-content: space-between;
margin: 0px 15px;
`

const DesContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 0px 30px;
`

const VerticalLine = styled.div`
  width: 1px;
  height: 76px;
  background-color: #e5e5ff;
  margin: 7px 10px;
`

const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const SideBarContainer = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  height: auto;
  padding: 20px;
  width: 400px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`

const MiddleSection = styled.div`
  margin: 20px 0;
  background: #ffffff;
  text-align: center;
`

const ContentColumn = styled(ColumnCenter)`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  @media (min-width: 768px) {
    & + & {
      margin-left: 20px;
    }
  }
`
