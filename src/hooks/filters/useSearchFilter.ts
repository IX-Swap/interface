import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useSearchFilter = () => {
  const { getFilterValue } = useQueryFilter()
  const filter = {
    search: getFilterValue('search')
  }
  return {
    filter
  }
}
