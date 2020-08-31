//
import { isEmpty } from 'lodash'
import localStore from 'v1/services/storageHelper'
import { USER_STATUS } from '../../const/status'

export const initialState = {
  user: {
    _id: '',
    roles: '',
    email: '',
    name: '',
    verified: false,
    accountType: '',
    totpConfirmed: false
  },
  status: USER_STATUS.INIT,
  isAuthenticated: !isEmpty(localStore.get()),
  isLoading: false,
  message: '',
  activeTabId: 0,
  error: ''
}
