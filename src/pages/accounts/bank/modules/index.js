//
import { generateModule } from 'context/base/withPagination'

import reducer from './reducers'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'bankList',
  reducer
)

export default {
  BanksListProvider: Provider,
  useBanksListState: useState,
  useBanksListDispatch: useDispatch,
  BANK_LIST_STATUS: statusList
}
