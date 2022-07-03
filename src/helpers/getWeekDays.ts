import { format } from 'date-fns'
import { InvestmentGrowthData } from 'types/charts'

export const getWeekDays = (data: InvestmentGrowthData) => {
  if (typeof data === 'undefined') {
    return []
  }

  return data.map(item => new Date(new Date(item[0]).setHours(0, 0, 0, 0)))
}

export const removeHours = (date: Date) => format(new Date(date), 'yyyy MM dd')
