import { QueryStatus, useInfiniteQuery } from 'react-query'
import { AssetType } from 'v2/context/assets/types'
import { Asset } from 'v2/types/asset'
import {
  convertDataArrayToMap,
  convertPaginatedResultToFlatArray
} from 'v2/context/assets/utils'
import { useAssetsService } from 'v2/hooks/useAssetsService'
import { useMemo } from 'react'

export const ASSETS_QUERY_KEY = 'assets'

interface DataStorage<T> {
  raw: any
  map: { [key: string]: T }
  list: T[]
}

interface UseAssetsReturnType {
  data: DataStorage<Asset>
  status: QueryStatus
}

export const useAssets = (type: AssetType): UseAssetsReturnType => {
  const assetsService = useAssetsService()

  const payload = { type, skip: 0, limit: 5 }

  const { data, status } = useInfiniteQuery(
    [ASSETS_QUERY_KEY, payload],
    assetsService.getAssets
  )

  const raw = data ?? []
  const list = convertPaginatedResultToFlatArray<Asset>(raw)
  const map = convertDataArrayToMap<Asset>('_id', list)
  const memoedData = useMemo(() => ({ raw, list, map }), [status])

  return {
    data: memoedData,
    status
  }
}
