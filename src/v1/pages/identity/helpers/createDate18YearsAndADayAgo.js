import { subHours, subYears } from 'date-fns'

export default function createDate18YearsAndADayAgo () {
  return subHours(subYears(new Date(), 18), 1)
}
