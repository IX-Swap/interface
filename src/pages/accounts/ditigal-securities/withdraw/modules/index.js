//
import { generateModule } from 'context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'getDigitalSecurityWithdrawalsList'
)

export default {
  DSWithdrawalsListProvider: Provider,
  useDSWithdrawalsListState: useState,
  useDSWithdrawalsListDispatch: useDispatch,
  DS_WITHDRAWALS_LIST_STATUS: statusList
}
