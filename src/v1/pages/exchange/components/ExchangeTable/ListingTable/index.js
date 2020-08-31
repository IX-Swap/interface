import React from 'react'
import TableListings from './TableListings'
import ListingsModule from './modules'

const { ListingsProvider } = ListingsModule

const ListingsTable = () => {
  return (
    <ListingsProvider>
      <TableListings title='Listings' />
    </ListingsProvider>
  )
}

export default ListingsTable
