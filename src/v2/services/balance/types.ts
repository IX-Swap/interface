import { PaginationArgs } from 'v2/services/api/types'
import { AssetType } from 'v2/services/assets/types'

export interface GetBalanceByAssetIdArgs extends PaginationArgs {
  assetId: string
  userId: string
}

export interface GetBalanceByTypeArgs extends PaginationArgs {
  userId: string
  type: AssetType
}

export interface GetAllBalancesArgs extends PaginationArgs {
  userId: string
}
