import { removeHours } from 'helpers/getWeekDays'

export const prepareChartData = (data: any[]) => {
  const preparedData = data.map((el: any, i: number) => {
    if (i === 0) {
      return [
        { type: 'date', label: 'date' },
        { type: 'number', label: 'commitments' }
      ]
    }
    const formatted = removeHours(new Date(el[0]))
    return [new Date(formatted), el[1]]
  })
  return preparedData
}
