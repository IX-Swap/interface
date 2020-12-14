import { format } from 'date-fns'
import { InvestmentGrowthData } from 'types/charts'

export const getWeekDays = (data: InvestmentGrowthData) => {
  if (typeof data === 'undefined') {
    return []
  }
  const weekDays = data.reduce<Date[]>((a, d, i) => {
    const noHours = removeHours(d[0])
    const found = a.find(
      el => new Date(el).getTime() === new Date(noHours).getTime()
    )
    if (typeof found === 'undefined') {
      a.push(new Date(noHours))
    }
    return a
  }, [])
  return weekDays
}

export const removeHours = (date: Date) => format(new Date(date), 'yyyy MM dd')
