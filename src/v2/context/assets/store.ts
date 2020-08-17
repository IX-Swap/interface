import { action, observable } from 'mobx'
import { Asset } from '../../types/asset'
import { getAssets } from './service'
import { snackbarService } from 'uno-material-ui'

export class AssetStore {
  @observable assets: Asset[] = []
  @observable currencies: Asset[] = []
  @observable digitalSecurities: Asset[] = []

  @action
  getCurrencies = async () => {
    const assets = await getAssets({ type: 'Currency' })

    if (!assets.status) {
      await snackbarService.showSnackbar(
        assets.message ?? 'Cannot get currencies',
        'error'
      )
      return
    }

    this.currencies = assets.data ?? []
  }
}
