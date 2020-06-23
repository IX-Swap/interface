// @flow
import { generateModule } from 'context/base/withPagination'
import type { Identity } from 'pages/identity/modules/types'

const {
  Provider,
  useState,
  useDispatch,
  statusList
} = generateModule<Identity>('authorizerIdentityList')

export default {
  AuthorizerIdentityListProvider: Provider,
  useAuhorizerIdentityListState: useState,
  useAuhorizerIdentityListDispatch: useDispatch,
  AUTHORIZER_IDENTITY_LIST_STATUS: statusList
}
