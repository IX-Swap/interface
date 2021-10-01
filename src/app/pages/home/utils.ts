import { TimeSeries } from 'app/pages/home/components/Charts/SecurityTimeSeriesChart'
import { countries } from 'app/pages/home/components/Securities/CountryFilter'
import { industries } from 'app/pages/home/components/Securities/IndustryFilter'
import { protocols } from 'app/pages/home/components/Securities/ProtocolFilter'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
import { assetClasses } from 'app/pages/home/components/Securities/SecurityTypeFilter'
import { sub } from 'date-fns'

export const getTotalCapitalization = (data: Security[]) => {
  return data.reduce((ac, item) => {
    if (
      item.marketCapitalization === undefined ||
      item.marketCapitalization === null
    ) {
      return ac
    }
    const amount = item.marketCapitalization
    return ac + amount
  }, 0)
}

export const getChartData = (
  data: Security[],
  category:
    | 'Industry'
    | 'Country'
    | 'Securities'
    | 'Protocol'
    | undefined = 'Industry'
) => {
  let cat = industries
  let prop: 'industry' | 'country' | 'assetClass' | 'protocol' = 'industry'
  switch (category) {
    case 'Industry':
      cat = industries
      prop = 'industry'
      break
    case 'Country':
      cat = countries
      prop = 'country'
      break
    case 'Securities':
      cat = assetClasses
      prop = 'assetClass'
      break
    case 'Protocol':
      cat = protocols
      prop = 'protocol'
      break
    default:
      break
  }

  return cat.reduce<Array<any | null>>(
    (ac, item) => {
      const count = data.filter(c => c[prop] === item).length
      const value = (count / data.length) * 100
      ac.push([item, value, `${value.toFixed(2)}%`])
      return ac.length > 7 ? ac.sort((a, b) => b - a).slice(0, 7) : ac
    },
    [[category, 'value', { role: 'annotation' }]]
  )
}

export const timeRange = (
  range: '1W' | '1M' | '6M' | 'YTD' | '1Y' | 'MAX',
  data?: TimeSeries[]
) => {
  const today = new Date()
  const dayToday = today.getUTCDate()
  const monthToday = today.getUTCMonth()
  const yearToday = today.getUTCFullYear()

  switch (range) {
    case '1W': {
      const lastWeek = sub(today, { weeks: 1 })
      const dayLastWeek = lastWeek.getUTCDate()
      const monthLastWeek = lastWeek.getUTCMonth()
      const yearLastWeek = lastWeek.getUTCFullYear()

      return {
        from: {
          day: dayLastWeek,
          month: monthLastWeek + 1,
          year: yearLastWeek
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }

    case '1M': {
      const lastMonth = sub(today, { months: 1 })
      const dayLastMonth = lastMonth.getUTCDate()
      const monthLastMonth = lastMonth.getUTCMonth()
      const yearLastMonth = lastMonth.getUTCFullYear()
      return {
        from: {
          day: dayLastMonth,
          month: monthLastMonth + 1,
          year: yearLastMonth
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }

    case '6M': {
      const halfYearAgo = sub(today, { months: 6 })
      const dayHalfYearAgo = halfYearAgo.getUTCDate()
      const monthHalfYearAgo = halfYearAgo.getUTCMonth()
      const yearHalfYearAgo = halfYearAgo.getUTCFullYear()
      return {
        from: {
          day: dayHalfYearAgo,
          month: monthHalfYearAgo + 1,
          year: yearHalfYearAgo
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }

    case 'YTD': {
      return {
        from: {
          day: 1,
          month: 1,
          year: yearToday
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }

    case '1Y': {
      const aYearAgo = sub(today, { years: 1 })
      const dayAYearAgo = aYearAgo.getUTCDate()
      const monthAYearAgo = aYearAgo.getUTCMonth()
      const yearAYearAgo = aYearAgo.getUTCFullYear()
      return {
        from: {
          day: dayAYearAgo,
          month: monthAYearAgo + 1,
          year: yearAYearAgo
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }

    case 'MAX': {
      return {
        from: {
          day: 1,
          month: 1,
          year: 1
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }

    default: {
      return {
        from: {
          day: 1,
          month: 1,
          year: 1
        },
        to: { day: dayToday, month: monthToday + 1, year: yearToday }
      }
    }
  }
}
