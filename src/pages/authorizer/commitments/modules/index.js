//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'authorizerCommitmentList'
)

export default {
  AuthorizerCommitmentListProvider: Provider,
  useAuthorizerCommitmentListState: useState,
  useAuthorizerCommitmentListDispatch: useDispatch,
  AUTHORIZER_COMMITMENT_LIST_STATUS: statusList
}
