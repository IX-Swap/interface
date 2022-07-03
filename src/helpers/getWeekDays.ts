import { format } from 'date-fns'
import { uniq } from 'lodash'
import { InvestmentGrowthData } from 'types/charts'

export const getWeekDays = (data: InvestmentGrowthData) => {
  if (typeof data === 'undefined') {
    return []
  }

  const newData = uniq(
    data.map(item => new Date(item[0]).setHours(0, 0, 0, 0))
  ).map(it => new Date(it))

  return newData
}

export const removeHours = (date: Date) => format(new Date(date), 'yyyy MM dd')
