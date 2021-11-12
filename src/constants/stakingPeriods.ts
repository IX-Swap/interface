export const SECONDS_IN_DAY = 86400
export enum PeriodsEnum {
  WEEK = 'week',
  MONTH = 'month',
  TWO_MONTHS = 'two_months',
  THREE_MONTHS = 'three_months',
}

export interface IStaking {
  period: PeriodsEnum
  stakeAmount: number
  distributeAmount: number
  apy: number
  reward: number
  lockMonths: number
  startDateUnix: number
  endDateUnix: number
  lockedTillUnix: number
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

export const periodsInSeconds = {
  [periods.WEEK]: 7 * SECONDS_IN_DAY,
  [periods.MONTH]: 30 * SECONDS_IN_DAY,
  [periods.TWO_MONTHS]: 2 * 30 * SECONDS_IN_DAY,
  [periods.THREE_MONTHS]: 3 * 30 * SECONDS_IN_DAY,
}
const periodsApy = {
  [periods.WEEK]: 5,
  [periods.MONTH]: 18,
  [periods.TWO_MONTHS]: 44,
  [periods.THREE_MONTHS]: 88,
}
const periodsLockMonths = {
  [periods.WEEK]: 0.2333334,
  [periods.MONTH]: 1,
  [periods.TWO_MONTHS]: 1,
  [periods.THREE_MONTHS]: 2,
}

//<<<< testing, remove on prod
export const testPeriodsLockSeconds = {
  [periods.WEEK]: 2 * 60,
  [periods.MONTH]: 5 * 60,
  [periods.TWO_MONTHS]: 5 * 60,
  [periods.THREE_MONTHS]: 10 * 60,
}
export const testPeriodsMaturitySeconds = {
  [periods.WEEK]: 5 * 60,
  [periods.MONTH]: 10 * 60,
  [periods.TWO_MONTHS]: 15 * 60,
  [periods.THREE_MONTHS]: 20 * 60,
}
//===== testing, remove on prod
export const periodsInDays = {
  [periods.WEEK]: 7,
  [periods.MONTH]: 30,
  [periods.TWO_MONTHS]: 2 * 30,
  [periods.THREE_MONTHS]: 3 * 30,
}
export default {
  SECONDS_IN_DAY,
  periods,
  periodsIndex,
  periodsInSeconds,
  periodsApy,
  periodsLockMonths,
  periodsInDays,
  testPeriodsLockSeconds,
  testPeriodsMaturitySeconds,
}
