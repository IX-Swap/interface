import { format } from 'date-fns'
import { getWeekDays } from 'helpers/getWeekDays'
import { investmentGrowthData } from '__fixtures__/issuance'

describe('getWeekDays', () => {
  const dates = [
    new Date(format(new Date(2020, 11, 1), 'yyyy MM dd')),
    new Date(format(new Date(2020, 11, 2), 'yyyy MM dd')),
    new Date(format(new Date(2020, 11, 3), 'yyyy MM dd')),
    new Date(format(new Date(2020, 11, 4), 'yyyy MM dd')),
    new Date(format(new Date(2020, 11, 5), 'yyyy MM dd')),
    new Date(format(new Date(2020, 11, 6), 'yyyy MM dd')),
    new Date(format(new Date(2020, 11, 7), 'yyyy MM dd'))
  ]

  it('returns correct week day from the data', () => {
    const days = getWeekDays(investmentGrowthData)

    expect(days).toEqual(dates)
  })
})
