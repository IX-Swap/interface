import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { ReactComponent as ComingSoonIcon } from '../../../assets/images/comingSoon.svg'
import { TYPE } from 'theme'
import { LbpFormValues } from '../types'

interface ComingBarProps {
  lbpData: LbpFormValues | null
}

export default function ComingSoon({ lbpData }: ComingBarProps) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime())

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = calculateRemainingTime()
      setRemainingTime(newRemainingTime)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [calculateRemainingTime])

  function calculateRemainingTime() {
    if (lbpData && lbpData.startDate) {
      const startDate = new Date(lbpData.startDate).getTime()
      const now = new Date().getTime()
      const remainingTimeInSeconds = Math.max(0, startDate - now) / 1000
      return remainingTimeInSeconds
    }
    return 0
  }

  const remainingDays = Math.floor(remainingTime / (24 * 60 * 60))
  const remainingHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60))
  const remainingMinutes = Math.floor((remainingTime % (60 * 60)) / 60)
  const remainingSeconds = Math.floor(remainingTime % 60)

  return (
    <SideBarContainer>
      <MiddleSection>
        <ComingSoonIcon />
        <TYPE.body5 margin={'12px 0px'} color={'#292933'}>
          Coming Soon
        </TYPE.body5>
        <TYPE.subHeader1 margin={'15px 0px'} color={'#292933'}>
          Starts in
        </TYPE.subHeader1>
        <TimeContainer>
          {remainingDays > 0 ? (
            <TimeItem>
              <TYPE.description7 fontSize={'64px'} color={'#6666FF'}>
                {remainingDays}
              </TYPE.description7>
              <TYPE.description3 color={'#6666FF'}>Days</TYPE.description3>
            </TimeItem>
          ) : (
            <>
              <TimeItem>
                <TYPE.description7 color={'#6666FF'}>{remainingHours}</TYPE.description7>
                <TYPE.description3 color={'#8F8FB2'}>Hours</TYPE.description3>
              </TimeItem>
              <VerticalLine />
              <TimeItem>
                <TYPE.description7 color={'#6666FF'}>{remainingMinutes}</TYPE.description7>
                <TYPE.description3 color={'#8F8FB2'}>Mins</TYPE.description3>
              </TimeItem>
              <VerticalLine />
              <TimeItem>
                <TYPE.description7 color={'#6666FF'}>{remainingSeconds}</TYPE.description7>
                <TYPE.description3 color={'#8F8FB2'}>Secs</TYPE.description3>
              </TimeItem>
            </>
          )}
        </TimeContainer>
        <DesContainer>
          <TYPE.description3>This LBP is coming soon. Check back soon and stay up to date.</TYPE.description3>
        </DesContainer>
        <ButtonStyle>Coming Soon</ButtonStyle>
      </MiddleSection>
    </SideBarContainer>
  )
}

const ButtonStyle = styled.button`
  border: 1px solid #6666ff33;
  color: #6666ff;
  border-radius: 8px;
  padding: 15px 30px;
  background: #f0f0ff;
  margin-top: 30px;
  cursor: pointer;
`

const DesContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 0px 67px;
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
