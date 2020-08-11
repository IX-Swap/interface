//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'getDigitalSecurityDepositsList'
)

export default {
  DSDepositsListProvider: Provider,
  useDSDepositsListState: useState,
  useDSDepositsListDispatch: useDispatch,
  DS_DEPOSITS_LIST_STATUS: statusList
}
