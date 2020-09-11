import { PaginationArgs } from 'v2/services/api/types'

export type AssetType = 'Currency' | 'Security'

export interface GetAssetsArgs extends PaginationArgs {
  type: AssetType
}
