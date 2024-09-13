import React, { useMemo } from 'react'

import { Colors } from 'theme/styled'
import { PAYOUT_STATUS } from 'constants/enums'

import { StatusContainer } from './styleds'

interface Props {
  status: string
}

interface Info {
  color: Exclude<keyof Colors | 'transparent', 'config'>
  text: string
}

export const StatusCell = ({ status }: Props) => {
  const { color, text } = useMemo((): Info => {
    switch (status) {
    case PAYOUT_STATUS.ANNOUNCED: {
      return { color: 'blue4', text: 'Announced' }
    }
    case PAYOUT_STATUS.STARTED: {
      return { color: 'green4', text: 'Started' }
    }
    case PAYOUT_STATUS.ENDED: {
      return { color: 'blue3', text: 'Ended' }
    }
    case PAYOUT_STATUS.DRAFT: {
      return { color: 'transparent', text: 'Draft' }
    }
    case PAYOUT_STATUS.SCHEDULED: {
      return { color: 'yellow5', text: 'Scheduled' }
    }
    case PAYOUT_STATUS.DELAYED: {
      return { color: 'bg14', text: 'Delayed' }
    }
    default: {
      return { color: 'transparent', text: status }
    }
    }
  }, [status])

  return <StatusContainer color={color}>{text}</StatusContainer>
}
