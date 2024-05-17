import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'

import { LbpStatus } from '../types'
import { text5 } from 'components/LaunchpadMisc/typography'

interface Props {
  isClosed: boolean
  daysTillEnded?: number
  hoursTillEnded?: number
  allowOnlyAccredited: boolean
  status: string
  startDate: string
  margin?: string
}

function calculateRemainingTime(startDate: string) {
  if (startDate) {
    const startTime = new Date(startDate).getTime()
    const now = new Date().getTime()
    const remainingTimeInSeconds = Math.max(0, startTime - now) / 1000
    return remainingTimeInSeconds
  }
  return 0
}

export const LbpSaleStatusInfo: React.FC<Props> = (props) => {
  const [remainingTime, setRemainingTime] = useState(0)

  const startDate = _get(props, 'startDate', '');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = calculateRemainingTime(startDate)
      setRemainingTime(newRemainingTime)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [calculateRemainingTime])

  const info = props.hoursTillEnded
    ? `${props.hoursTillEnded > 1 ? `${props.hoursTillEnded} Hours` : 'Less than 1 Hour'}`
    : props.daysTillEnded
    ? `${props.daysTillEnded} ${props.daysTillEnded > 1 ? 'Days' : 'Day'}`
    : null

  if ([LbpStatus.ended, LbpStatus.closed].includes(props.status as LbpStatus)) {
    let label: string = ''
    switch (props.status) {
      case LbpStatus.closed:
        label = 'Closed'
        break
      case LbpStatus.ended:
        label = 'Ended'
        break
    }
    return (
      <ActiveContainer status={props.status}>
        <span className="bold">{label}</span>
      </ActiveContainer>
    )
  }

  if ([LbpStatus.pending].includes(props.status as LbpStatus)) {
    const remainingDays = Math.floor(remainingTime / (24 * 60 * 60))
    const remainingHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60))
    const remainingMinutes = Math.floor((remainingTime % (60 * 60)) / 60)
    const remainingSeconds = Math.floor(remainingTime % 60)

    let displayTime = ''

    if (remainingDays > 0) {
      displayTime = remainingDays === 1 ? `${remainingDays} day` : `${remainingDays} days`

      return (
        <ActiveContainer status={props.status}>
          <span className="bold">{displayTime}</span> until LBP starts
        </ActiveContainer>
      )
    } else {
      return (
        <WrapTime>
          <TimeItem>
            <TimeText>{remainingHours}</TimeText>
            <TimeDescText>Hours</TimeDescText>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TimeText>{remainingMinutes}</TimeText>
            <TimeDescText>Mins</TimeDescText>
          </TimeItem>
          <VerticalLine />
          <TimeItem>
            <TimeText>{remainingSeconds}</TimeText>
            <TimeDescText>Secs</TimeDescText>
          </TimeItem>
        </WrapTime>
      )
    }
  }

  if (info) {
    return (
      <ActiveContainer status={props.status}>
        <span className="bold">{info} </span> until LBP ends
      </ActiveContainer>
    )
  }

  return null
}

const BaseContainer = styled.div<{ margin?: string; status?: string }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  margin: ${(props) => props.margin ?? '1rem 0'};
  padding: 0 1rem;
  height: 40px;

  border-radius: 6px;
`

const ActiveContainer = styled(BaseContainer)`
  color: ${(props) => {
    switch (props.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        return props.theme.lbp.colors.status.color.live

      case LbpStatus.pending:
        return props.theme.lbp.colors.status.color.pending

      case LbpStatus.paused:
      case LbpStatus.ended:
        return props.theme.lbp.colors.status.color.paused
    }
  }};
  background: ${(props) => {
    switch (props.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        return props.theme.lbp.colors.status.background.live

      case LbpStatus.pending:
        return props.theme.lbp.colors.status.background.pending

      case LbpStatus.paused:
      case LbpStatus.ended:
        return props.theme.lbp.colors.status.background.paused
    }
  }};
  border: ${(props) => {
    switch (props.status) {
      case LbpStatus.live:
      case LbpStatus.closed:
        return props.theme.lbp.colors.status.border.live

      case LbpStatus.pending:
        return props.theme.lbp.colors.status.border.pending

      case LbpStatus.paused:
      case LbpStatus.ended:
        return props.theme.lbp.colors.status.border.paused
    }
  }};
  justify-content: center;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text5}
  .bold {
    font-weight: bold;
    padding: 0 0.25rem;
  }
`

const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`

const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e5e5ff;
  margin: 7px 10px;
`

const TimeText = styled.div`
  font-size: 16px;
  color: #6666ff;
  font-weight: 700;
`

const TimeDescText = styled.div`
  font-size: 10px;
  color: #8f8fb2;
  margin-top: 4px;
`

const WrapTime = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
`
