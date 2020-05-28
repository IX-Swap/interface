import React from 'react';
import Table from './Table';
import OrdersModule from './modules';

const { OrdersListProvider } = OrdersModule;

const OrdersTable = () => {
  return (
      <OrdersListProvider>
        <Table title='My Orders' />
      </OrdersListProvider>
    );
};

export default OrdersTable;

