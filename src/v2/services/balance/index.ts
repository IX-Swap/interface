import apiService from 'v2/services/api'
import {
  GetAllBalancesArgs,
  GetBalanceByAssetIdArgs,
  GetBalanceByTypeArgs
} from 'v2/services/balance/types'

export const balancesService = {
  _baseURL: '/accounts/balance',

  _buildURL (uri: string) {
    return `${this._baseURL}${uri}`
  },

  async getAllBalances (queryKey: string, args: GetAllBalancesArgs) {
    const { userId, ...payload } = args
    const uri = `/${userId}`

    return await apiService.post(this._buildURL(uri), payload)
  },

  async getBalancesByAssetId (queryKey: string, args: GetBalanceByAssetIdArgs) {
    const { assetId, userId, ...payload } = args
    const uri = `/${userId}/${assetId}`

    return await apiService.post(this._buildURL(uri), payload)
  },

  async getBalancesByType (queryKey: string, args: GetBalanceByTypeArgs) {
    const { userId, ...payload } = args
    const uri = `/${userId}`

    return await apiService.post<any>(this._buildURL(uri), payload)
  }
}
