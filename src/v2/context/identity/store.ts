import { action, observable, runInAction } from 'mobx'
import { IndividualIdentity, CorporateIdentity } from '../../types/identity'
import { getIndividualIdentity, getCorporateIdentities } from './service'
import { snackbarService } from 'uno-material-ui'
import storageHelper from '../../helpers/storageHelper'

export class IdentityStore {
  @observable individualIdentity?: IndividualIdentity
  @observable corporateIdentities?: CorporateIdentity[]

  @observable accessibleCorporates?: CorporateIdentity[]

  @action
  getIdentities = async (id: string) => {
    await this.getCorporateIdentities(id)
    await this.getIndividualIdentity(id)
  }

  @action
  getIndividualIdentity = async (id: string) => {
    const identity = await getIndividualIdentity(id)

    if (!identity.status) {
      await snackbarService.showSnackbar(
        identity.message ?? 'Unable to get identity',
        'error'
      )
      return
    }

    runInAction(() => {
      this.individualIdentity = identity.data
    })
  }

  @action
  getCorporateIdentities = async (id: string) => {
    const identities = await getCorporateIdentities(id)

    if (!identities.status) {
      await snackbarService.showSnackbar(
        identities.message ?? 'Unable to get identity',
        'error'
      )
      return
    }

    runInAction(() => {
      this.corporateIdentities = identities.data
    })
  }

  @action
  getAccessibleCorporateIdentities = async (
    isAuthorizer: boolean,
    isAdmin: boolean
  ) => {
    const userId = storageHelper.getUserId()
    let uri

    if (isAuthorizer || isAdmin) {
      uri = '/identity/corporates/list'
    }

    const identities = await getCorporateIdentities(userId, uri)

    if (!identities.status) {
      await snackbarService.showSnackbar(
        identities.message ?? 'Unable to get available identities',
        'error'
      )
      return
    }

    runInAction(() => {
      this.accessibleCorporates = identities.data
    })
  }
}
