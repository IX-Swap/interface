import React, { FC, useMemo } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

import { PayoutEvent } from 'state/token-manager/types'
import { PAYOUT_STATUS } from 'constants/enums'

import { TodayIndicator } from './TodayIndicator'
import { TimelineDate } from './TimelineDate'
import { isSameDay, isBefore, isAfter } from '../utils'

interface Props {
  payout: PayoutEvent
}

export const PayoutTimeline: FC<Props> = ({ payout }) => {
  const { recordDate, startDate, endDate, status } = payout

  const todayActionDate = useMemo(
    () => isSameDay(recordDate) || isSameDay(startDate) || isSameDay(endDate),
    [recordDate, startDate, endDate]
  )

  const todayPosition = useMemo(() => {
    if (isBefore(recordDate)) return '0px'
    if (!endDate && recordDate && startDate) return '50%'
    if (isAfter(recordDate) && isBefore(startDate)) return '26%'
    if (isAfter(startDate) && isBefore(endDate)) return '75%'
  }, [recordDate, startDate, endDate])

  const hideTodayIndicator = [PAYOUT_STATUS.DELAYED, PAYOUT_STATUS.ENDED].includes(status)

  return (
    <Box style={{ marginTop: 24, padding: '0px 36px' }}>
      <LineContainer>
        {todayPosition === '0px' && <FakeFirstButton />}
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
        <Line>{!todayActionDate && !hideTodayIndicator && <TodayIndicator left={todayPosition} />}</Line>
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
`

const Line = styled.div`
  position: absolute;
  height: 2px;
  width: calc(100% - 12px);
  background-color: ${({ theme }) => theme.text2};
`

const FakeFirstButton = styled.div`
  width: 0px;
  height: 0px;
`
