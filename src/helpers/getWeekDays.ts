import { format } from 'date-fns'
import { uniq } from 'lodash'
import { InvestmentGrowthData } from 'types/charts'

export const getWeekDays = (data: InvestmentGrowthData) => {
  if (typeof data === 'undefined') {
    return []
  }

  return uniq(data.map(item => new Date(item[0]).setHours(0, 0, 0, 0))).map(
    it => new Date(it)
  )
}

export const removeHours = (date: Date) => format(new Date(date), 'yyyy MM dd')
