import { countries } from 'app/pages/home/components/Securities/CountryFilter'
import { industries } from 'app/pages/home/components/Securities/IndustryFilter'
import { protocols } from 'app/pages/home/components/Securities/ProtocolFilter'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
import { assetClasses } from 'app/pages/home/components/Securities/SecurityTypeFilter'

export const getTotalCapitalization = (data: Security[]) => {
  return data.reduce((ac, item) => {
    if (item.fundingGoal === undefined || item.fundingGoal === null) {
      return ac
    }
    const amount = item.fundingGoal.substring(1).replaceAll(',', '')
    return ac + parseInt(amount)
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
