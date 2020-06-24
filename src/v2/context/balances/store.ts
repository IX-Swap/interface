import { action, observable } from 'mobx'

import { getBalance, getAllBalances } from './service'
import { AssetBalance } from '../../types/balance'
import { snackbarService } from 'uno-material-ui'
import { noop } from 'lodash'

export class BalancesStore {
  @observable
  balances: { [key: string]: AssetBalance } = {}

  @action
  getBalance = async (userId: string, assetId: string) => {
    const balances = await getBalance(userId, assetId)
    if (!balances.status) {
      snackbarService
        .showSnackbar(balances.message ?? '', 'error')
        .then(noop)
        .catch(noop)
      return
    }

    if (balances.data && balances.data.length > 0) {
      const balance = balances.data[0]
      this.balances[balance.assetId] = balance
    }
  }

  @action
  getAllBalances = async (userId: string) => {
    const balances = await getAllBalances(userId)
    if (!balances.status) {
      snackbarService
        .showSnackbar(balances.message ?? '', 'error')
        .then(noop)
        .catch(noop)
      return
    }

    if (balances.data && balances.data.length > 0) {
      balances.data.forEach((e) => {
        this.balances[e.assetId] = e
      })
    }
  }
}
