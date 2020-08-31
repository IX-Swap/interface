//
import { generateModule } from 'v1/context/base/withPagination'

import reducer from './reducers'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'usersList',
  reducer
)

export default {
  UserListProvider: Provider,
  useUsersListState: useState,
  useUsersListDispatch: useDispatch,
  USERS_LIST_STATUS: statusList
}
