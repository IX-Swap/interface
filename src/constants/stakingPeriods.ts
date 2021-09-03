const oneDaySeconds = 86400
export enum PeriodsEnum {
  WEEK = 'week',
  MONTH = 'month',
  TWO_MONTHS = 'two_months',
  THREE_MONTHS = 'three_months',
}

export interface IStaking {
  period: PeriodsEnum
  startDate: Date
  endDate: Date
  lockedTill: Date
  stakeAmount: number
  distributeAmount: number
  apy: number
  reward: number
  lockMonths: number
  startDateUnix: number
  canUnstake: boolean
  originalData: number[]
  originalIndex: number
}

const periods = {
  WEEK: 'week',
  MONTH: 'month',
  TWO_MONTHS: 'two_months',
  THREE_MONTHS: 'three_months',
}
const periodsIndex = {
  [periods.WEEK]: 0,
  [periods.MONTH]: 1,
  [periods.TWO_MONTHS]: 2,
  [periods.THREE_MONTHS]: 3,
}
const periodsInSeconds = {
  [periods.WEEK]: 7 * oneDaySeconds,
  [periods.MONTH]: 30 * oneDaySeconds,
  [periods.TWO_MONTHS]: 2 * 30 * oneDaySeconds,
  [periods.THREE_MONTHS]: 3 * 30 * oneDaySeconds,
}
const periodsApy = {
  [periods.WEEK]: 5,
  [periods.MONTH]: 18,
  [periods.TWO_MONTHS]: 44,
  [periods.THREE_MONTHS]: 88,
}
const periodsLockMonths = {
  [periods.WEEK]: 0,
  [periods.MONTH]: 0,
  [periods.TWO_MONTHS]: 1,
  [periods.THREE_MONTHS]: 2,
}
const periodsInDays = {
  [periods.WEEK]: 7,
  [periods.MONTH]: 30,
  [periods.TWO_MONTHS]: 2 * 30,
  [periods.THREE_MONTHS]: 3 * 30,
}
export default {
  oneDaySeconds,
  periods,
  periodsIndex,
  periodsInSeconds,
  periodsApy,
  periodsLockMonths,
  periodsInDays,
}
