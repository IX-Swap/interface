import { PeriodsEnum } from 'constants/stakingPeriods'
import { dateFormatter } from 'state/stake/reducer'

export function formatAmount(amount: number) {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}
export function formatDate(dateUnix: number) {
  return dateFormatter.format(new Date(dateUnix * 1000))
}

export function getDateShortTime(dateUnix: number) {
  return new Date(dateUnix * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function getDateFullTime(dateUnix: number) {
  return new Date(dateUnix * 1000).toLocaleTimeString('en-GB')
}

export function getPeriodDigit(period: PeriodsEnum) {
  if (period === PeriodsEnum.WEEK || period === PeriodsEnum.MONTH) {
    return 1
  } else if (period === PeriodsEnum.TWO_MONTHS) {
    return 2
  } else {
    return 3
  }
}

export function getPeriodString(period: PeriodsEnum) {
  if (period === PeriodsEnum.WEEK) {
    return 'Week'
  } else if (period === PeriodsEnum.MONTH) {
    return 'Month'
  } else {
    return 'Months'
  }
}

export function getLockPeriod(period: PeriodsEnum) {
  if (period === PeriodsEnum.WEEK) {
    return '1 Week'
  } else if (period === PeriodsEnum.MONTH || period === PeriodsEnum.TWO_MONTHS) {
    return '1 Month'
  } else {
    return '2 Months'
  }
}
