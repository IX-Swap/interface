// @flow
import { generateModule } from 'context/base/withPagination'
import type { ListingsState } from './types'

const { Provider, useState, useDispatch, statusList } = generateModule<ListingsState>(
  'listingsList'
)

export default {
  ListingsProvider: Provider,
  ListingsState: useState,
  useListingsDispatch: useDispatch,
  LISTINGS_STATUS: statusList
}
