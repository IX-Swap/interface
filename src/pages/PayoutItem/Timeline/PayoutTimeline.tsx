import React, { FC, useMemo } from 'react'
import styled from 'styled-components'

import { PayoutEvent } from 'state/token-manager/types'
import { PAYOUT_STATUS } from 'constants/enums'

import { TodayIndicator } from './TodayIndicator'
import { TimelineDate } from './TimelineDate'
import { isSameDay, isSameOrBefore, isSameOrAfter, isBefore } from '../utils'
import { MEDIA_WIDTHS } from 'theme'

import { ReactComponent as ArrowHead } from '../../../assets/svg/arrow-head.svg'

interface Props {
  payout: PayoutEvent
}

export const PayoutTimeline: FC<Props> = ({ payout }) => {
  const { recordDate, startDate, endDate, status } = payout

  const todayActionDate = useMemo(
    () => isSameDay(recordDate) || isSameDay(startDate) || isSameDay(endDate),
    [recordDate, startDate, endDate]
  )

  const isTodayStartDate = useMemo(() => isSameDay(startDate), [startDate])

  const needFake = useMemo(() => {
    return isBefore(recordDate)
  }, [recordDate])

  const todayPosition = useMemo(() => {
    if (needFake) return '0%'
    if (isSameDay(recordDate)) {
      return '6%'
    }
    if (isSameDay(startDate)) {
      return '50%'
    }
    if (isSameDay(endDate)) {
      return '100%'
    }
    if (isSameOrAfter(recordDate) && isSameOrBefore(startDate)) return '25%'
    if (isSameOrAfter(startDate) && isSameOrBefore(endDate)) return `75%`
  }, [recordDate, startDate, endDate, needFake])

  const hideTodayIndicator = [PAYOUT_STATUS.DELAYED, PAYOUT_STATUS.ENDED].includes(status)
  const isAnnounced = status === PAYOUT_STATUS.ANNOUNCED

  return (
    <LineContainer>
      {needFake && <FakeFirstButton />}

      {isAnnounced && <TodayIndicator offset={todayPosition} overlay={todayActionDate} isTodayStartDate={isTodayStartDate} />}

      {!isAnnounced && recordDate && (
        <TimelineDate withBackground={isSameOrAfter(recordDate)} date={recordDate} label="Record Date" />
      )}
      <ArrowContainer
        hasLeftSpace={!isAnnounced}
      >
        <ArrowHead />
      </ArrowContainer>
      {startDate && (
        <TimelineDate withBackground={isSameOrAfter(startDate)} date={startDate} label="Payment Start Date" />
      )}
      <ArrowContainer
        className='dashed'
      >
        <ArrowHead />
      </ArrowContainer>
      {endDate && (
        <TimelineDate
          withBackground={isSameOrAfter(endDate)}
          ended={status === PAYOUT_STATUS.ENDED}
          date={endDate}
          label="Payment Deadline"
        />
      )}
      {/* {!hideTodayIndicator && (
            <TodayIndicator offset={todayPosition} overlay={todayActionDate} isTodayStartDate={isTodayStartDate} />
          )} */}
    </LineContainer>
  )
}

const LineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  justify-content: space-between;
  pointer-events: none;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    height: 320px;
    align-items: center;
    padding-top: 48px;
  }
`

const ArrowContainer = styled.div<{hasLeftSpace?: boolean}>`
  padding-top: 23.5px;
  margin-right: 20px;
  margin-left: ${({ hasLeftSpace }) => hasLeftSpace ? '20px' : '0'};
  width: 100%;
  height: 1px;
  position: relative;
  border-bottom: ${({ theme }) => `1px solid ${theme.bg26}`};
  &.dashed {
    border-bottom: ${({ theme }) => `1px dashed ${theme.bg26}`};
  }
  > svg {
    position: absolute;
    right: -1.5px;
    top: 20.5px;
    bottom: inherit;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-top: 10px;
    margin-right: 0;
    margin-bottom: 10px;
    margin-left: 0;
    height: 100px;
    width: 1px;
    border-bottom: 0px;
    border-right: ${({ theme }) => `1px solid ${theme.bg26}`};
    &.dashed {
      border-bottom: 0px;
      border-right: ${({ theme }) => `1px dashed ${theme.bg26}`};
    }
    > svg {
      transform: rotate(90deg);
      top: inherit;
      right: -3px;
      bottom: -2.5px;
    }
  }
`

const Line = styled.div`
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.text2};
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    height: 320px;
    width: 2px;
  }
`

const FakeFirstButton = styled.div`
  width: 0px;
  height: 0px;
`
