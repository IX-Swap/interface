// @flow
import { generateModule } from 'context/base/withPagination'
import type { Commitment } from 'context/commitment/types'

const {
  Provider,
  useState,
  useDispatch,
  statusList
} = generateModule<Commitment>('authorizerCommitmentList')

export default {
  AuthorizerCommitmentListProvider: Provider,
  useAuthorizerCommitmentListState: useState,
  useAuthorizerCommitmentListDispatch: useDispatch,
  AUTHORIZER_COMMITMENT_LIST_STATUS: statusList
}
