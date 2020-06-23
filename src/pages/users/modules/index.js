// @flow
import { generateModule } from 'context/base/withPagination'
import type { User } from './types'
import reducer from './reducers'

const { Provider, useState, useDispatch, statusList } = generateModule<User>(
  'usersList',
  reducer
)

export default {
  UserListProvider: Provider,
  useUsersListState: useState,
  useUsersListDispatch: useDispatch,
  USERS_LIST_STATUS: statusList
}
