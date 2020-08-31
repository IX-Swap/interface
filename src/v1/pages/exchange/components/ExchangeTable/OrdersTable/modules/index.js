//
import { generateModule } from 'v1/context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'ordersList'
)

export default {
  OrdersListProvider: Provider,
  OrdersListState: useState,
  useOrdersListDispatch: useDispatch,
  ORDERS_LIST_STATUS: statusList
}
