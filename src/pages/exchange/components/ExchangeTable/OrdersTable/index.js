import React from 'react'
import Table from './Table'
import OrdersModule from './modules'
import MarketModule from '../../TradingTerminal/modules'

const { MarketProvider } = MarketModule
const { OrdersListProvider } = OrdersModule

const OrdersTable = () => {
  return (
    <MarketProvider>
      <OrdersListProvider>
        <Table title='My Orders' />
      </OrdersListProvider>
    </MarketProvider>
  )
}

export default OrdersTable
