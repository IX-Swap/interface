import { subYears } from 'date-fns'

export default function createDate18YearsAgo () {
  return subYears(new Date(), 18)
}
