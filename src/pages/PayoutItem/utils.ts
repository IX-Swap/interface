import moment from 'moment'
import dayjs from 'dayjs'

import useTheme from 'hooks/useTheme'
import { PAYOUT_STATUS } from 'constants/enums'

export const useStatusButtonInfo = (title: PAYOUT_STATUS) => {
  const theme = useTheme()

  switch (title) {
    case PAYOUT_STATUS.ANNOUNCED:
      return { title: 'Announced', backgroundColor: theme.orange, color: theme.text1, borderColor: null }
    case PAYOUT_STATUS.DRAFT:
      return { title: 'Draft', backgroundColor: 'transparent', color: theme.bg10, borderColor: theme.bg10 }
    case PAYOUT_STATUS.ENDED:
      return { title: 'Ended', backgroundColor: theme.blue3, color: theme.text1, borderColor: null }
    case PAYOUT_STATUS.STARTED:
      return { title: 'Started', backgroundColor: theme.green3, color: theme.text1, borderColor: null }
    case PAYOUT_STATUS.SCHEDULED:
      return { title: 'Scheduled', backgroundColor: theme.yellow4, color: theme.bg1, borderColor: null }
    case PAYOUT_STATUS.DELAYED:
      return { title: 'Delayed', backgroundColor: theme.bgG6, color: theme.text1, borderColor: null }
  }
}

export const isSameDay = (date: any) => dayjs().isSame(dayjs(date), 'day')
export const isBefore = (date: any) => dayjs().isBefore(dayjs(date), 'day')
export const isAfter = (date: any) => dayjs().isAfter(dayjs(date), 'day')
export const isSameOrBefore = (date: any) => dayjs().isBefore(dayjs(date), 'day') || isSameDay(date)
export const isSameOrAfter = (date: any) => dayjs().isAfter(dayjs(date), 'day') || isSameDay(date)

export const formatDate = (date: any, format: DateFormats = 'll') => dayjs(date).format(format)

type DateFormats = 'll' | 'LL'
