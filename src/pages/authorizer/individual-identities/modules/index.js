//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'authorizerIdentityList'
)

export default {
  AuthorizerIdentityListProvider: Provider,
  useAuhorizerIdentityListState: useState,
  useAuhorizerIdentityListDispatch: useDispatch,
  AUTHORIZER_IDENTITY_LIST_STATUS: statusList
}
