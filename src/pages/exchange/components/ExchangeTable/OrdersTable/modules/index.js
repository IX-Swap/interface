// @flow
import { generateModule } from 'context/base/withPagination'
import type { OrdersListState } from './types'

const { Provider, useState, useDispatch, statusList } = generateModule<OrdersListState>(
  'ordersList'
)

export default {
  OrdersListProvider: Provider,
  OrdersListState: useState,
  useOrdersListDispatch: useDispatch,
  ORDERS_LIST_STATUS: statusList
}
