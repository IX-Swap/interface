import React, { FC, useMemo } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

import { TodayIndicator } from './TodayIndicator'
import { TimelineDate } from './TimelineDate'
import { isSameDay, isBefore, isAfter } from '../utils'

interface Props {
  recordDate: Date | string | null
  startDate: Date | string | null
  deadlineDate: Date | string | null
}

export const PayoutTimeline: FC<Props> = ({ recordDate, startDate, deadlineDate }) => {
  const todayActionDate = useMemo(
    () => isSameDay(recordDate) || isSameDay(startDate) || isSameDay(deadlineDate),
    [recordDate, startDate, deadlineDate]
  )

  const todayPosition = useMemo(() => {
    if (isBefore(recordDate)) return '0px'
    if (isAfter(recordDate) && isBefore(startDate)) return '26%'
    if (isAfter(startDate) && isBefore(deadlineDate)) return '75%'
  }, [recordDate, startDate, deadlineDate])

  return (
    <Box style={{ marginTop: 24, padding: '0px 36px' }}>
      <LineContainer>
        {todayPosition === '0px' && <FakeFirstButton />}
        <TimelineDate date={recordDate} label="Record Date" />
        <TimelineDate date={startDate} label="Payment Start Date" />
        <TimelineDate withBackground={false} date={deadlineDate} label="Payment Deadline" />
        <Line>{!todayActionDate && <TodayIndicator left={todayPosition} />}</Line>
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
