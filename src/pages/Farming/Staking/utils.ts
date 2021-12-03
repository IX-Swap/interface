import { PeriodsEnum } from 'constants/stakingPeriods'

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
