import { UnitMap } from 'app/pages/issuance/hooks/useCountdown'
import { DigitalSecurityOffering } from 'types/dso'

export const getEndDate = (data: DigitalSecurityOffering | undefined) => {
  const endDate =
    data !== undefined
      ? new Date(data.launchDate).getTime() - Date.now() > 0
        ? data.launchDate
        : new Date(data.completionDate).getTime() > 0
        ? data.completionDate
        : undefined
      : undefined

  return endDate
}

export const getTimeUnitsToDisplay = (units: UnitMap) => {
  if (units.years > 0) return ['years', 'months', 'days']
  if (units.months > 0) return ['months', 'days', 'hours']
  if (units.days > 0) return ['days', 'hours', 'minutes']
  return ['hours', 'minutes', 'seconds']
}

export const getInterval = (diff: number) => {
  if (diff > 1000 * 60 * 60 * 24) return 1000 * 60
  return 1000
}
