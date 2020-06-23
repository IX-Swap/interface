// @flow
import { generateModule } from 'context/base/withPagination'
import type { DSDeposit } from './types'

const {
  Provider,
  useState,
  useDispatch,
  statusList
} = generateModule<DSDeposit>('getDigitalSecurityDepositsList')

export default {
  DSDepositsListProvider: Provider,
  useDSDepositsListState: useState,
  useDSDepositsListDispatch: useDispatch,
  DS_DEPOSITS_LIST_STATUS: statusList
}
