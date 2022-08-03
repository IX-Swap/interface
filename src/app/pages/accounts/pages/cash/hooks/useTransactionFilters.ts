import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useEffect } from 'react'

export const useTransactionFilters = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')

  useEffect(() => {
    if (sortBy === undefined) {
      updateFilter('sortBy', 'createdAt')
    }
    if (orderBy === undefined) {
      updateFilter('orderBy', 'DSC')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, sortBy])

  const filter = {
    sortBy: sortBy ?? 'createdAt',
    sortIndex: orderBy === 'ASC' ? 1 : -1
  }
  return {
    filter,
    sortBy,
    orderBy
  }
}
