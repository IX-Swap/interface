import { QueryStatus, useInfiniteQuery } from 'react-query'
import {
  convertDataArrayToMap,
  convertPaginatedResultToFlatArray
} from 'v2/context/assets/utils'
import { banksService } from 'v2/app/accounts/banks/service'
import { Bank } from 'v2/types/bank'

export const BANKS_QUERY_KEY = 'banks'

interface DataStorage<T> {
  raw: any
  map: { [key: string]: T }
  list: T[]
}

interface UseBanksReturnType {
  data: DataStorage<Bank>
  status: QueryStatus
}

export const useBanks = (): UseBanksReturnType => {
  const payload = { skip: 0, limit: 50 }
  const { data, status } = useInfiniteQuery(
    [BANKS_QUERY_KEY, payload],
    banksService.getBanks.bind(banksService)
  )
  const raw = data ?? []
  const list = convertPaginatedResultToFlatArray<Bank>(raw)
  const map = convertDataArrayToMap<Bank>('_id', list)

  return {
    data: { raw, list, map },
    status
  }
}
