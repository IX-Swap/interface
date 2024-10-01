import { FC, useMemo } from 'react'
import { isMobile, isTablet } from 'react-device-detect'
import styled from 'styled-components'

import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutEvent } from 'state/token-manager/types'

import useTheme from 'hooks/useTheme'
import { MEDIA_WIDTHS } from 'theme'
import { isSameDay, isSameOrAfter, isSameOrBefore } from '../utils'
import { TimelineDate } from './TimelineDate'
import { TodayIndicator } from './TodayIndicator'

import { ReactComponent as ArrowHead } from '../../../assets/svg/arrow-head.svg'

interface Props {
  payout: PayoutEvent
}

export const PayoutTimeline: FC<Props> = ({ payout }) => {
  const theme = useTheme()
  const { recordDate, startDate, endDate, status } = payout

  const todayActionDate = useMemo(
    () => isSameDay(recordDate) || isSameDay(startDate) || isSameDay(endDate),
    [recordDate, startDate, endDate]
  )

  const isTodayStartDate = useMemo(() => isSameDay(startDate), [startDate])

  const todayPosition = useMemo(() => {
    if (isSameOrBefore(recordDate)) return '0%'
    if (isSameDay(recordDate)) {
      return '6%'
    }
    if (isSameDay(startDate)) {
      return '50%'
    }
    if (isSameDay(endDate)) {
      return '100%'
    }
    if (isSameOrAfter(recordDate) && isSameOrBefore(startDate)) return '28.5%'
    if (isSameOrAfter(startDate) && isSameOrBefore(endDate)) return `75%`
  }, [recordDate, startDate, endDate])

  const displayTodayIndicator = [PAYOUT_STATUS.ANNOUNCED, PAYOUT_STATUS.SCHEDULED].includes(status)
  const isStarted = status === PAYOUT_STATUS.STARTED
  const isAnnounced = status === PAYOUT_STATUS.ANNOUNCED
  const isScheduled = status === PAYOUT_STATUS.SCHEDULED
  const isDelayed = status === PAYOUT_STATUS.DELAYED
  const isEnded = status === PAYOUT_STATUS.ENDED

  return (
    <LineContainer>
      {!isAnnounced && recordDate && <TimelineDate status={status} date={recordDate} label="Record Date" />}

      {isScheduled && isMobile && !isTablet && (
        <ArrowContainer hasLeftSpace={!isAnnounced}>
          <ArrowHead />
        </ArrowContainer>
      )}

      {displayTodayIndicator && (
        <TodayIndicator offset={todayPosition} overlay={todayActionDate} isTodayStartDate={isTodayStartDate} />
      )}

      <ArrowContainer
        hasLeftSpace={!isAnnounced}
        color={!endDate ? (isDelayed ? theme.red45 : isEnded ? theme.red4 : undefined) : undefined}
      >
        <ArrowHead />
      </ArrowContainer>
      {startDate && <TimelineDate status={status} date={startDate} label="Payment Start Date" />}
      {endDate && (
        <ArrowContainer
          hasLeftSpace
          className={
            isStarted || isScheduled || isAnnounced || (isMobile && (isDelayed || isEnded)) ? 'dashed' : undefined
          }
          color={!isMobile ? (isDelayed ? theme.red45 : isEnded ? theme.red4 : undefined) : undefined}
        >
          <ArrowHead />
        </ArrowContainer>
      )}
      {endDate && <TimelineDate status={status} date={endDate} label="Payment Deadline" />}
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
    align-items: center;
    padding-top: 48px;
    gap: 12px;
  }
`

const ArrowContainer = styled.div<{ hasLeftSpace?: boolean; color?: string }>`
  padding-top: 23.5px;
  margin-right: 20px;
  margin-left: ${({ hasLeftSpace }) => (hasLeftSpace ? '20px' : '0')};
  width: 100%;
  height: 1px;
  position: relative;
  color: ${({ theme, color }) => `${color ?? theme.bg26}`};
  border-bottom: ${({ theme, color }) => `1px solid ${color ?? theme.bg26}`};
  &.dashed {
    border-bottom: ${({ theme, color }) => `1px dashed ${color ?? theme.bg26}`};
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
    height: 40px;
    width: 1px;
    border-bottom: 0px;
    border-right: ${({ theme, color }) => `1px solid ${color ?? theme.bg26}`};
    &.dashed {
      border-bottom: 0px;
      border-right: ${({ theme, color }) => `1px dashed ${color ?? theme.bg26}`};
    }
    > svg {
      transform: rotate(90deg);
      top: inherit;
      right: -3px;
      bottom: -2.5px;
    }
  }
`
