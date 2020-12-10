import { format } from 'date-fns'
import { investmentGrowthData } from 'types/charts'

export const getWeekDays = (data: investmentGrowthData) => {
  if (typeof data === 'undefined') {
    return []
  }
  const weekDays = data.reduce<Date[]>((a, d, i) => {
    if (i === 0 || !(d[0] instanceof Date)) {
      return a
    }
    const noHours = format(new Date(d[0]), 'yyyy MM dd')
    const found = a.find(
      a => new Date(a).getTime() === new Date(noHours).getTime()
    )
    if (typeof found === 'undefined') {
      a.push(new Date(noHours))
    }
    return a
  }, [])
  return weekDays
}
