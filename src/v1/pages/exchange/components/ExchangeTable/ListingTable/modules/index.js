//
import { generateModule } from 'v1/context/base/withPagination'

const { Provider, useState, useDispatch, statusList } = generateModule(
  'listingsList'
)

export default {
  ListingsProvider: Provider,
  ListingsState: useState,
  useListingsDispatch: useDispatch,
  LISTINGS_STATUS: statusList
}
