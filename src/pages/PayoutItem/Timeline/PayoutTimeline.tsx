import React, { FC, useMemo } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

import { PayoutEvent } from 'state/token-manager/types'
import { PAYOUT_STATUS } from 'constants/enums'

import { TodayIndicator } from './TodayIndicator'
import { TimelineDate } from './TimelineDate'
import { isSameDay, isSameOrBefore, isSameOrAfter, isBefore } from '../utils'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  payout: PayoutEvent
}

export const PayoutTimeline: FC<Props> = ({ payout }) => {
  const { recordDate, startDate, endDate, status } = payout

  const todayActionDate = useMemo(
    () => isSameDay(recordDate) || isSameDay(startDate) || isSameDay(endDate),
    [recordDate, startDate, endDate]
  )

  const needFake = useMemo(() => {
    return isBefore(recordDate)
  }, [recordDate])

  const todayPosition = useMemo(() => {
    if (needFake) return '0%'
    if (isSameDay(recordDate)) {
      return '0%'
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

  return (
    <Box style={{ marginTop: 24, padding: '0px 36px' }}>
      <LineContainer>
        {needFake && <FakeFirstButton />}
        {recordDate && <TimelineDate date={recordDate} label="Record Date" hideTodayIndicator={hideTodayIndicator} />}
        {startDate && (
          <TimelineDate date={startDate} label="Payment Start Date" hideTodayIndicator={hideTodayIndicator} />
        )}
        {endDate && (
          <TimelineDate
            withBackground={false}
            date={endDate}
            label="Payment Deadline"
            hideTodayIndicator={hideTodayIndicator}
          />
        )}
        <Line>{!todayActionDate && !hideTodayIndicator && <TodayIndicator offset={todayPosition} />}</Line>
      </LineContainer>
    </Box>
  )
}

const LineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 34px;
  pointer-events: none;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    height: 320px;
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
