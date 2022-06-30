import { format } from 'date-fns'
import { InvestmentGrowthData } from 'types/charts'

export const getWeekDays = (data: InvestmentGrowthData) => {
  if (typeof data === 'undefined') {
    return []
  }
  const weekDays = data.map(item => new Date(item[0]))
  return weekDays
}

export const removeHours = (date: Date) => format(new Date(date), 'yyyy MM dd')
