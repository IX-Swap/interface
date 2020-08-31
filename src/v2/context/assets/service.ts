import { Asset } from 'v2/types/asset'
import { GetAssetsArgs } from 'v2/context/assets/types'
import apiService from 'v2/services/api'
import { PaginatedData } from 'v2/services/api/types'

export const assetsService = {
  async getAssets (queryKey: string, args: GetAssetsArgs) {
    const uri = '/accounts/assets/list'
    const paginationArgs = {
      skip: 0,
      limit: 50
    }

    return await apiService.request<PaginatedData<Asset>>('POST', uri, {
      ...paginationArgs,
      ...args
    })
  }
}
