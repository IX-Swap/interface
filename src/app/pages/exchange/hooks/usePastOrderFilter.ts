import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const usePastOrderFilter = (pairId?: string) => {
  const { getFilterValue } = useQueryFilter()
  const fromDateQueryValue = getFilterValue('fromDate', undefined)
  const toDateQueryValue = getFilterValue('toDate', undefined)

  return {
    filter: {
      to: toDateQueryValue,
      from: fromDateQueryValue,
      pair: pairId
    }
  }
}
