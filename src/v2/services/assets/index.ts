import { Asset } from 'v2/types/asset'
import { GetAssetsArgs } from 'v2/services/assets/types'
import apiService from 'v2/services/api'
import { PaginatedData } from 'v2/services/api/types'
import { paginationArgs } from 'v2/config/defaults'

export const assetsService = {
  async getAssets(queryKey: string, args: GetAssetsArgs) {
    const uri = '/accounts/assets/list'

    return await apiService.post<PaginatedData<Asset>>(uri, {
      ...paginationArgs,
      ...args
    })
  }
}
