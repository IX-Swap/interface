import storageService from 'v2/services/storage'
import User from 'v2/types/user'
import {
  CreateBankArgs,
  DepositCashArgs,
  GetBanksArgs,
  UpdateBankArgs,
  WithdrawCashArgs,
  WithdrawDSArgs
} from 'v2/app/accounts/banks/service/types'
import apiService from 'v2/services/api'
import { PaginatedData } from 'v2/services/api/types'
import { Bank } from 'v2/types/bank'

export const banksService = {
  async getBanks (queryKey: string, args: GetBanksArgs) {
    const userId = this._getUserId()
    const uri = `/accounts/banks/list/${userId}`

    return await apiService.request<PaginatedData<Bank>>('POST', uri, args)
  },

  async createBank (args: CreateBankArgs) {
    const userId = this._getUserId()
    const uri = `/accounts/banks/${userId}`

    return await apiService.request<Bank>('POST', uri, args)
  },

  async updateBank (args: UpdateBankArgs) {
    const userId = this._getUserId()
    const { bankId, ...bank } = args
    const uri = `/accounts/banks/${userId}/${bankId}`

    return await apiService.request<Bank>('PUT', uri, bank)
  },

  async depositCash (args: DepositCashArgs) {
    const userId = this._getUserId()
    const uri = `/accounts/cash/deposits/${userId}`

    return await apiService.request('POST', uri, args)
  },

  async withdrawCash (args: WithdrawCashArgs) {
    const userId = this._getUserId()
    const uri = `/accounts/cash/withdrawals/${userId}`

    return await apiService.request('POST', uri, args)
  },

  async withdrawDS (args: WithdrawDSArgs) {
    const userId = this._getUserId()
    const uri = `/accounts/security/withdrawals/${userId}`

    return await apiService.request('POST', uri, args)
  },

  _getUserId (): string {
    const user = storageService.get<User>('user')

    if (user === undefined) {
      throw new Error('No user found')
    }

    return user._id
  }
}
