import { QueryFilter, QueryFilters } from 'hooks/filters/useQueryFilter'

export type SearchQueryFilterState = Partial<QueryFilters>

export type SearchQueryFilterGroupReducerActions =
  | {
      type: 'update'
      key: QueryFilter
      value: QueryFilters[QueryFilter]
    }
  | {
      type: 'clear'
      key: QueryFilter
    }
  | {
      type: 'clear-all'
    }

export const searchQueryFilterGroupReducer = (
  state: SearchQueryFilterState,
  action: SearchQueryFilterGroupReducerActions
) => {
  switch (action.type) {
    case 'update': {
      return {
        ...state,
        [action.key]: action.value
      }
    }

    case 'clear': {
      return {
        ...state,
        [action.key]: undefined
      }
    }

    case 'clear-all': {
      return {}
    }

    default:
      throw new Error('Unsupported action type')
  }
}
