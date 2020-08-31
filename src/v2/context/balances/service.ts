import HTTPResponse from '../../types/httpResponse'
import { AssetBalance } from 'v2/types/balance'
import { postRequest } from 'v2/helpers/httpRequests'
import apiService from 'v2/services/api'
import {
  GetAllBalancesArgs,
  GetBalanceByAssetIdArgs,
  GetBalanceByTypeArgs
} from 'v2/context/balances/types'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BalancesService {
  static _baseURL = '/accounts/balance'

  static _buildURL = (uri: string): string => {
    return `${BalancesService._baseURL}${uri}`
  }

  static getAllBalances = (queryKey: string, args: GetAllBalancesArgs): any => {
    const { userId, ...payload } = args
    const uri = `/${userId}`

    return apiService.request<any>(
      'POST',
      BalancesService._buildURL(uri),
      payload
    )
  }

  static getBalancesByAssetId = (
    queryKey: string,
    args: GetBalanceByAssetIdArgs
  ): any => {
    const { assetId, userId, ...payload } = args
    const uri = `/${userId}/${assetId}`

    return apiService.request<any>(
      'POST',
      BalancesService._buildURL(uri),
      payload
    )
  }

  static getBalancesByType = (
    queryKey: string,
    args: GetBalanceByTypeArgs
  ): any => {
    const { userId, ...payload } = args
    const uri = `/${userId}`

    return apiService.request<any>(
      'POST',
      BalancesService._buildURL(uri),
      payload
    )
  }
}
